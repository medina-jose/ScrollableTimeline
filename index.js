const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
var discogs = require('disconnect').Client;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// test discogs
var db = new discogs().database();
db.getRelease(176126, function(err, data) {
    console.log(data);
})