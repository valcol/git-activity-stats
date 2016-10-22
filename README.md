# git-activity-stats

Grab a Github contributions calendar and extact stats from it.
Based on [GithubStats](https://github.com/akerl/githubstats)

## Features

Extract :

* Contributions calendar
* Max number of commit per day
* Mean
* All streaks
* Max streak(s)
* Current streak
* Quartiles boundaries

## Installation

`npm install git-activity-stats`

## Usage

```javascript
let gitactivitystats = require('git-activity-stats');

//Get contributions from the user
gitactivitystats.getContributions('valcol', function(error, contrib){

  // Contributions array, day as index, number of commit as value
  let contributions = contrib.contributions;
  //First date of the contributions calendar
  let startDate = contrib.startDate;

  //Max. number of contributions per day
  let max = gitactivitystats.getMax(contributions);

  //Mean of the contributions
  let mean = gitactivitystats.getMean(contributions);

  //All streaks
  let streaks = gitactivitystats.getStreaks(contributions, startDate);
  for (let i=0;i<streaks.length;i++){
    console.log("Start date : "+streaks[i].startDate);
    console.log("End date : "+streaks[i].endDate);
    console.log("Duration : "+streaks[i].length);
  }

  //The longest streak(s)
  let maxStreaks = gitactivitystats.getMaxStreak(contributions);

  //Current streak
  let currentStreak = gitactivitystats.getCurrentStreak(contributions);

  //Get quartile boundaries, with the index as the quartile number
  //and the value as the upper bound of the quartile (inclusive)
  let quartileBoundaries = gitactivitystats.getQuartileBoundaries(contributions);

});
```

## Tests

  `npm test`

## License

git-actitity-stats is released under the MIT License.
