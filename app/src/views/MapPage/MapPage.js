import React from 'react';
import Map from '../../components/Map';

import './MapPage.css';
import Car from '../../components/Car';

class MapPage extends React.Component {
    render() {
        return (
            <div>
            <Car />
            <Map />
            </div>
        )
    }
}

export default MapPage;