// this is the frontend implementation of all the necessary endpoints

export function getArtistId(artistName) {
    const url = "localhost:3000/api/artist/?artistName=" + artistName;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if(this.status == 200) {
            console.log(this.responseText);
            return this.responseText;
        }
    }

    request.open("GET", url, true);
    request.send();
}