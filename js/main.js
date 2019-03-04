import * as d3 from 'd3';

const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyDwuZ6m_-dHCgvuDjpd8siNb0MdOXGiYiM',
    Promise: Promise
});



d3.csv("data/2011.csv")
    .then(
        data => {
            console.log(data);
            data.forEach((location, index) => {
                console.log(googleMapsClient);
                // googleMapsClient.geocode({
                //         address: location['Address'],
                //         region: 'CA'
                //     }).asPromise()
                //     .then((response) => {
                //         console.log(response.json.results);
                //     })
                //     .catch((err) => {
                //         console.log(err);
                //     });

                // googleMapsClient.geocode({
                //         address: '1600 Amphitheatre Parkway, Mountain View, CA'
                //     }).asPromise()
                //     .then((response) => {
                //         console.log(response.json.results);
                //     })
                //     .catch((err) => {
                //         console.log(err);
                //     });
            });
        },
        error => {
            throw error;
        });