import React from 'react';
import ReactMapboxGl, { GeoJSONLayer } from "react-mapbox-gl";
import {fromJS} from 'immutable';
import * as MapboxGL from 'mapbox-gl';

import geojson from './chargers.geojson';
import regionGeojson from './regions.geojson';

import './Map.css';
import { generateRandomPoints, isInside, boundingBoxOfPolygon } from './util';

const MapboxMap = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
});


const symbolLayout: MapboxGL.SymbolLayout = {
    'text-field': '{place}',
    'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
    'text-offset': [0, 0.6],
    'text-anchor': 'top'
};

class Map extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            viewport: {
                containerStyle: {
                    height: "100vh",
                    width: "100vw"
                },
                style: "mapbox://styles/adamhirst/cjvyau2i307tj1cmbvpywzl3d",
                center: [-2.60933, 53.06325],
                zoom: [6],
                pitch: [50],
                bearing: [-35]
            },
            numNewChargers: this.props.numNewChargers,
            selectedPoly: undefined
        }
    }

    componentDidUpdate(oldProps) {
        if (this.state.selectedPoly == undefined) return;
        if (this.props.numNewChargers <= 0) return;
        if (this.state.numNewChargers == this.props.numNewChargers) return;
        this.setState({ numNewChargers: this.props.numNewChargers });
        let newPoints = generateRandomPoints(this.state.selectedPoly, this.state.numNewChargers);

        let markers = newPoints.map(x => {
            return {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': x 
                }
            };
        })
        
        this.removeMapLayer('new-chargers');
        this.map.addLayer({
            'id': 'new-chargers',
            'type': 'circle',
            'source': {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': markers
                }
            },
            'paint': {
                'circle-color': '#69AEFF',
                'circle-radius': 10
            },
            'minzoom': 5
        });
    }

    removeMapLayer(layer) {
        console.log('Q1');
        var mapLayer = this.map.getLayer(layer);

        console.log('Q2');
        if(typeof mapLayer !== 'undefined') {

            console.log('Q3');
            this.map.removeLayer(layer).removeSource(layer);
        }
    }

    onStyleLoad = (map, evt) => {
        this.map = map;

        map.addLayer({
            'id': 'regions-layer',
            'type': 'fill',
            'source': {
            'type': 'geojson',
            'data': regionGeojson
            },
            'paint': {
                'fill-color': 'rgba(74, 144, 226, 0.28)'
            },
            'maxzoom': 7
        });

        map.addLayer({
            'id': 'regions-border-layer',
            'type': 'line',
            'source': {
            'type': 'geojson',
            'data': regionGeojson
            },
            'paint': {
                'line-color': 'rgb(74, 144, 226)',
                'line-width': 3
            },
            'maxzoom': 7
        });

        map.addSource("chargers", {
            type: "geojson",
            data: geojson,
            cluster: true,
            clusterMaxZoom: 7, // Max zoom to cluster points on
            clusterRadius: 100 // Radius of each cluster when clustering points (defaults to 50)
        });

        map.addLayer({
            'id': 'chargers-layer',
            'type': 'circle',
            'source': "chargers",
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'circle-color': [
                    "step",
                    ["get", "kW"],
                    "#ABCF61",
                    33,
                    "#CFA361",
                    66,
                    "#CF616F"
                ],
                'circle-radius': 10
            },
            'minzoom': 5
        });

        map.addLayer({
            id: "clusters",
            type: "circle",
            'source': "chargers",
            filter: ["has", "point_count"],
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'circle-color': 'white',
                'circle-radius': 20,
            },
            'minzoom': 5,
            'maxzoom': 8
        });

        map.addLayer({
            id: "cluster-count",
            type: "symbol",
            source: "chargers",
            filter: ["has", "point_count"],
            layout: {
                "text-field": "{point_count_abbreviated}",
                "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
                "text-size": 12,
                'visibility': 'none'
            },
            'minzoom': 5,
            'maxzoom': 8
        });

        // map.getSource('')

        map.on('click', 'regions-layer', function (e) {
            this.props.updateRegionName(e.features[0].properties.regionName);
            this.props.showCalculator();

            let coordinates = e.features[0].geometry.coordinates[0];

            this.setState({ selectedPoly: coordinates });
            let bounds = coordinates.reduce(function (bounds, coord) {
                return bounds.extend(coord);
            }, new MapboxGL.LngLatBounds(coordinates[0], coordinates[0]));

            map.fitBounds(bounds, {
                padding: 20
            });

            this.removeMapLayer('selected-region');
            map.addLayer({
                'id': 'selected-region',
                'type': 'line',
                'source': {
                    'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Polygon',
                            'coordinates': e.features[0].geometry.coordinates
                        }
                    }
                },
                'paint': {
                    'line-color': 'rgb(74, 144, 226)',
                    'line-width': 3
                },
                'minzoom': 7
            })

            // let features = this.map.queryRenderedFeatures(boundingBoxOfPolygon(coordinates), { layers: ['clusters', 'cluster-count', 'chargers-layer'] });
            
            // features.forEach(feature => {
            //     feature.layout.visibility = 'visible';
            // })

        }.bind(this));
    }
    
    render() {
        return (
            <MapboxMap
                className="map"
                {...this.state.viewport}
                onStyleLoad={this.onStyleLoad} />
        )
    }
}

export default Map;