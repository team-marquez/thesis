const cheerio = require("cheerio");
const axios = require("axios");

const { Prisma } = require("prisma-binding");

const prisma = new Prisma({
  typeDefs: './server/src/generated/prisma.graphql',
  endpoint: 'http://34.234.236.21:4466'
})

//Zagat not functioning
const breakfastScrape = website => {
  return axios.get(website).then(response => {
    let $ = cheerio.load(response.data);
    console.log(response.data);
    let item = {};
    $(".main-content").each((index, element) => {
      item.name = $(element)
        .find(".zgt-place-sheet-title")
        .text();
      item.cost = $(element)
        .find(".zgt-zagat-price span")
        .text()
        .trim().length;
      item.local_tourist = Math.round(Math.random());
      item.description = $(element)
        .find(".zgt-bind-html")
        .text()
        .trim();
      item.img = $(element)
        .find(".zgt-image-zoom img")
        .attr("src");
      item.cuisine = "breakfast";
      item.mealtime = "";
    });
    return item;
  });
};

// breakfastScrape(
//   "https://www.zagat.com/r/normas-at-le-parker-meridien-new-york-new-york"
// ).then(data => console.log(data));

// console.log(breakfastScrape2('https://www.zagat.com/r/normas-at-le-parker-meridien-new-york-new-york'))

const costRanges = (amount) => {
  if (amount === null) return 0
  else if (amount > 0 && amount <= 20) return 1
  else if (amount > 20 && amount <= 51) return 2
  else if (amount > 50 && amount <= 99) return 3
  else if (amount >= 100) return 4
}

const nyEatBreakfast = (website) => {
  return axios.get(website).then(response => {
    let data = []
    let $ = cheerio.load(response.data)
    $('.c-mapstack__card').each((ind, el) => {
      item = {}
      item.name = $(el).find('h1').text().split('. ')[1]
      item.address = $(el).find('.c-mapstack__address').text().trim()
      item.website = $(el).find('.c-mapstack__phone-url').children().last().attr('href')
      item.description = $(el).find('.c-entry-content p').text().trim()
      item.image = $(el).find('picture img').attr('src')
      let determine = Math.random()
      item.cost = determine > .7 ? 2 : 1
      item.local_tourist = Math.round(Math.random())
      data.push(item)
    })
    return data
  })
}

// nyEatBreakfast('https://ny.eater.com/maps/best-breakfast-nyc').then(thing => console.log(thing))

const viatorActs = (website) => {
  return axios.get(website).then(response => {
    let item = {}
    let $ = cheerio.load(response.data)
    // console.log(response.data)
    $('.body').each((ind, el) => {
      if (item.name === undefined) {
        item.name = $(el).find('span[itemprop=name]').text()
        item.address = 'will fill manually....'
        item.website = website
        item.description = $(el).find('.cms-content').first().text().trim()
        item.image = 'will do manually'
        let cost = $(el).find('.price-amount').text().trim().split('.')[0].split(' ')[2]
        item.cost = costRanges(Number(cost))
        item.local_tourist = 1
        item.indoor_outdoor = 0
      }
    })
    return item
  })
}

// viatorActs('https://www.viator.com/tours/New-York-City/New-York-Harbor-Happy-Hour-Cruise/d687-2540NYCHAPPY').then(thing => console.log(thing))

let viatorSites = [
  'https://www.viator.com/tours/New-York-City/Manhattan-Architecture-AIANY-Yacht-Tour/d687-6288P7',
  'https://www.viator.com/tours/New-York-City/New-York-Harbor-Happy-Hour-Cruise/d687-2540NYCHAPPY',
  'https://www.viator.com/tours/New-York-City/Top-of-the-Rock-Observation-Deck-New-York/d687-3784TOPROCK',
  'https://www.viator.com/tours/New-York-City/CATACOMBS-BY-CANDLELIGHT/d687-41393P2',
  'https://www.viator.com/tours/New-York-City/Circle-Line-Complete-Manhattan-Island-Cruise/d687-2800FIC'
];

viatorSites.forEach( async (site) => {
  await viatorActs(site).then((data) => {
    console.log(data)
  })
})