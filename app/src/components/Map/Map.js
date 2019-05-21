import React from 'react';
import ReactMapGL from 'react-map-gl';

import './Map.css';

class Map extends React.Component {
    state = {
        viewport: {
            width: window.innerWidth,
            height: window.innerHeight,
            latitude: 55.3781,
            longitude: -3.4360,
            zoom: 8,
        }
    };
        
    render() {
        return (
            <ReactMapGL
                className="map"
                {...this.state.viewport}
                onViewportChange={(viewport) => this.setState({viewport})}
            />
        )
    }
}

export default Map;