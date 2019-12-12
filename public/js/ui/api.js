// front-end implementation of endpoints

const baseUrl = "http://localhost:3000"

export function getArtistId(artistName) {
    return new Promise(function(resolve, reject) {
        const url = baseUrl + "/api/artist?artistName=" + artistName;
        // const body = { "artist": artistName };
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState != 4) return;

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

export function getReleases(artistName) {
    var url = baseUrl + "/api/artist?artistName=" + artistName;
    // const body = { "artist": artistName };
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
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
}

export function getArtistReleaseIds(artistId) {
    return new Promise(function(resolve, reject) {
        const url = baseUrl + "/api/artistReleases?artistId=" + artistId;

        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if(this.status == 200) {
                console.log(this.responseText);
                return this.responseText;
            }
        }
    
        request.open("GET", url, true);
        request.send();
    });
}