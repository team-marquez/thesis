module.exports = {
	integrityBoi: (tripOptions, clientPreferences) => {
		let readyForClient = true
		let desiredSize = clientPreferences.pref.tripDates.length *3

		for(let item in tripOptions) {
			if (tripOptions[item].length < desiredSize) readyForClient = false
		}

		if (readyForClient) return tripOptions
		//send back to get more recs if happy path fails
	}
}


