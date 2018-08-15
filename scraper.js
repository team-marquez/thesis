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
            data[index] = {};
            data[index]['name'] = $(element).find('.content-card-title').text()
            data[index]['description'] = $(element).find('.js-subtitle-content').text()
            data[index]['img'] = $(element).find('.content-card-figure img').attr('src')
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
                item.cost++
            })
            item.review = $(element).find('[itemprop]=reviewBody p').text()
            item.website = $(element).find('.listing_details .lead_buttons').children().first().attr('href')
            item.timeOutWebsite = dynamicURL + dynamicName
            $(element).find('.listing_details tr').each((index, el) => {
                if ($(element).children().first().text().trim() === 'Address:') {
                    item.address = $(element).children().last().text().trim()
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
            $(element).find('.listing__header ul li').each((index, el) => {
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
                    item.address = $(element).children().last().text().trim()
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
// let timeOutIndividualPageCheck = timeOutIndividualPageScrape(shortTimeOutURL, 'Le Bernardin')
// timeOutIndividualPageCheck.then((data) => console.log(data))
// let attractionTimeOutSearchCheck = attractionTimeOutListScrape(attractionListURL)
// attractionTimeOutSearchCheck.then((data) => console.log(data))
// let attractionTimeOutCheck = attractionTimeOutIndividualPageScrape('shortAttractionTimeOutURL', 'Empire State Building')
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
