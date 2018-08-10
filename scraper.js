const cheerio = require('cheerio')
const axios = require('axios')
const Nightmare = require('nightmare')
let nightmare = new Nightmare()

let search_url = 'https://www.atlasobscura.com/things-to-do/new-york/places?page=1';
let dynam_url = 'https://www.atlasobscura.com/things-to-do/new-york/places?page=';
let individualPageURL = 'https://www.atlasobscura.com/places/'
let individualName = 'explorers club headquarters'



//scrape returns a promise.  resolve to use the data
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

const scrapeIndividualPage =(url, name) => {
    let data = []
    let dashedName = name.split(' ').join('-')
    return axios.get(url + dashedName).then((response) => {
        let $ = cheerio.load(response.data);
        $('#page-content').each((index, element) => {
            let item = {};
            item.wantToVisit = $(element).find('.place-header-row .js-like-top-wrap .item-action-count').text()
            item.address = $(element).find('.place-address a').text()
            item.website = $(element).find('.url.detail-sm a').attr('href')
            item.atlasURL = url + dashedName
            item.descriptionLong = ''
            $(element).find('.content-body p').each((index, element) => {
                item.descriptionLong += $(element).text()
            })
            data.push(item)
        })
        return data
    })
}
// let check = scrape(search_url).then((data) => console.log(data))
// console.log(check)
let check = scrapeIndividualPage(individualPageURL, individualName)
check.then((data) => console.log(data))

const scrapeTenPages = (dynamicURL, cb) => {
    let allData = [];
    for (var i = 1; i <= 10; i++) {
        scrape(dynam_url + i).then((scrapedData) => {
            allData.concat(scrapedData)
            console.log(scrapedData)
        })
    }
    cb(null, allData)
}

// let check = scrapeTenPages(dynam_url, (err, data) => {
//     console.log(data)
//     return data
// })


module.exports = {
    scrape: scrape,
    search_url: search_url
}
