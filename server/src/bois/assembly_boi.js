module.exports = {
  assemblyBoi: (recs, clientPreferences) => {
    
    let arrayMax = clientPreferences.pref.tripDates.length * 3
    let LTAllocation = {
      local: Math.ceil(1 - (clientPreferences.pref.LT/100)) * arrayMax,
      tourist: Math.ceil(clientPreferences.pref.LT/100) * arrayMax
    }
    let IOAllocation = {
      indoor: Math.ceil(1 - (clientPreferences.pref.IO/100)) * arrayMax,
      outdoor: Math.ceil(clientPreferences.pref.IO/100) * arrayMax
    }

    console.log('top of assembly', clientPreferences)
    // console.log('Allocations: ', LTAllocation, IOAllocation)

    // //dummy section for single page tests
    // if(!clientPreferences.rainArray) {
    //   clientPreferences.rainArray = [0, 0, 1]
    //   clientPreferences.temperatureArray = [78, 82, 65]
    //   clientPreferences.pref.tripDates = ['2018-10-01', '2018-10-02', '2018-10-03']
    // }
    // //end dummy section
    
    let tripOptions = {
      breakfast: [],
      lunch: [],
      dinner: [],
      morning: [],
      afternoon: [],
      evening: [],
      weather: clientPreferences.weather, // 0 on days with no precipitation, 1 on days with precipitation
      tripDates: clientPreferences.pref.tripDates,
      rainyActs: []
    }
    
    //fill Meal will only work in mvp+, when we have both local and tourist rests
    fillMeals = (mealType) => {
      let currentLT = LTAllocation.local > LTAllocation.tourist ? 0 : 1
      let localCount = 0
      let touristCount = 0
      let hist = {}

      for (let i = 0; i < recs.length; i++) {
        let j = Math.floor(Math.random() * recs.length)
        
        if (hist.hasOwnProperty(j)) {
          i--;
          continue
        } else hist[j] = null



        let type = recs[j].type
        if (type[0] === 'restaurant') {

          // console.log('some info on rests: ', recs[j].mealtime, recs[j].local_tourist, currentLT, tripOptions[mealType].length)

          if (recs[j].mealtime.includes(mealType) && recs[j].local_tourist === currentLT) {
            if (recs[j].cost > clientPreferences.itemsAsCost.food[mealType]) continue
            tripOptions[mealType].push(recs[j])

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
    
    fillMeals2 = (mealType) => {
      let hist = {}
      for (let i = 0; i < recs.length; i++) {
        let j = Math.floor(Math.random() * recs.length)
        if (hist.hasOwnProperty(j)) continue
        if (recs[j].type[0] === 'restaurant') {
          tripOptions[mealType].push(recs[j])
          if (tripOptions[mealType].length === arrayMax) break
        }
        hist[j] = null
      }


      // for (let meal in recs) {
      //   if (recs[meal].type[0] === 'restaurant') {
      //     tripOptions[mealType].push(recs[meal])
      //     if (tripOptions[mealType].length === arrayMax) break
      //   }
      // }
    }
    
    fillActs = (actTime) => {
      let currentLT = LTAllocation.local > LTAllocation.tourist ? 0 : 1
      let currentIO = IOAllocation.indoor > IOAllocation.outdoor ? 0 : 1
      let localCount = 0
      let touristCount = 0
      let indoorCount = 0
      let outdoorCount = 0
      
      let hist = {}
      for (let i = 0; i < recs.length; i++) {

        let j = Math.floor(Math.random() * recs.length)

        if (hist.hasOwnProperty(j)) {
          i--;
          continue
        } else hist[j] = null

        // console.log('type, lt, clt, io, cio', recs[j].type[0], recs[j].local_tourist, currentLT, recs[j].indoor_outdoor, currentIO)

        
        if (recs[j].type[0] === 'activity' && recs[j].local_tourist === currentLT && recs[j].indoor_outdoor === currentIO) {
          if (recs[j].cost > clientPreferences.itemsAsCost.activities) continue
          // console.log('inside Activity creation: ', recs[j])

          // console.log('some acts info: ', currentLT, currentIO, tripOptions[actTime].length)
          tripOptions[actTime].push(recs[j])

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
    
    fillRain = () => {
      let hist = {}
      for (let i = 0; i < recs.length; i++) {
        let j = Math.floor(Math.random() * recs.length)
        if (hist.hasOwnProperty(j)) {
          i--
          continue
        }

        if (recs[j].type[0] === 'activity' && recs[j].indoor_outdoor === 'indoor') {
          tripOptions.rainyActs.push(recs[j])

          if (tripOptions.rainyActs.length === arrayMax) break
        }
        hist[j] = null
      }


      //depreciated
      // for (let act in recs) {
      //   if (recs[act].type[0] === 'activity' && recs[act].indoor_outdoor === 'indoor') {
      //     tripOptions.rainyActs.push(recs[act])
          
      //     if (tripOptions.rainyActs.length === arrayMax) break
      //   }
      // }
    }
    
    fillActs2 = (actType) => {
      let hist = {}
      for (let i = 0; i < recs.length; i++) {
        let j = Math.floor(Math.random() * recs.length)
        if (hist.hasOwnProperty(j)) continue
        if (recs[j].type[0] === 'activity') {
          tripOptions[actType].push(recs[j])
          if (tripOptions[actType].length === arrayMax) break
        }
        hist[j] = null
      }

      //depreciated
      // for (let act in recs) {
      //   if (recs[act].type[0] === 'activity') {
      //     tripOptions[actType].push(recs[act])
      //     if (tripOptions[actType].length === arrayMax) break
      //   } 
      // }
    }

    fillMeals('breakfast')
    fillMeals('lunch')
    fillMeals('dinner')

    fillActs('morning')
    fillActs('afternoon')
    fillActs('evening')

    //put together rainy activities, if needed
    clientPreferences.weather.forEach(element => {
      if (element.rain === 1) {
        fillRain()
      }
    })

    //new output due to new format needed on client side. refactor post MVP
    let trueTripOptions = {
      itinerary: [],
      weather: clientPreferences.weather.slice(),
      rainyActs: tripOptions.rainyActs.slice(),
      tripDates: tripOptions.tripDates.slice(),
      budget: {totalBudget: clientPreferences.pref.totalBudget, partySize: clientPreferences.pref.partySize}
    }

    let assembleItinerary = () => {
      for (let i = 0; i < trueTripOptions.tripDates.length; i++) {
        var dayArray = [];
        dayArray.push(tripOptions.breakfast[i])
        dayArray.push(tripOptions.morning[i])
        dayArray.push(tripOptions.lunch[i])
        dayArray.push(tripOptions.afternoon[i])
        dayArray.push(tripOptions.dinner[i])
        dayArray.push(tripOptions.evening[i])
        trueTripOptions.itinerary.push(dayArray)
      }

    }

    assembleItinerary()

    //old output.  keeping for tests
    // return tripOptions

    //new output.
    console.log('end of assembly: ', trueTripOptions.itinerary[0])
    console.log('end of assembly: ', trueTripOptions)
    return trueTripOptions
  }
}




