const USER_TOKEN = "afVHXPGTwOFYJgxfaEJlyKtdRVjsdiSiaKRozbvP"
const discogs = require("disconnect").Client;
const db = new discogs({userToken: USER_TOKEN}).database();

async function getArtistId(req, res) {
    // const query = JSON.parse(req.body);
    const words = req.query.artistName.split("+");
    var artist = "";
    words.forEach((word) => { artist += word; });
    const query = { "artist": artist };

    try {
        const response = await db.search(query);
        // return id of first object in results array
        return response;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

async function getArtistReleaseIds(req, res) {
    const query = { "artist_id": req.body.artistId, "sort": "year" }

    try {
        // get response with json that contains main release ids
        return res;
    }
    catch {
        console.log(err);
        return null;
    }
}

// TODO: query is a path paramter or a body paramter?
// depends on disconnect implementation
async function getRelease(req, res) {
    const query = { "master_id": req.body.masterId }

    try {
        // get release json
        return res;
    }
    catch {
        console.log(err);
        return null;
    }
}

module.exports.getArtistId = getArtistId;
module.exports.getArtistReleaseIds = getArtistReleaseIds;
module.exports.getRelease = getRelease;