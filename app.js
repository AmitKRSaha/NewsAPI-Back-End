var express = require('express');
var axios = require('axios');
var bodyParser = require('body-parser');
var cors = require('cors')

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());

const API_KEY = '701f4456fb0146189de2f351760b6e1e';
let news = 'Ok';

const validateInput = (input) => {
    if (!input || !input.query || !input.query.searchTerm || input.query.searchTerm !== 'bitcoin') {
        return {
            statCode: '400',
            message: 'Please add "bitcoin" into the field'
        }
    }
    else {
        return {
            statCode: '200',
            message: 'Success'

        }
    }

}

app.get('/', async function (req, res) {
    const { statCode, message } = validateInput(req);

    if (statCode === "400") {
        res.status(statCode).send(message);
    }
    try {
        const url = `https://newsapi.org/v2/everything?q=${req.body.searchTerm}&apiKey=${API_KEY}`;
        let resp = await axios.get(url);
        let data = await resp.data;
        news = data;
        // console.log(news);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send('Please try after some time');
    }

});

app.get('/details/:id', async function (req, res) {
    var id = req.params.id;
    const article = news.articles.filter(article => article.author && article.author.toLowerCase().includes(id.toLowerCase()));
    res.status(200).send(article);
});

app.listen(3001, () => {
    console.log(`Server is listenig at ${3001} port`);
});

module.exports = {
    validateInput
}

