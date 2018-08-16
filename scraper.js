const cheerio = require('cheerio')
const axios = require('axios')
// const Nightmare = require('nightmare')
// let nightmare = new Nightmare()



/////////////////////Atlas Obscura Section
let search_url = 'https://www.atlasobscura.com/things-to-do/new-york/places?page=1';
let dynam_url = 'https://www.atlasobscura.com/things-to-do/new-york/places?page=';
let individualPageURL = 'https://www.atlasobscura.com/places/'
let individualName = 'explorers club headquarters'


//scrape returns a promise.  resolve to use the data
const scrapeAtlasObscuraSearch = (url) => {
    let data = []
    return axios.get(url).then((response) => {
        let $ = cheerio.load(response.data);
        $('.index-card-wrap').each((index, element) => {
            let item = {}
            item.name = $(element).find('.content-card-title').text()
            item.description = $(element).find('.js-subtitle-content').text()
            item.img = $(element).find('.js-content-card-figure img').attr('data-src')
            data.push(item)
        })
        // console.log(data)
        return data
    })
}

const scrapeAtlasObscuraIndividualPage =(url, name) => {
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
            item.LTScore = 0
            data.push(item)
        })
        return data
    })
}

//////uncomment below to run the scrape of the pages

// let atlasObscuraSearchCheck = scrapeAtlasObscuraSearch(search_url)
// atlasObscuraSearchCheck.then((data) => console.log(data))
// let atlasObscuraIndividualCheck  = scrapeAtlasObscuraIndividualPage(individualPageURL, individualName)
// atlasObscuraIndividualCheck.then((data) => console.log(data))

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

// let scrapeTenPagesCheck = scrapeTenPages(dynam_url, (err, data) => {
//     console.log(data)
//     return data
// })


//////TIME OUT NEW YORK SECTION////////
const listURL = 'https://www.timeout.com/newyork/restaurants/100-best-new-york-restaurants'
const shortTimeOutURL = 'https://www.timeout.com/newyork/restaurants/'
const attractionListURL = 'https://www.timeout.com/newyork/attractions/new-york-attractions'
const shortAttractionTimeOutURL = 'https://www.timeout.com/newyork/things-to-do/'

const timeOutListScrape = (url) => {
    let data = []
    return axios.get(url).then((response) => {
        let $ = cheerio.load(response.data)
        $('.listCard').each((index, element) => {
            let item = {};
            item.name = $(element).find('.card-title a').text().trim()
            item.cuisine = $(element).find('.category').text().trim().split(', ')[1]
            item.img = $(element).find('.image_wrapper img').attr('src')
            item.description = $(element).find('.js-card-description').children().first().text()
            item.whyGo = $(element).find('.js-card-description').children().last().text()
            data.push(item)
        })
        return data
    })
}

const timeOutIndividualPageScrape = (dynamicURL, dynamicName) => {
    let data = []
    let dashedName = dynamicName.toLowerCase().split(' ').join('-')
    return axios.get(dynamicURL + dashedName).then((response) => {
        let $ = cheerio.load(response.data)
        $('#content').each((index, element) => {
            let item = {}
            item.name = $(element).find('.listing__header h1').text()
            item.cost = 0;
            $(element).find('.listing__header ul li').each((index, el) => {
                if ($(el).hasClass('xs-text-red')) item.cost++
            })
            $(element).find('article p').each((index, element) => {
                item.review += $(element).text().trim() + ' '
            })
            item.website = $(element).find('.listing_details .lead_buttons').children().first().attr('href')
            item.timeOutWebsite = dynamicURL + dynamicName
            item.address = ''
            $(element).find('.listing_details tr').each((index, el) => {
                if ($(el).children().first().text().trim() === 'Address:') {
                    item.address = $(el).children().last().text().trim().split('\n').join(' ')
                }
            })
            data.push(item)
        })
        return data
    })
}

const attractionTimeOutListScrape = (url) => {
    let data = []
    return axios.get(url).then((response) => {
        let $ = cheerio.load(response.data)
        $('.listCard').each((index, element) => {
            let item = {}
            item.name = $(element).find('.card-title a').text().trim()
            item.category = $(element).find('.category').text().trim()
            item.description = $(element).find('.js-card-description').text().trim()
            data.push(item)
        })
        return data
    })
}
const attractionTimeOutIndividualPageScrape = (dynamicURL, attractionName) => {
    let data = []
    let dashedName = attractionName.toLowerCase().split(' ').join('-')
    return axios.get(dynamicURL + dashedName).then((response) => {
        let $ = cheerio.load(response.data)
        $('#content').each((index, element) => {
            item.name = $(element).find('.listing__header h1').text().split('|')[0]
            item.borough = $(element).find('.listing__header h1').text().split('|')[1]
            item.cost = 0;
            $(element).find('listing__header ul li').each((index, el) => {
                if ($(el).hasClass('.xs-text-red')) item.cost++
            })
            item.review = ''
            $(element).find('article p').each((index, el) => {
                item.review += $(el).text() + ' '
            })
            item.website = $(element).find('.listing_details .lead_buttons').children().first().attr('href')
            item.timeOutWebsite = dynamicURL + dashedName
            $(element).find('.listing_details tr').each((index, el) => {
                if ($(element).children().first().text().trim() === 'Address:') {
                    item.address = $(element).children().last().text().trim().split('\n').join(' ')
                }
            })
            item.LTScore = 1
            data.push(item)
        })
        return data
    })
}
//////uncomment below function to run the scrapes
// let timeOutCheck = timeOutListScrape(listURL)
// timeOutCheck.then((data) => console.log(data))
// let timeOutIndividualPageCheck = timeOutIndividualPageScrape(shortTimeOutURL, 'Emily')
// timeOutIndividualPageCheck.then((data) => console.log(data))
// let attractionTimeOutSearchCheck = attractionTimeOutListScrape(attractionListURL)
// attractionTimeOutSearchCheck.then((data) => console.log(data))
// let attractionTimeOutCheck = attractionTimeOutIndividualPageScrape('shortAttractionTimeOutURL', 'Frenchette')
// attractionTimeOutCheck.then((data) => console.log(data))

module.exports = {
    scrape: scrapeAtlasObscuraSearch,
    search_url: search_url,
    scrapeIndividualPage: scrapeAtlasObscuraIndividualPage,
    attractionTimeOutIndividualPageScrape: attractionTimeOutIndividualPageScrape,
    attractionTimeOutListScrape: attractionTimeOutListScrape,
    timeOutIndividualPageScrape: timeOutIndividualPageScrape,
    timeOutListScrape: timeOutListScrape,
    scrapeTenPages: scrapeTenPages
}
