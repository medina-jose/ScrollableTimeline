const USER_TOKEN = "afVHXPGTwOFYJgxfaEJlyKtdRVjsdiSiaKRozbvP"
const discogs = require("disconnect").Client;
const db = new discogs({userToken: USER_TOKEN}).database();

async function getArtistId(req, res) {
    const artist = req.query.artistName;
    // const words = req.query.artistName.split("+");
    // var artist = "";
    // words.forEach((word) => { artist += word; });
    const query = { "query": artist, "type": "artist", "per_page": 100 };

    try {
        const response = await db.search(query);
        if(response.results == null) { return null; }
        else if(response.results.length > 0) { return response.results[0].id }
    }
    catch (err) {
        console.log(err);
        return null;
    }

    return null;
}

async function getArtistReleaseIds(req, res) {
    const params = { "sort": "year", "sort_order": "asc", "per_page": 100};
    const artistId = req.query.artistId;

    try {
        const response = await db.getArtistReleases(artistId, params);
        var artistReleaseIds = [];
        if(response.releases != null) {
            response.releases.forEach((release) => {
               artistReleaseIds.push(release.id); 
            });
        }
        return artistReleaseIds;
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