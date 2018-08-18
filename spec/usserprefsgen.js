const fs = require("fs");
const fsPromises = fs.promises;
const random = require("./random.js");

exports.genUserPrefs = () => {
  return JSON.stringify({
    
      totalBudget: random.getRandomInt(200,5000),
      partySize: random.getRandomInt(1,4),
      tripDates: {"startDate":"2018-08-15T04:00:00.000Z", "endDate":"2018-08-19T03:59:59.999Z"},
      LT: random.getRandomInt(1,100),
      IO: random.getRandomInt(1,100),
      FA: random.getRandomInt(1,100),
      kidFriendly: random.getRandomBool()
  });
};
