const cheerio = require('cheerio')
const axios = require('axios')
const Nightmare = require('nightmare')
const models = require('./server/temp_db/models.js')
let nightmare = new Nightmare()

/////////////////////Atlas Obscura Section
let search_url =
  'https://www.atlasobscura.com/things-to-do/new-york/places?page=1'
let dynam_url =
  'https://www.atlasobscura.com/things-to-do/new-york/places?page='
let individualPageURL = 'https://www.atlasobscura.com/places/'
let individualName = 'explorers club headquarters'

//scrape returns a promise.  resolve to use the data
const scrapeAtlasObscuraSearch = url => {
  let data = []
  return axios.get(url).then(response => {
    let $ = cheerio.load(response.data)
    $('.index-card-wrap').each((index, element) => {
      let item = {}
      item.name = $(element)
        .find('.content-card-title')
        .text()
      item.description = $(element)
        .find('.js-subtitle-content')
        .text()
      item.img = $(element)
        .find('.js-content-card-figure img')
        .attr('data-src')
      data.push(item)
    })
    // console.log(data)
    return data
  })
}

const scrapeAtlasObscuraIndividualPage = (url, name) => {
  let data = []
  // Formats name to fit Atlas Obscura querying
  let dashedName = name
    .replace(/['"]+/g, '-')
    .split(' ')
    .join('-')

  return axios.get(url + dashedName).then(response => {
    let $ = cheerio.load(response.data)
    $('#page-content').each((index, element) => {
      let item = {}
      item.wantToVisit = $(element)
        .find('.place-header-row .js-like-top-wrap .item-action-count')
        .text()
      item.address = $(element)
        .find('.place-address a')
        .text()
      item.website = $(element)
        .find('.url.detail-sm a')
        .attr('href')
      item.atlasURL = url + dashedName
      item.descriptionLong = ''
      $(element)
        .find('.content-body p')
        .each((index, element) => {
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
// atlasObscuraSearchCheck
//   .then(data => {
// data.forEach(element => {
//   scrapeAtlasObscuraIndividualPage(individualPageURL, element.name)
//     .then(data => {
//       data.forEach(activity => {
//         var container = {}

//         container.name = element.name
//         container.image = element.img
//         container.address = activity.address
//         container.website = activity.website
//         container.description = activity.description

//         models.addActivity(container, (err, data) => {
//           if (err) console.error('Error adding activity', err)

//           console.log('Added successfully', data)
//         })
//       })
// })
// .catch(err => console.error('Error fetching from individual pages'))
// })
//     console.log(data);
//   })
//   .catch(err => console.error('Error fetching pages', err))

// let atlasObscuraIndividualCheck  = scrapeAtlasObscuraIndividualPage(individualPageURL, individualName)
// atlasObscuraIndividualCheck.then((data) => console.log(data))

const scrapeTenPages = dynamicURL => {
  for (var i = 10; i <= 19; i++) {
    scrapeAtlasObscuraSearch(dynam_url + i)
      .then(scrapedData => {
        scrapedData.forEach(element => {
          scrapeAtlasObscuraIndividualPage(individualPageURL, element.name)
            .then(data => {
              data.forEach(activity => {
                var container = {}

                container.name = element.name
                container.image = element.img
                container.address = activity.address
                container.source = activity.atlasURL
                container.website = activity.website
                container.description = activity.descriptionLong

                models.addActivity(container, (err, data) => {
                  if (err) console.error('Error adding activity')

                  console.log('Added successfully')
                })
              })
            })
            .catch(err =>
              console.error('Error fetching from individual pages', err)
            )
        })
      })
      .catch(err => console.error('Error scraping page'))
  }
}

// Uncomment to run scrape
// scrapeTenPages(dynam_url)

//////TIME OUT NEW YORK SECTION////////
const listURL =
  'https://www.timeout.com/newyork/restaurants/100-best-new-york-restaurants'
const shortTimeOutURL = 'https://www.timeout.com/newyork/restaurants/'
const attractionListURL =
  'https://www.timeout.com/newyork/attractions/new-york-attractions'
const shortAttractionTimeOutURL =
  'https://www.timeout.com/newyork/things-to-do/'

const timeOutListScrape = url => {
  let data = []
  return axios.get(url).then(response => {
    let $ = cheerio.load(response.data)
    $('.listCard').each((index, element) => {
      let item = {}
      item.name = $(element)
        .find('.card-title a')
        .text()
        .trim()
      item.cuisine = $(element)
        .find('.category')
        .text()
        .trim()
        .split(', ')[1]
      item.img = $(element)
        .find('.image_wrapper img')
        .attr('src')
      item.description = $(element)
        .find('.js-card-description')
        .children()
        .first()
        .text()
      item.whyGo = $(element)
        .find('.js-card-description')
        .children()
        .last()
        .text()
      data.push(item)
    })

    return data
  })
}

const timeOutIndividualPageScrape = (dynamicURL, dynamicName) => {
  let data = []
  let dashedName = dynamicName
    .toLowerCase()
    .split(' ')
    .join('-')
  return axios.get(dynamicURL + dashedName).then(response => {
    let $ = cheerio.load(response.data)
    $('#content').each((index, element) => {
      let item = {}
      item.name = $(element)
        .find('.listing__header h1')
        .text()
      item.cost = 0
      $(element)
        .find('.listing__header ul li')
        .each((index, el) => {
          if ($(el).hasClass('xs-text-red')) item.cost++
        })
      $(element)
        .find('article p')
        .each((index, element) => {
          item.review +=
            $(element)
              .text()
              .trim() + ' '
        })
      item.website = $(element)
        .find('.listing_details .lead_buttons')
        .children()
        .first()
        .attr('href')
      item.timeOutWebsite = dynamicURL + dynamicName
      item.address = ''
      $(element)
        .find('.listing_details tr')
        .each((index, el) => {
          if (
            $(el)
              .children()
              .first()
              .text()
              .trim() === 'Address:'
          ) {
            item.address = $(el)
              .children()
              .last()
              .text()
              .trim()
              .split('\n')
              .join(' ')
          }
        })
      data.push(item)
    })

    return data
  })
}

timeOutListScrape(listURL)
  .then(data => {
    data.forEach(restaurant => {
      timeOutIndividualPageScrape(shortTimeOutURL, restaurant.name)
        .then(result => {
          var container = {}

          container.name = restaurant.name
          container.address = result.address
          container.cuisine = restaurant.cuisine
          container.image = restaurant.img
          container.description = restaurant.description
          container.whyGo = restaurant.whyGo
          container.cost = result.cost
          container.source = result.timeOutWebsite
          container.website = result.website

          console.log(container)
        })
        .catch(err => {
          console.error('Error scraping individual page')
        })
    })
  })
  .catch(err => {
    console.error('Error fetching restaurants')
  })

const attractionTimeOutListScrape = url => {
  let data = []
  return axios.get(url).then(response => {
    let $ = cheerio.load(response.data)
    $('.listCard').each((index, element) => {
      let item = {}
      item.name = $(element)
        .find('.card-title a')
        .text()
        .trim()
      item.category = $(element)
        .find('.category')
        .text()
        .trim()
      item.description = $(element)
        .find('.js-card-description')
        .text()
        .trim()
      data.push(item)
    })
    return data
  })
}
const attractionTimeOutIndividualPageScrape = (dynamicURL, attractionName) => {
  let data = []
  let dashedName = attractionName
    .toLowerCase()
    .split(' ')
    .join('-')
  return axios.get(dynamicURL + dashedName).then(response => {
    let $ = cheerio.load(response.data)
    $('#content').each((index, element) => {
      item.name = $(element)
        .find('.listing__header h1')
        .text()
        .split('|')[0]
      item.borough = $(element)
        .find('.listing__header h1')
        .text()
        .split('|')[1]
      item.cost = 0
      $(element)
        .find('listing__header ul li')
        .each((index, el) => {
          if ($(el).hasClass('.xs-text-red')) item.cost++
        })
      item.review = ''
      $(element)
        .find('article p')
        .each((index, el) => {
          item.review += $(el).text() + ' '
        })
      item.website = $(element)
        .find('.listing_details .lead_buttons')
        .children()
        .first()
        .attr('href')
      item.timeOutWebsite = dynamicURL + dashedName
      $(element)
        .find('.listing_details tr')
        .each((index, el) => {
          if (
            $(element)
              .children()
              .first()
              .text()
              .trim() === 'Address:'
          ) {
            item.address = $(element)
              .children()
              .last()
              .text()
              .trim()
              .split('\n')
              .join(' ')
          }
        })
      item.LTScore = 1
      data.push(item)
    })
    return data
  })
}

//split out of attraction center
let timeOutMuseums = attractionName => {
  axios
    .get('https://www.timeout.com/newyork/museums/' + attractionName)
    .then(response => {
      let $ = cheerio.load(response.data)
      $('#content').each((index, element) => {
        let item = {}
        item.name = attractionName.split('-').join(' ')
        item.borough = ''
        item.cost = 1
        $(element)
          .find('listing__header ul li')
          .each((index, el) => {
            if ($(el).hasClass('.xs-text-red')) item.cost++
          })
        item.review = ''
        $(element)
          .find('article p')
          .each((ind, el) => {
            item.review +=
              $(el)
                .text()
                .trim() + ' '
          })
        item.webstie = $(element)
          .find('.feature__article a')
          .last()
          .attr('href') //alt will be to go thru the H3's
        item.timeOutWebsite =
          'https://www.timeout.com/newyork/museums/' + attractionName
        item.address = '' //google it?
        item.LTScore = 1
        item.IOScore = 0
        data.push(item)
      })
    })
}

let timeOutShopping = (website, attractionName) => {
  axios.get(website).then(response => {
    let $ = cheerio.load(response.data)
    $('#content').each((index, element) => {
      let item = {}
      item.name = attractionName.split('-').join(' ')
      item.borough = ''
      item.cost = 1
      item.review = $(element)
        .find('.feature__article p')
        .first()
        .text()
        .trim()
      item.website = $(element)
        .find('.listing_details .lead_buttons')
        .children()
        .first()
        .attr('href')
      item.timeOutWebsite = website
      item.address = ''
      $(element)
        .find('.listing_details tr')
        .each((index, el) => {
          if (
            $(el)
              .children()
              .first()
              .text()
              .trim() === 'Address:'
          ) {
            item.address = $(el)
              .children()
              .last()
              .text()
              .trim()
              .split('\n')
              .join(' ')
          }
        })
      item.LTScore = 1
      item.IOScore = 0
      data.push(item)
    })
  })
}

let timeOutComedy = attractionName => {
  axios
    .get('https://www.timeout.com/newyork/comedy/' + attractionName)
    .then(response => {
      let $ = cheerio.load(response.data)
      $('#content').each((index, element) => {
        let item = {}
        item.name = $(element)
          .find('.listing__header h1')
          .text()
        item.borough = ''
        item.cost = 0
        $(element)
          .find('listing__header ul li')
          .each((index, el) => {
            if ($(el).hasClass('.xs-text-red')) item.cost++
          })
        item.review = ''
        $(element)
          .find('article p')
          .each((index, el) => {
            item.review += $(el).text() + ' '
          })
        item.website = $(element)
          .find('.listing_details .lead_buttons')
          .children()
          .first()
          .attr('href')
        item.timeOutWebsite =
          'https://www.timeout.com/newyork/comedy/' + attractionName
        $(element)
          .find('.listing_details tr')
          .each((index, el) => {
            if (
              $(element)
                .children()
                .first()
                .text()
                .trim() === 'Address:'
            ) {
              item.address = $(element)
                .children()
                .last()
                .text()
                .trim()
                .split('\n')
                .join(' ')
            }
          })
        item.LTScore = 1
        item.IOScore = 0
        data.push(item)
      })
    })
}

let timeOutSports = attractionName => {
  axios
    .get('https://www.timeout.com/newyork/sport-fitness/' + attractionName)
    .then(response => {
      let $ = cheerio.load(response.data)
      $('#content').each((index, element) => {
        let item = {}
        item.name = $(element)
          .find('.listing__header h1')
          .text()
        item.borough = ''
        item.cost = 0
        $(element)
          .find('listing__header ul li')
          .each((index, el) => {
            if ($(el).hasClass('.xs-text-red')) item.cost++
          })
        item.review = ''
        $(element)
          .find('article p')
          .each((index, el) => {
            item.review += $(el).text() + ' '
          })
        item.website = $(element)
          .find('.listing_details .lead_buttons')
          .children()
          .first()
          .attr('href')
        item.timeOutWebsite =
          'https://www.timeout.com/newyork/comedy/' + attractionName
        $(element)
          .find('.listing_details tr')
          .each((index, el) => {
            if (
              $(element)
                .children()
                .first()
                .text()
                .trim() === 'Address:'
            ) {
              item.address = $(element)
                .children()
                .last()
                .text()
                .trim()
                .split('\n')
                .join(' ')
            }
          })
        item.LTScore = 1
        item.IOScore = 0
        data.push(item)
      })

      return data
    })
}

let attractionSinglePage = website => {
  return axios.get(website).then(response => {
    let $ = cheerio.load(response.data)
    let item = {}
    $('#content').each((index, element) => {
      item.name = $(element)
        .find('.listing__header h1')
        .text()
        .split('|')[0]
      item.borough = $(element)
        .find('.listing__header h1')
        .text()
        .split('|')[1]
      item.cost = 0
      $(element)
        .find('listing__header ul li')
        .each((index, el) => {
          if ($(el).hasClass('.xs-text-red')) item.cost++
        })
      item.review = ''
      $(element)
        .find('article p')
        .each((index, el) => {
          item.review += $(el).text() + ' '
        })
      item.website = $(element)
        .find('.listing_details .lead_buttons')
        .children()
        .first()
        .attr('href')
      item.timeOutWebsite = website
      $(element)
        .find('.listing_details tr')
        .each((index, el) => {
          if (
            $(element)
              .children()
              .first()
              .text()
              .trim() === 'Address:'
          ) {
            item.address = $(element)
              .children()
              .last()
              .text()
              .trim()
              .split('\n')
              .join(' ')
          }
        })
      item.LTScore = 1
      item.IOScore = Math.round(Math.random())
    })
    return item
  })
}

let manualScrape = async () => {
  let sites = [
    'https://www.timeout.com/newyork/attractions/brooklyn-bridge-new-york-ny',
    'https://www.timeout.com/newyork/attractions/the-statue-of-liberty-manhattan-ny',
    'https://www.timeout.com/newyork/attractions/one-world-observatory-manhattan-ny',
    'https://www.timeout.com/newyork/attractions/central-park-manhattan-ny',
    'https://www.timeout.com/newyork/attractions/national-september-11-memorial-museum-financial-district-ny',
    'https://www.timeout.com/newyork/attractions/bronx-zoo-wildlife-conservation-society-bronx-ny',
    'https://www.timeout.com/newyork/attractions/flushing-meadows-corona-park-queens-ny',
    'https://www.timeout.com/newyork/attractions/brooklyn-heights-and-the-brooklyn-promenade-brooklyn-ny',
    'https://www.timeout.com/newyork/attractions/brooklyn-botanic-garden',
    'https://www.timeout.com/newyork/attractions/coney-island-cyclone',
    'https://www.timeout.com/newyork/attractions/union-square',
    'https://www.timeout.com/newyork/attractions/flatiron-building',
    'https://www.timeout.com/newyork/attractions/chrysler-building-manhattan-ny',
    'https://www.timeout.com/newyork/attractions/st-patricks-cathedral',
    'https://www.timeout.com/newyork/attractions/washington-square-park',
    'https://www.timeout.com/newyork/attractions/madame-tussauds-new-york'
  ]
  await sites.forEach(async site => {
    let info = await attractionSinglePage(site)
    //whatever you want to do with the data, do it here
  })
}
//uncomment checker to run manualScrape
// let checker = manualScrape()

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
