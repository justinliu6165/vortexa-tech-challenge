import axios from 'axios';

export function fetchGeoData() {

    const url = "https://raw.githubusercontent.com/JRGranell/javascript-challenge/master/data/boat_ramps.geojson";

    return axios.get(url)
        .then(({ data }) => {

            data.features.map(feat => {

                if(feat.geometry) {
                    // Set Geojson multipolygon to point
                    let lat = feat.geometry.coordinates[0][0][0][1];
                    let long = feat.geometry.coordinates[0][0][0][0];

                    feat.geometry.type = "Point"
                    feat.geometry.coordinates = [long, lat];
                }

                return feat;
            })

            return data;
        })
        .catch(error => {return error} );
}
