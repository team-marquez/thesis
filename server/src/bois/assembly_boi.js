module.exports = {
  assemblyBoi = (recs, clientPreferences) => {
    let arrayMax = clientPreferences.pref.tripDates.length * 3
    let LTAllocation = {
      local: Math.ceil(1 - clientPreferences.pref.LT) * arrayMax,
      tourist: Math.ceil(clientPreferences.pref.LT) * arrayMax
    }
    let IOAllocation = {
      indoor: Math.ceil(1 - clientPreferences.pref.IO) * arrayMax,
      outdoor: Math.ceil(clientPreferences.pref.IO) * arrayMax
    }
    let FAllocation = {
      indoor: 1 - clientPreferences.pref.FA,
      outdoor: clientPreferences.pref.FA
    }

    let tripOptions = {
      breakfast: [],
      lunch: [],
      dinner: [],
      morning: [],
      afternoon: [],
      evening: []
    }

    fillMeals = (mealType) => {
      
    }
  }
}




