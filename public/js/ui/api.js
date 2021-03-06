// front-end implementation of endpoints

const baseUrl = "http://localhost:3000"

export function getArtistId(artistName) {
    return new Promise(function(resolve, reject) {
        artistName.split(' ').join('+') // query cannot accept spaces. Replace with '+' character
        const url = baseUrl + "/api/artist?artistName=" + artistName;
        // const body = { "artist": artistName };
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState != 4) { return };

            if(this.status == 200) {
                console.log(this.responseText);
                resolve(this.responseText);
            }
            else {
                reject({
                    status: this.status,
                    statusText: request.statusText
                });
            }
        }
    
        request.open("GET", url, true);
        request.send();
    });
}

export function getArtistReleaseIds(artistId) {
    return new Promise(function(resolve, reject) {
        const url = baseUrl + "/api/artistReleases?artistId=" + artistId;

        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState != 4) { return };

            if(this.status == 200) {
                var releaseIds = JSON.parse(this.responseText);
                console.log(releaseIds);
                resolve(releaseIds);
            }
            else {
                reject( { status: this.status, statusText: request.statusText });
            }
        }
    
        request.open("GET", url, true);
        request.send();
    });
}

export function getRelease(releaseId) {
    return new Promise(function(resolve, reject) {
        const url = baseUrl + "/api/release?releaseId=" + releaseId;

        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if(request.readyState != 4) { return; }

            if(this.status == 200) {
                var release = JSON.parse(this.responseText);
                console.log(release);
                resolve(release);
            }
            else {
                reject({ status: this.status, statusText: request.statusText });
            }
        }

        request.open("GET", url, true);
        request.send();
    })
}

export function getReleaseImage(resourceUrl) {

}