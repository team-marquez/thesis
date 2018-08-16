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
			if (amount === 0) return 0
			else if (amount > 0 && amount <= 20) return 1
			else if (amount > 20 && amount <= 51) return 2
			else if (amount > 50 && amount <= 99) return 3
			else if (amount > 100) return 4
		}

		let foodAsCost = {
			breakfast: costRanges(mealAllocation.breakfast),
			lunch: costRanges(mealAllocation.lunch),
			dinner: costRanges(mealAllocation.dinner)
		}

		let activitiesAsCost = costRanges(FAAllocation.activities)

		for (let item in recs) {
			let type = recs[item].type
			let cost = recs[item].cost

			//activity path
			if (type[0] === 'activity') {
				if (cost > activitiesAsCost) delete recs[item]
			} else {
				//meal path
				let mealArr = type.detail.meal
				
				if (mealArr.includes('dinner')) {
					if (cost > foodAsCost.dinner) delete recs[item]
				} else if (mealArr.includes('lunch')) {
					if (cost > foodAsCost.lunch) delete recs[item]
				} else if (mealArr.includes('breakfast')) {
					if (cost > foodAsCost.breakfast) delete recs[item]
				}
			}
		}

		return recs
	}
}