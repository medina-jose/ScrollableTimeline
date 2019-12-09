const express = require('express');
const app = express();
var cors = require('cors')
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;
const discogs = require('./public/js/discogs.js');


// server config
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded( {extended: true })); // to support URL-encoded bodies

// route options
app.options('/', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
});

// routes
app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/artist/:artistName', async function(req, res, next) {
    const response = await discogs.getArtistId(req, res);
    res.json(response);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));