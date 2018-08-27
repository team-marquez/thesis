const cheerio = require('cheerio')
const axios = require('axios')

const getReviewCount = (search) => {
    return axios.get('https://www.yelp.com/search?find_desc=' + search + '&find_loc=New+York,+NY')
      .then(response => {
        let $ = cheerio.load(response.data)
        let num = ''
        $('.media-block').each((ind, el) => {
            if ($(el).find('h3 span').first().text().trim() === 'Ad') {
            } else if (num === '') {
                num = $(el).find('.rating-qualifier').text().trim().split(' ')[0]
            }
        })
        return num
    })
}

// getReviewCount('https://www.yelp.com/search?find_desc=Union+Square+Cafe&find_loc=New+York,+NY').then(data => console.log(data))
// console.log(getReviewCount('Union Square Cafe').then((data) => {
//   console.log(data)
//   return data
// }))

const aggregateDatabaseReviews = async (dbInfo) => {
    let totalReviews = 0
    let localDB = {}

    for (let i = 0; i < dbInfo.length; i++) {
        let searchTerm = dbInfo[i].name.split(' ').join('+')
        let numberOfReviewsPromise = await getReviewCount(searchTerm)
        numberOfReviewsPromise.then((number) => {
          localDB[dbInfo[i]].name = Number(number)
          totalReviews += Number(number)
        })
    }

    let averageReviewNumber = totalReviews / Object.keys(localDB).length

    for (let rest in localDB) {
      if (localDB[rest] < averageReviewNumber) {
        //send to actual DB an LT score of 0
      } else {
        //send to actual DB an LT score of 1
      }
    }
}