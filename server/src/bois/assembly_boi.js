module.exports = {
  assemblyBoi: (recs, clientPreferences) => {
    let arrayMax = clientPreferences.pref.tripDates.length * 3
    let LTAllocation = {
      local: Math.ceil(1 - clientPreferences.pref.LT) * arrayMax,
      tourist: Math.ceil(clientPreferences.pref.LT) * arrayMax
    }
    let IOAllocation = {
      indoor: Math.ceil(1 - clientPreferences.pref.IO) * arrayMax,
      outdoor: Math.ceil(clientPreferences.pref.IO) * arrayMax
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

            //finish function if max size reached
            if (tripOptions[mealType].length === arrayMax) break

            //incrament LT count and switch to other type
            currentLT === 0 ? localCount++ : touristCount++
            currentLT = currentLT === 0 ? 1 : 0

            //switches BACK if the L or T allocation has been reached
            if (localCount === LTAllocation.local || touristCount === LTAllocation.tourist) {
              currentLT = currentLT === 0 ? 1 : 0
            }
          }
        }
      }
    }
    
    fillActs = (actTime) => {
      let currentLT = LTAllocation.local > LTAllocation.tourist ? 0 : 1
      let currentIO = IOAllocation.indoor > IOAllocation.outdoor ? 0 : 1
      let localCount = 0
      let touristCount = 0
      let indoorCount = 0
      let outdoorCount = 0

      for (let act in recs) {
        if (recs[act].type[0] === 'activity' && recs[act].LT === currentLT && recs[act].IO == currentIO) {
          tripOptions[actTime].push(recs[act])

          //finish function if max size reached
          if (tripOptions[actTime].length === arrayMax) break

          //incrament the count based on IO/LT of activity
          currentIO === 0 ? indoorCount++ : outdoorCount++
          currentLT === 0 ? localCount++ : touristCount++

          //change the indoor/outdoor condition
          if (indoorCount < IOAllocation.indoor && outdoorCount < IOAllocation.outdoor) currentIO = Math.round(Math.random())
          else if (indoorCount === IOAllocation.indoor) currentIO = 1
          else currentIO = 0
          
          //change the local/tourist condition
          if (localCount < LTAllocation.local && touristCount < LTAllocation.tourist) currentLT = Math.round(Math.random())
          else if (localCount === LTAllocation.local) currentLT = 1
          else currentLT = 0
        }
      }
    }

    fillMeals('breakfast')
    fillMeals('lunch')
    fillMeals('dinner')

    fillActs('morning')
    fillActs('afternoon')
    fillActs('evening')

    return tripOptions
  }
}




