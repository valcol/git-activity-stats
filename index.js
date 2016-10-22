'use strict';

let cheerio = require('cheerio'),
  moment = require('moment'),
  request = require('request');

let GitActivityStats = function () {
  this.giturl = 'https://github.com/users/';
  this.GITHUB_MAGIC = 3.77972616981;
};

/**
 * Callback for getContributions().
 *
 * @callback contributionsCallback
 * @param {error} error - request error
 * @param {Object} contrib
 * @param {int[]} contrib.contributions - contributions array
 * @param {string} contrib.startDate - first date of the contributions calendar
 */

/**
 * Get the user contributions calendar
 *
 * @param  {string} username Github username
 * @param  {contributionsCallback} callback see contributionsCallback
 */
GitActivityStats.prototype.getContributions = function (username, callback) {
  let url = this.giturl + username + '/contributions';

  request(url, function (error, response, body) {
    let $ = cheerio.load(body);
    let contributions = [];
    let startDate = null;
    $('rect').each(function (i) {
      if (startDate === null)
        startDate = $(this).data('date');
      contributions[i] = $(this).data('count');
    });
    callback(error, {contributions, startDate});
  });
};


/**
 * Get the maximum number of contributions in a day
 *
 * @param  {int[]} contributions - the contributions array
 * @return {int} - maximum number of contributions in a day
 */
GitActivityStats.prototype.getMax = function (contributions) {
  return Math.max.apply(null, contributions);
};


/**
 * Get the mean of the contributions
 *
 * @param  {int[]} contributions - the contributions array
 * @return {int}  - mean of the contributions
 */
GitActivityStats.prototype.getMean = function (contributions) {
  let sum = contributions.reduce((pre, cur) => pre + cur);
  return sum / contributions.length;
};


/**
 * Get all streaks
 *
 * @param  {int[]} contributions - the contributions array
 * @param  {string} startDate  - first date of the contributions calendar
 * @return {Object[]} - streaks
 */
GitActivityStats.prototype.getStreaks = function (contributions, startDate) {
  let date = moment(startDate);
  let streaks = [];

  for (let i = 0; i < contributions.length; i++)
    if (contributions[i] > 0) {
      let streakStartIndex = i;
      let streakStartDate = date.clone().add(i + 1, 'd').toDate();
      while (contributions[i] > 0 && i < contributions.length)
        i++;
      let length = i - streakStartIndex;
      if (i - streakStartIndex > 0) {
        let endDate = date.clone().add(i, 'd').toDate();
        streaks.push({startDate: streakStartDate, endDate, length});
      }
    }


  return streaks;
};


/**
 * Get the longest streak(s)
 *
 * @param  {int[]} contributions - the contributions array
 * @param  {string} startDate - first date of the contributions calendar
 * @return {Object[]} - longest streak(s)
 */
GitActivityStats.prototype.getMaxStreak = function (contributions, startDate) {
  let streaks = this.getStreaks(contributions, startDate);
  let maxLenght = Math.max.apply(Math, streaks.map(function (o) {
    return o.length;
  }));
  let maxStreaks = [];
  for (let i = 0; i < streaks.length; i++)
    if (streaks[i].length === maxLenght)
      maxStreaks.push(streaks[i]);
  return maxStreaks;
};


/**
 * Get the current streak
 *
 * @param  {int[]} contributions - the contributions array
 * @param  {string} startDate - first date of the contributions calendar
 * @return {Object[]} - current streak
 */
GitActivityStats.prototype.getCurrentStreak = function (contributions, startDate) {
  let streaks = this.getStreaks(contributions, startDate);
  let lastStreak = streaks[streaks.length - 1];
  let lastStreakEnd = moment(lastStreak.endDate);
  let yesteday = moment().subtract(1, 'd');
  return lastStreakEnd.isSameOrAfter(yesteday) ? lastStreak : [];
};

/**
 * get Outliers
 *
 * @param  {int[]} contributions - the contributions array
 * @return  {int[]} - outliers
 */
GitActivityStats.prototype.getOutliers = function (contributions) {
  let mean = this.getMean(contributions);
  let firstPass = contributions.reduce(
    (pre, cur) => Math.pow(cur - mean, 2) + pre
  );
  let stdvar = Math.sqrt(firstPass / (contributions.length - 1));

  if (contributions.filter((v, i, a) => a.indexOf(v) === i).length < 5)
    return [];
  else {
    let getOutliers = contributions.filter(
      (v) => (Math.abs((mean - v) / stdvar) > this.GITHUB_MAGIC)
    );
    return getOutliers.filter((v, i, a) => a.indexOf(v) === i);
  }
};


/**
 * get Outliers - according to Github algo
 *
 * @param  {int[]} contributions - the contributions array
 * @return  {int[]} - outliers
 */
GitActivityStats.prototype.getGithubOutliers = function (contributions) {
  let getOutliers = this.getOutliers(contributions);
  let max = this.getMax(contributions);
  let mean = this.getMean(contributions);

  let o = max - mean < 6 || max < 15 ? 1 : 3;
  return getOutliers.slice(0, o);
};


/**
 * Get quartile boundaries, with the index as the quartile number
 * end the value as the upper bound of the quartile (inclusive)
 *
 * @param  {int[]} contributions - the contributions array
 * @return  {int[]} - quartile boundaries
 */
GitActivityStats.prototype.getQuartileBoundaries = function (contributions) {
  let getGithubOutliers = this.getGithubOutliers(contributions);

  let top = this.getMax(contributions.filter((v) => (!this.contains(getGithubOutliers, v))));
  let bounds = [];
  for (let i = 1; i < 4; i++)
    bounds.push(Math.floor(i * top / 4));
  bounds.push(top);
  return bounds;
};


/**
 * helper function - check if an array contains an object
 */
GitActivityStats.prototype.contains = function (a, obj) {
  let i = a.length;
  while (i--)
    if (a[i] === obj)
      return true;
  return false;
};

GitActivityStats = new GitActivityStats();
module.exports = GitActivityStats;
