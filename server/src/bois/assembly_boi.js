module.exports = {
  assemblyBoi: (recs, clientPreferences) => {
    
    //max option length for any activity/rest is 3 times the length of the trip
    let arrayMax = clientPreferences.pref.tripDates.length * 3

    //LT/IO is passed to the server as an int 0-100.
    //this turns it into a percent of total activities that should be that type
    let LTAllocation = {
      local: Math.ceil(1 - (clientPreferences.pref.LT/100)) * arrayMax,
      tourist: Math.ceil(clientPreferences.pref.LT/100) * arrayMax
    }
    let IOAllocation = {
      indoor: Math.ceil(1 - (clientPreferences.pref.IO/100)) * arrayMax,
      outdoor: Math.ceil(clientPreferences.pref.IO/100) * arrayMax
    }

    
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
    

    fillMeals = (mealType) => {
      let currentLT = LTAllocation.local > LTAllocation.tourist ? 0 : 1
      let localCount = 0
      let touristCount = 0
      let hist = {}

      //randomizes our itteration thru the recs
      for (let i = 0; i < recs.length; i++) {
        let j = Math.floor(Math.random() * recs.length)
        
        if (hist.hasOwnProperty(j)) {
          i--;
          continue
        } else hist[j] = null



        let type = recs[j].type
        if (type[0] === 'restaurant') {

          //selects item only if they searve that meal, and match the current Local_Tourist
          if (recs[j].mealtime.includes(mealType) && recs[j].local_tourist === currentLT) {

            //filter for cost
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
    
    fillActs = (actTime) => {
      let currentLT = LTAllocation.local > LTAllocation.tourist ? 0 : 1
      let currentIO = IOAllocation.indoor > IOAllocation.outdoor ? 0 : 1
      let localCount = 0
      let touristCount = 0
      let indoorCount = 0
      let outdoorCount = 0
      
      //randomizes our itteration thru the recs
      let hist = {}
      for (let i = 0; i < recs.length; i++) {

        let j = Math.floor(Math.random() * recs.length)

        if (hist.hasOwnProperty(j)) {
          i--;
          continue
        } else hist[j] = null


        //continue if rec item is an activity that matches bost local/tourist and indoor/outdoor
        if (recs[j].type[0] === 'activity' && recs[j].local_tourist === currentLT && recs[j].indoor_outdoor === currentIO) {

          //filter for cost
          if (recs[j].cost > clientPreferences.itemsAsCost.activities) continue

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
      //randomizes our itteration thru the recs
      for (let i = 0; i < recs.length; i++) {
        let j = Math.floor(Math.random() * recs.length)
        if (hist.hasOwnProperty(j)) {
          i--
          continue
        }

        //only adds indoor activities
        if (recs[j].type[0] === 'activity' && recs[j].indoor_outdoor === 0) {
          tripOptions.rainyActs.push(recs[j])

          if (tripOptions.rainyActs.length === arrayMax) break
        }
        hist[j] = null
      }
    }

    const deDupeArray = (itemToDedupe, itemToCompareAgainst) => {
      for (let i = 0; i < itemToDedupe.length; i++) {
        for (let r = 0; r < itemToCompareAgainst.length; r++) {

          if (itemToDedupe[i] === undefined) continue
          if (itemToCompareAgainst[r] === undefined) continue
          if (itemToDedupe[i].name === itemToCompareAgainst[r].name) {
            itemToDedupe.splice(i, 1)
            i--
          }
        }
      }
    }

    //This section fills the trip options for the various activities
    //it also dedupes them so there are no repeat acts/rests
    fillMeals('breakfast')
    fillMeals('lunch')
    fillMeals('dinner')

    deDupeArray(tripOptions.lunch, tripOptions.breakfast)
    deDupeArray(tripOptions.dinner, tripOptions.lunch)
    deDupeArray(tripOptions.dinner, tripOptions.breakfast)

    
    fillActs('morning')
    fillActs('afternoon')
    fillActs('evening')
    deDupeArray(tripOptions.afternoon, tripOptions.morning)
    deDupeArray(tripOptions.evening, tripOptions.afternoon)
    deDupeArray(tripOptions.evening, tripOptions.morning)
    
    //put together rainy activities, if needed
    clientPreferences.weather.forEach(element => {
      if (element.rain === 1 && tripOptions.rainyActs.length === 0) {
        fillRain()
      }
    })

    //new output due to new format needed on client side.
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

    //please keep this console.log so you can see what is being passed back to the client
    console.log('end of assembly: ', trueTripOptions)
    return trueTripOptions
  }
}




