import * as d3 from 'd3';

// const googleMapsClient = require('@google/maps').createClient({
//     key: 'AIzaSyDwuZ6m_-dHCgvuDjpd8siNb0MdOXGiYiM',
//     Promise: Promise
// });
const getMapStyle = () => {
    return [{
            "featureType": "all",
            "elementType": "all",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "featureType": "all",
            "elementType": "labels",
            "stylers": [{
                    "visibility": "off"
                },
                {
                    "saturation": "-100"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [{
                    "saturation": 36
                },
                {
                    "color": "#000000"
                },
                {
                    "lightness": 40
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [{
                    "visibility": "off"
                },
                {
                    "color": "#000000"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [{
                    "color": "#000000"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
                    "color": "#000000"
                },
                {
                    "lightness": 17
                },
                {
                    "weight": 1.2
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
                    "color": "#000000"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#4d6059"
            }]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#4d6059"
            }]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#4d6059"
            }]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "lightness": 21
            }]
        },
        {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#4d6059"
            }]
        },
        {
            "featureType": "poi",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#4d6059"
            }]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{
                    "visibility": "on"
                },
                {
                    "color": "#7f8d89"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#7f8d89"
            }]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                    "color": "#7f8d89"
                },
                {
                    "lightness": 17
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                    "color": "#7f8d89"
                },
                {
                    "lightness": 29
                },
                {
                    "weight": 0.2
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                    "color": "#000000"
                },
                {
                    "lightness": 18
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#7f8d89"
            }]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#7f8d89"
            }]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
                    "color": "#000000"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#7f8d89"
            }]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#7f8d89"
            }]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{
                    "color": "#000000"
                },
                {
                    "lightness": 19
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
                    "color": "#2b3638"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                    "color": "#2b3638"
                },
                {
                    "lightness": 17
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#24282b"
            }]
        },
        {
            "featureType": "water",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#24282b"
            }]
        },
        {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "water",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "water",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }
    ];
}
const initMap = (points) => {
    let styledMapType = new google.maps.StyledMapType(getMapStyle(), {
        name: 'Energey Consumption Map'
    });
    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {
            lat: 42.9849233,
            lng: -81.2452768
        },
        mapTypeControlOptions: {
            mapTypeIds: [
                'roadmap',
                'satellite',
                'hybrid',
                'terrain',
                'styled_map'
            ]
        }
    });

    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: points,
        map: map,
        radius: 16
    });

    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
}

d3.csv("data/2011.csv")
    .then(
        data => {
            var points = [];
            // console.log(data);
            data.forEach((location, index) => {
                if (!location['geocode']) {
                    return;
                }
                let location_geocode = JSON.parse(location['geocode']),
                    location_lat = location_geocode['lat'],
                    location_lng = location_geocode['lng'],
                    location_electricity = parseFloat(location['Electricity'].replace(',', ''), 10),
                    location_point = {
                        location: new google.maps.LatLng(location_lat, location_lng),
                        weight: location_electricity
                    };
                console.log(location_point);
                console.log(location['Electricity'].replace(',', ''));
                points.push(location_point);
            });

            initMap(points);
        },
        error => {
            throw error;
        });