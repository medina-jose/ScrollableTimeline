export class Release {
    Release(artist, year, genres, tracks, imagePath, title) {
        this.artist = artist
        this.year = year;
        this.genres = genres;
        this.tracks = tracks;
        this.imagePath = imagePath;
        this.title = title;
    }  
    Release(json) {

    }

    getDecade() {
        // parse this from the date that comes back from the json
        var year = 1995;
        Decade.forEach((decade) => {
            if(year >= decade.min && year <= decade.max) { return decade; }
        });
        return Decade.Unknown;
    }
}

export const Decade = {
    "NineteenHundreds": { min: 1900, max: 1909 },
    "1910s": { min: 1910, max: 1919 },
    "1920s": { min: 1920, max: 1929 },
    "1930s": { min: 1930, max: 1939 },
    "1940s": { min: 1940, max: 1949 },
    "1950s": { min: 1950, max: 1959 },
    "1960s": { min: 1960, max: 1969 },
    "1970s": { min: 1970, max: 1979 },
    "1980s": { min: 1980, max: 1989 },
    "1990s": { min: 1990, max: 1999 },
    "2000s": { min: 2000, max: 2009 },
    "2010s": { min: 2010, max: 2019 },
    "Unknown": { min: -1, max: -1 }
}