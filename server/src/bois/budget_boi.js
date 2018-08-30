module.exports = {
  budgetBoi: (recs, clientPreferences) => {
    let { totalBudget, partySize, tripDates, FA } = clientPreferences.pref;
    let budgetPerPerson = totalBudget / partySize;
    let budgetPerPersonPerDay = budgetPerPerson / tripDates.length;
    let FAAllocation = {
      food: budgetPerPersonPerDay * (1 - FA / 100),
      activities: budgetPerPersonPerDay * (FA / 100)
    };

    //we allocate 50% of food budget to dinner, 30% to lunch, 20% to breakfast
    let mealAllocation = {
      breakfast: FAAllocation.food * 0.2,
      lunch: FAAllocation.food * 0.3,
      dinner: FAAllocation.food * 0.5
    };

    let costRanges = amount => {
      if (amount === null) return 0;
      else if (amount > 0 && amount <= 20) return 1;
      else if (amount > 20 && amount <= 51) return 2;
      else if (amount > 50 && amount <= 99) return 3;
      else if (amount >= 100) return 4;
    };

    //convert the amount the client wishes to spend into an integer 0-4,
    //representing a number of dollar signs
    let foodAsCost = {
      breakfast: costRanges(mealAllocation.breakfast),
      lunch: costRanges(mealAllocation.lunch),
      dinner: costRanges(mealAllocation.dinner)
    };

    let activitiesAsCost = costRanges(FAAllocation.activities);

    //filters the recommendation object
    //takes each item and checks to see if it is too expensive for the client's prefs
    for (let i = 0; i < recs.length; i++) {
      let type = recs[i].type;
      let cost = recs[i].cost;

      //activity path
      if (type[0] === "activity") {
        if (cost > activitiesAsCost) {
          recs.splice(i, 1);
          i--;
        }
      } else {
        //meal path
        let mealArr = recs[i].mealtime;
        if (mealArr === null) {
          console.log(
            "error in the recs structure on the following item: ",
            recs[i]
          );
          continue;
        }
        //goes from dinner to breakfast in order
        //we consider these to be the most expensive meals to least
        //this keeps food places that are expensive, but serve all or multiple meals
        if (mealArr.includes("dinner")) {
          if (cost > foodAsCost.dinner) {
            recs.splice(i, 1);
            i--;
          }
        } else if (mealArr.includes("lunch")) {
          if (cost > foodAsCost.lunch) {
            recs.splice(i, 1);
            i--;
          }
        } else if (mealArr.includes("breakfast")) {
          if (cost > foodAsCost.breakfast) {
            recs.splice(i, 1);
            i--;
          }
        }
      }
    }

    clientPreferences.itemsAsCost = {
      activities: activitiesAsCost,
      food: foodAsCost
    };
    return recs;
  }
};
