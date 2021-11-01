const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

const url = 'https://www.zerohedge.com/'

app.get('/', function (req, res) {
    res.json('This is my webscraper')
})

app.get('/results', (req, res) => {
    axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []

            $('h2', html).each(function () { 
                const title = $(this).text()
                const url = $(this).find('a').attr('href')
                if (title.includes("Bitcoin") || 
                    title.includes("bitcoin") || 
                    title.includes("Cryptocurrency") || 
                    title.includes("cryptocurrency") || 
                    title.includes("Crypto") || 
                    title.includes("crypto") || 
                    title.includes("Digital currency") || 
                    title.includes("digital currency")) {
                    articles.push({
                    title,
                    url
                    })
                }
            })
            res.json(articles)
        }).catch(err => console.log(err))

})


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))