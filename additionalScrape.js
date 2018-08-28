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