const cheerio = require("cheerio");
const axios = require("axios");

const { Prisma } = require("prisma-binding");

const prisma = new Prisma({
  typeDefs: "./server/src/generated/prisma.graphql",
  endpoint: "http://localhost:4466/"
});

const Nightmare = require("nightmare");
const nightmare = Nightmare({ show: true });

const breakfastScrape2 = website => {
  let item = {}
  nightmare
    .goto(website)
    .wait(3000)
    .evaluate(() => info.name = document.querySelector('.zgt-place-sheet-title'.text()))
    .end()
    .then((data)  => {
      return data
    })
    .catch(e => console.log(e))
};

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

console.log(breakfastScrape2('https://www.zagat.com/r/normas-at-le-parker-meridien-new-york-new-york'))