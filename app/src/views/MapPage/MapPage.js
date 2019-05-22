import React from 'react';
import Map from '../../components/Map';
import Calculator from '../../components/Calculator';

import './MapPage.css';
import Car from '../../components/Car';

class MapPage extends React.Component {
    render() {
        return (
            <div>
            <Car />
            <Map />
            <Calculator />
            </div>
        )
    }
}

export default MapPage;