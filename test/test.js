'use strict';

let assert = require('assert');
let gitactivitystats = require('../index.js');

let contributions = [0, 0, 0, 2, 5, 7, 0, 0, 0, 0, 5, 5, 0, 0, 0, 0, 5, 5, 0, 0, 0, 0, 7, 5, 2, 0, 0, 0, 10,
  7, 5, 2, 0, 0, 0, 0, 9, 6, 2, 0, 0, 0, 0, 0, 5, 2, 0, 0, 0, 0, 0, 0, 2, 5, 0, 0, 0, 0, 0, 2, 5, 7, 0, 0, 0, 0, 2, 5,
  7, 10, 0, 0, 0, 2, 5, 7, 0, 0, 0, 0, 5, 5, 0, 0, 0, 0, 5, 5, 0, 0, 0, 0, 7, 5, 2, 0, 0, 0, 10, 7, 5, 2, 0, 0, 0, 0,
  7, 5, 2, 0, 0, 0, 0, 0, 5, 4, 0, 2, 0, 0, 0, 0, 2, 5, 0, 0, 0, 2, 2, 2, 5, 7, 0, 0, 0, 0, 2, 5, 7, 10, 0, 0, 0, 2, 5,
   7, 0, 0, 0, 0, 5, 5, 0, 0, 0, 3, 5, 5, 0, 0, 0, 1, 9, 6, 2, 0, 6, 0, 10, 7, 19, 2, 8, 0, 0, 3, 9, 6, 2, 0, 0, 0, 0,
  0, 5, 2, 0, 0, 0, 0, 0, 0, 2, 5, 0, 0, 0, 0, 0, 2, 5, 7, 0, 0, 0, 0, 2, 5, 7, 10, 0, 0, 0, 2, 5, 7, 0, 0, 0, 0, 5,
  5, 0, 0, 0, 0, 5, 5, 0, 0, 0, 0, 7, 5, 2, 0, 0, 0, 10, 7, 5, 2, 1, 2, 0, 0, 8, 5, 2, 0, 0, 0, 0, 0, 5, 2, 0, 0, 0,
  0, 0, 0, 2, 5, 0, 0, 0, 0, 0, 2, 5, 7, 0, 0, 0, 0, 3, 5, 7, 10, 0, 0, 0, 2, 5, 7, 0, 0, 0, 0, 5, 5, 0, 0, 0, 0, 5,
  5, 0, 0, 0, 0, 7, 5, 2, 0, 0, 0, 10, 7, 5, 2, 0, 0, 0, 0, 7, 5, 2, 0, 0, 0, 0, 0, 5, 2, 0, 1, 1, 0, 0, 0, 2, 5, 0,
  2, 0, 0, 0, 2, 5, 7, 0, 0, 0, 0, 2, 5, 7, 10, 0, 0, 0, 2, 5, 7, 1, 0, 0, 9, 5, 17, 0, 0, 0, 0, 5, 5, 2];

let date = '2015-10-11';

let streaks = [{
  startDate: new Date('2015-10-14T22:00:00.000Z'),
  endDate: new Date('2015-10-16T22:00:00.000Z'),
  length: 3
}, {
  startDate: new Date('2015-10-21T22:00:00.000Z'),
  endDate: new Date('2015-10-22T22:00:00.000Z'),
  length: 2
}, {
  startDate: new Date('2015-10-27T23:00:00.000Z'),
  endDate: new Date('2015-10-28T23:00:00.000Z'),
  length: 2
}, {
  startDate: new Date('2015-11-02T23:00:00.000Z'),
  endDate: new Date('2015-11-04T23:00:00.000Z'),
  length: 3
}, {
  startDate: new Date('2015-11-08T23:00:00.000Z'),
  endDate: new Date('2015-11-11T23:00:00.000Z'),
  length: 4
}, {
  startDate: new Date('2015-11-16T23:00:00.000Z'),
  endDate: new Date('2015-11-18T23:00:00.000Z'),
  length: 3
}, {
  startDate: new Date('2015-11-24T23:00:00.000Z'),
  endDate: new Date('2015-11-25T23:00:00.000Z'),
  length: 2
}, {
  startDate: new Date('2015-12-02T23:00:00.000Z'),
  endDate: new Date('2015-12-03T23:00:00.000Z'),
  length: 2
}, {
  startDate: new Date('2015-12-09T23:00:00.000Z'),
  endDate: new Date('2015-12-11T23:00:00.000Z'),
  length: 3
}, {
  startDate: new Date('2015-12-16T23:00:00.000Z'),
  endDate: new Date('2015-12-19T23:00:00.000Z'),
  length: 4
}, {
  startDate: new Date('2015-12-23T23:00:00.000Z'),
  endDate: new Date('2015-12-25T23:00:00.000Z'),
  length: 3
}, {
  startDate: new Date('2015-12-30T23:00:00.000Z'),
  endDate: new Date('2015-12-31T23:00:00.000Z'),
  length: 2
}, {
  startDate: new Date('2016-01-05T23:00:00.000Z'),
  endDate: new Date('2016-01-06T23:00:00.000Z'),
  length: 2
}, {
  startDate: new Date('2016-01-11T23:00:00.000Z'),
  endDate: new Date('2016-01-13T23:00:00.000Z'),
  length: 3
}, {
  startDate: new Date('2016-01-17T23:00:00.000Z'),
  endDate: new Date('2016-01-20T23:00:00.000Z'),
  length: 4
}, {
  startDate: new Date('2016-01-25T23:00:00.000Z'),
  endDate: new Date('2016-01-27T23:00:00.000Z'),
  length: 3
}, {
  startDate: new Date('2016-02-02T23:00:00.000Z'),
  endDate: new Date('2016-02-03T23:00:00.000Z'),
  length: 2
}, {
  startDate: new Date('2016-02-05T23:00:00.000Z'),
  endDate: new Date('2016-02-05T23:00:00.000Z'),
  length: 1
}, {
  startDate: new Date('2016-02-10T23:00:00.000Z'),
  endDate: new Date('2016-02-11T23:00:00.000Z'),
  length: 2
}, {
  startDate: new Date('2016-02-15T23:00:00.000Z'),
  endDate: new Date('2016-02-19T23:00:00.000Z'),
  length: 5
}, {
  startDate: new Date('2016-02-24T23:00:00.000Z'),
  endDate: new Date('2016-02-27T23:00:00.000Z'),
  length: 4
}, {
  startDate: new Date('2016-03-02T23:00:00.000Z'),
  endDate: new Date('2016-03-04T23:00:00.000Z'),
  length: 3
}, {
  startDate: new Date('2016-03-09T23:00:00.000Z'),
  endDate: new Date('2016-03-10T23:00:00.000Z'),
  length: 2
}, {
  startDate: new Date('2016-03-14T23:00:00.000Z'),
  endDate: new Date('2016-03-16T23:00:00.000Z'),
  length: 3
}, {
  startDate: new Date('2016-03-20T23:00:00.000Z'),
  endDate: new Date('2016-03-23T23:00:00.000Z'),
  length: 4
}, {
  startDate: new Date('2016-03-25T23:00:00.000Z'),
  endDate: new Date('2016-03-25T23:00:00.000Z'),
  length: 1
}, {
  startDate: new Date('2016-03-27T22:00:00.000Z'),
  endDate: new Date('2016-03-31T22:00:00.000Z'),
  length: 5
}, {
  startDate: new Date('2016-04-03T22:00:00.000Z'),
  endDate: new Date('2016-04-06T22:00:00.000Z'),
  length: 4
}, {
  startDate: new Date('2016-04-12T22:00:00.000Z'),
  endDate: new Date('2016-04-13T22:00:00.000Z'),
  length: 2
}, {
  startDate: new Date('2016-04-20T22:00:00.000Z'),
  endDate: new Date('2016-04-21T22:00:00.000Z'),
  length: 2
}, {
  startDate: new Date('2016-04-27T22:00:00.000Z'),
  endDate: new Date('2016-04-29T22:00:00.000Z'),
  length: 3
}, {
  startDate: new Date('2016-05-04T22:00:00.000Z'),
  endDate: new Date('2016-05-07T22:00:00.000Z'),
  length: 4
}, {
  startDate: new Date('2016-05-11T22:00:00.000Z'),
  endDate: new Date('2016-05-13T22:00:00.000Z'),
  length: 3
}, {
  startDate: new Date('2016-05-18T22:00:00.000Z'),
  endDate: new Date('2016-05-19T22:00:00.000Z'),
  length: 2
}, {
  startDate: new Date('2016-05-24T22:00:00.000Z'),
  endDate: new Date('2016-05-25T22:00:00.000Z'),
  length: 2
}, {
  startDate: new Date('2016-05-30T22:00:00.000Z'),
  endDate: new Date('2016-06-01T22:00:00.000Z'),
  length: 3
}, {
  startDate: new Date('2016-06-05T22:00:00.000Z'),
  endDate: new Date('2016-06-10T22:00:00.000Z'),
  length: 6
}, {
  startDate: new Date('2016-06-13T22:00:00.000Z'),
  endDate: new Date('2016-06-15T22:00:00.000Z'),
  length: 3
}, {
  startDate: new Date('2016-06-21T22:00:00.000Z'),
  endDate: new Date('2016-06-22T22:00:00.000Z'),
  length: 2
}, {
  startDate: new Date('2016-06-29T22:00:00.000Z'),
  endDate: new Date('2016-06-30T22:00:00.000Z'),
  length: 2
}, {
  startDate: new Date('2016-07-06T22:00:00.000Z'),
  endDate: new Date('2016-07-08T22:00:00.000Z'),
  length: 3
}, {
  startDate: new Date('2016-07-13T22:00:00.000Z'),
  endDate: new Date('2016-07-16T22:00:00.000Z'),
  length: 4
}, {
  startDate: new Date('2016-07-20T22:00:00.000Z'),
  endDate: new Date('2016-07-22T22:00:00.000Z'),
  length: 3
}, {
  startDate: new Date('2016-07-27T22:00:00.000Z'),
  endDate: new Date('2016-07-28T22:00:00.000Z'),
  length: 2
}, {
  startDate: new Date('2016-08-02T22:00:00.000Z'),
  endDate: new Date('2016-08-03T22:00:00.000Z'),
  length: 2
}, {
  startDate: new Date('2016-08-08T22:00:00.000Z'),
  endDate: new Date('2016-08-10T22:00:00.000Z'),
  length: 3
}, {
  startDate: new Date('2016-08-14T22:00:00.000Z'),
  endDate: new Date('2016-08-17T22:00:00.000Z'),
  length: 4
}, {
  startDate: new Date('2016-08-22T22:00:00.000Z'),
  endDate: new Date('2016-08-24T22:00:00.000Z'),
  length: 3
}, {
  startDate: new Date('2016-08-30T22:00:00.000Z'),
  endDate: new Date('2016-08-31T22:00:00.000Z'),
  length: 2
}, {
  startDate: new Date('2016-09-02T22:00:00.000Z'),
  endDate: new Date('2016-09-03T22:00:00.000Z'),
  length: 2
}, {
  startDate: new Date('2016-09-07T22:00:00.000Z'),
  endDate: new Date('2016-09-08T22:00:00.000Z'),
  length: 2
}, {
  startDate: new Date('2016-09-10T22:00:00.000Z'),
  endDate: new Date('2016-09-10T22:00:00.000Z'),
  length: 1
}, {
  startDate: new Date('2016-09-14T22:00:00.000Z'),
  endDate: new Date('2016-09-16T22:00:00.000Z'),
  length: 3
}, {
  startDate: new Date('2016-09-21T22:00:00.000Z'),
  endDate: new Date('2016-09-24T22:00:00.000Z'),
  length: 4
}, {
  startDate: new Date('2016-09-28T22:00:00.000Z'),
  endDate: new Date('2016-10-01T22:00:00.000Z'),
  length: 4
}, {
  startDate: new Date('2016-10-04T22:00:00.000Z'),
  endDate: new Date('2016-10-06T22:00:00.000Z'),
  length: 3
}, {
  startDate: new Date('2016-10-11T22:00:00.000Z'),
  endDate: new Date('2016-10-13T22:00:00.000Z'),
  length: 3
}];

let maxStreaks = [{
  startDate: new Date('2016-06-05T22:00:00.000Z'),
  endDate: new Date('2016-06-10T22:00:00.000Z'),
  length: 6
}];

describe('GitActivityStats', function () {
  describe('#getMax()', function () {
    it('should return the max of the contributions array : 19', function () {
      assert.equal(19, gitactivitystats.getMax(contributions));
    });
  });
  describe('#getMean()', function () {
    it('should return the mean of the contributions array : 2.192411924119241', function () {
      assert.equal(2.192411924119241, gitactivitystats.getMean(contributions));
    });
  });
  describe('#getStreaks()', function () {
    it('should return the streaks object', function () {
      assert.deepEqual(streaks, gitactivitystats.getStreaks(contributions, date));
    });
  });
  describe('#getMaxStreak()', function () {
    it('should return the maxStreaks object', function () {
      assert.deepEqual(maxStreaks, gitactivitystats.getMaxStreak(contributions, date));
    });
  });
  describe('#getCurrentStreak()', function () {
    it('should return an empty array', function () {
      assert.deepEqual([], gitactivitystats.getCurrentStreak(contributions, date));
    });
  });
  describe('#getOutliers()', function () {
    it('should return the outliers [19, 17]', function () {
      let outliers = gitactivitystats.getGithubOutliers(contributions);
      assert.deepEqual([19, 17], outliers);
    });
  });
  describe('#getGithubOutliers()', function () {
    it('should return the outliers [19, 17]', function () {
      let gitOutliers = gitactivitystats.getGithubOutliers(contributions);
      assert.deepEqual([19, 17], gitOutliers);
    });
  });
  describe('#getQuartileBoundaries()', function () {
    it('should return [2,5,7,10] as boundaries', function () {
      let qB = gitactivitystats.getQuartileBoundaries(contributions);
      assert.deepEqual([2, 5, 7, 10], qB);
    });
  });
});
