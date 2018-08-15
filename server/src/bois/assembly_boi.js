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
      let currentLT = LTAllocation.local > LTAllocation.tourist ? 0 : 1
      let localCount = 0
      let touristCount = 0
      for (let meal in recs) {
        let type = recs[meal].type
        if (type[0] === 'restaurant') {
          if (type[1].meal.includes(mealType) && recs[meal].LT === currentLT) {
            tripOptions[mealType].push(recs[meal])
            if (tripOptions[mealType].length === arrayMax) break
            currentLT === 0 ? localCount++ : touristCount++
            currentLT = currentLT === 0 ? 1 : 0
            if (localCount === LTAllocation.local || touristCount === LTAllocation.tourist) {
              currentLT = currentLT === 0 ? 1 : 0
            }
          }
        }
      }
    }

    
  }
}




