import React from 'react';
import ReactMapboxGl, { GeoJSONLayer } from "react-mapbox-gl";
import {fromJS} from 'immutable';
import * as MapboxGL from 'mapbox-gl';

import geojson from './chargers.geojson';
import regionGeojson from './regions.geojson';

import './Map.css';

const MapboxMap = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
});


const symbolLayout: MapboxGL.SymbolLayout = {
    'text-field': '{place}',
    'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
    'text-offset': [0, 0.6],
    'text-anchor': 'top'
  };
  const symbolPaint: MapboxGL.SymbolPaint = {
    'text-color': 'white'
  };
  
  const circleLayout: MapboxGL.CircleLayout = { visibility: 'visible' };
  const circlePaint: MapboxGL.CirclePaint = {
    'circle-color': 'white'
  };

const regionsPaint: MapboxGL.FillPaint = {
    'fill-color': 'rgba(74, 144, 226, 0.28)'
}

const regionLinePaint: MapboxGL.LinePaint = {
    'line-color': 'rgb(74, 144, 226)',
    'line-width': 3
}



class Map extends React.Component {
    state = {
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
        }
    };

    onRegionSelect = (evt) => {
        let bounds = evt.target.getBounds();
        console.log(evt);
        // this.map.fitBounds([[ bounds._ne.lng, bounds._ne.lat ], [ bounds._sw.lng, bounds._sw.lat ]]);
        // console.log(this.map)
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
            }
        });

        map.on('click', 'regions-layer', function (e) {
            var coordinates = e.features[0].geometry.coordinates[0];
            var bounds = coordinates.reduce(function (bounds, coord) {
                return bounds.extend(coord);
            }, new MapboxGL.LngLatBounds(coordinates[0], coordinates[0]));

            map.fitBounds(bounds, {
                padding: 20
            });

        });
    }
    
    render() {
        return (
            <MapboxMap
                className="map"
                {...this.state.viewport}
                onStyleLoad={this.onStyleLoad}>
                <GeoJSONLayer
                    data={geojson}
                    circleLayout={circleLayout}
                    circlePaint={circlePaint}
                    circleOnClick={this.onClickCircle}
                    symbolLayout={symbolLayout}
                    symbolPaint={symbolPaint}
                />
                {/* <GeoJSONLayer
                    data={regionGeojson}
                    fillPaint={regionsPaint}
                    fillOnClick={this.onRegionSelect}
                /> */}
                <GeoJSONLayer
                    data={regionGeojson}
                    linePaint={regionLinePaint}
                />
            </MapboxMap>
        )
    }
}

export default Map;