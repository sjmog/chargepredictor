import React from 'react';
import Map from '../../components/Map';
import Calculator from '../../components/Calculator';

import './MapPage.css';
import Car from '../../components/Car';

class MapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { calculatorIn: false }
  }

  onCalculatorSubmit = (numberOfNewChargingPoints) => {
    // do something with the number of charging points on the map
    console.log(numberOfNewChargingPoints)
    // return false in order to avoid form submission propagating to the window
    return false;
  };

  toggleCalculator = () => {
    console.log('woo')
    this.setState({ calculatorIn: !this.state.calculatorIn })
  };

    render() {
        return (
            <div>
            <Car />
            <Map />
            <Calculator 
              in={this.state.calculatorIn} 
              onSubmit={this.onCalculatorSubmit.bind(this)}
              toggle={this.toggleCalculator.bind(this) } />
            </div>
        )
    }
}

export default MapPage;