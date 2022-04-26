import axios from 'axios';

export function fetchGeoData() {

    const url = "https://raw.githubusercontent.com/JRGranell/javascript-challenge/master/data/boat_ramps.geojson";

    return axios.get(url)
        .then(({ data }) => {
            return data.features;
        })
        .catch(error => {return error} );
}
