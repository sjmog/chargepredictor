import React from 'react';
import Map from '../../components/Map';
import Calculator from '../../components/Calculator';

import './MapPage.css';
import Car from '../../components/Car';

class MapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        calculatorIn: false,
        numberOfNewChargingPoints: 0,
        regionName: ''
    }
  }

  onCalculatorSubmit = (numberOfNewChargingPoints) => {
    // do something with the number of charging points on the map
    this.setState({ numberOfNewChargingPoints });
    // return false in order to avoid form submission propagating to the window
    return false;
  };

  updateRegionName = (newRegionName) => {
      this.setState({ regionName: newRegionName });
  }

  toggleCalculator = () => {
    console.log('woo')
    this.setState({ calculatorIn: !this.state.calculatorIn })
  };

    render() {
        return (
            <div>
            <Car />
            <Map
              numNewChargers={this.state.numberOfNewChargingPoints}
              updateRegionName={this.updateRegionName.bind(this)} />
            <Calculator 
              regionName={this.state.regionName}
              in={this.state.calculatorIn} 
              onSubmit={this.onCalculatorSubmit.bind(this)}
              toggle={this.toggleCalculator.bind(this) } />
            </div>
        )
    }
}

export default MapPage;