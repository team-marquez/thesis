const cheerio = require('cheerio')
const axios = require('axios')
const Nightmare = require('nightmare')
let nightmare = new Nightmare()
// const $ = require('jquery')

let search_url = 'https://www.atlasobscura.com/things-to-do/new-york/places?page=1';
// let scrape =/* ignore coverage */ (url) => {
//     nightmare.goto(url)
//              .wait(2000)
//              .evaluate(/* ignore coverage */function() {
//                  let scrapedData = []
//                  console.log('inside eval')
//                  $('.index-card-wrap').each(function() {
//                      item = {};
//                      item['name'] = $(this).find('.content-card-title').text()
//                      console.log(item)
//                      scrapedData.push(item)
//                  })
//                  console.log(scrapedData)
//                  return scrapedData
//              })
//              .end()
//              .then((results) => {
//                  return results
//              })
// }

// let check = scrape(search_url)
// console.log(check)

const scrape = (url) => {
    let data = []
    return axios.get(url).then((response) => {
        let $ = cheerio.load(response.data);
        $('.index-card-wrap').each((index, element) => {
            data[index] = {};
            data[index]['name'] = $(element).find('.content-card-title').text()
            data[index]['description'] = $(element).find('.js-subtitle-content').text()
            data[index]['img'] = $(element).find('.content-card-figure img').attr('src')
        })
        // console.log(data)
        return data
    })
}
// let check = scrape(search_url).then((data) => console.log(data))
// console.log(check)

module.exports = {
    scrape: scrape,
    search_url: search_url
}
