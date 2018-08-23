module.exports = {
	budgetBoi: (recs, clientPreferences) => {
		let { totalBudget, partySize, tripDates, FA } = clientPreferences.pref
		let budgetPerPerson = totalBudget / partySize
		let budgetPerPersonPerDay = budgetPerPerson / tripDates.length
		let FAAllocation = {
			food: budgetPerPersonPerDay * (1 - FA),
			activities: budgetPerPersonPerDay * FA
		}

		let mealAllocation = {
			breakfast: FAAllocation.food * .2,
			lunch: FAAllocation.food * .3,
			dinner: FAAllocation.food * .5
		}

		let costRanges = (amount) => {
			if (amount === null) return 0
			else if (amount > 0 && amount <= 20) return 1
			else if (amount > 20 && amount <= 51) return 2
			else if (amount > 50 && amount <= 99) return 3
			else if (amount >= 100) return 4
		}

		let foodAsCost = {
			breakfast: costRanges(mealAllocation.breakfast),
			lunch: costRanges(mealAllocation.lunch),
			dinner: costRanges(mealAllocation.dinner)
		}

		let activitiesAsCost = costRanges(FAAllocation.activities)

		for (let i = 0; i < recs.length; i++) {
			let type = recs[i].type
			let cost = recs[i].cost

			//activity path
			if (type[0] === 'activity') {
				if (cost > activitiesAsCost) {
					recs.splice(i, 1)
					i--
				}
			} else {
				//meal path
				let mealArr = recs[i].mealtime
				
				if (mealArr.includes('dinner')) {
					if (cost > foodAsCost.dinner) {
						recs.splice(i, 1); 
						i--
					}
				} else if (mealArr.includes('lunch')) {
					if (cost > foodAsCost.lunch) {
						recs.splice(i, 1); 
						i--
					}
				} else if (mealArr.includes('breakfast')) {
					if (cost > foodAsCost.breakfast) {
						recs.splice(i, 1); 
						i--
					}
				}
			}
		}

		return recs
	}
}