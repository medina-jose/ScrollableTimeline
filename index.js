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

// routes
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/artist', async function(req, res) {
    const artistId = await discogs.getArtistId(req, res);
    res.json(artistId);
});

app.get('/api/artistReleases', async function(req, res) {
  const releaseIds = await discogs.getArtistReleaseIds(req, res);
  res.json(releaseIds);
});

app.get('/api/release', async function(req, res) {
  const release = await discogs.getRelease(req, res);
  res.json(release);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));