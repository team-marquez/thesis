const cheerio = require('cheerio')
const axios = require('axios')

let search_url = 'https://www.atlasobscura.com/things-to-do/new-york/places';


axios.get(search_url).then((response) => {
    let $ = cheerio.load(response.data);
    let data = []
    $('.index-card-wrap').each((index, element) => {
        data[index] = {};
        data[index]['name'] = $(element).find('.content-card-title').text()
        data[index]['description'] = $(element).find('.js-subtitle-content').text()
        data[index]['img'] = $(element).find('.content-card-figure img').attr('src')
    })
    return (data)
}).then((data) => {
    console.log(data)
})

