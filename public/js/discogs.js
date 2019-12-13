const USER_TOKEN = "afVHXPGTwOFYJgxfaEJlyKtdRVjsdiSiaKRozbvP"
const discogs = require("disconnect").Client;
const db = new discogs({userToken: USER_TOKEN}).database();
const fs = require('fs');

async function getArtistId(req, res) {
    const artist = req.query.artistName;
    // const words = req.query.artistName.split("+");
    // var artist = "";
    // words.forEach((word) => { artist += word; });
    const query = { "query": req.query.artistName, "type": "artist", "per_page": 100 };

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
    var params = { "sort": "year", "sort_order": "asc", "per_page": 100, "page": 1 };
    const artistId = req.query.artistId;

    try {
        var response = await db.getArtistReleases(artistId, params);
        if(response.releases == null) { return null; }

        var artistReleases = [];
        response.releases.forEach((release) => { 
            if(release.year != "" && release.id != null && release.type == "master") { artistReleases.push(release); }
        })

        while(response.pagination.urls.next != null && params.page < 5)
        {
            params.page++;
            try {
                response = await db.getArtistReleases(artistId, params);
                artistReleases.push(response.releases);
                response.releases.forEach((release) => { 
                    if(release.year != "" && release.id != null && release.type == "master") { artistReleases.push(release); }
                })
            }
            catch (err) { console.log(err); }
        }

        var artistReleaseIds = [];
        artistReleases.forEach((release) => {
            artistReleaseIds.push(release.id); 
        });
        
        return artistReleaseIds;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

// TODO: query is a path paramter or a body paramter?
// depends on disconnect implementation
async function getRelease(req, res) {
    await timeout(250);
    const releaseId = Number(req.query.releaseId);

    try {
        const response = await db.getMaster(releaseId)
        if(response == null) { return null; }
        getImage(response.images[0].resource_url, releaseId);
        response.imagePath = '../images/' + releaseId + '.jpg';
        return response;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

async function getImage(url, releaseId) {
    const filename =  __dirname + '/../images/' + releaseId + '.jpg';

    db.getImage(url, function(err, data) {
        fs.writeFile(filename, data, 'binary', function(err) {
            if(err != null) { console.log(err);}
            console.log("Image save at " + filename);
        });
    });
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


module.exports.getArtistId = getArtistId;
module.exports.getArtistReleaseIds = getArtistReleaseIds;
module.exports.getRelease = getRelease;