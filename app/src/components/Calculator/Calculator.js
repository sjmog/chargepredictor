import React from 'react';
import './Calculator.css';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = { output: null }
  }

  _numberOfChargersRequired = (data) => {
    const equation = 0.2214 + 
                     0.216 * Number(data.get('kWhPerMile')) + 
                     0.003 * Number(data.get('distancePerDay')) + 
                     0.515 * Number(data.get('fractionWhoPublicCharge')) +
                    -0.288 * Number(data.get('fractionWhoLikeThisChargerType')) +
                    -0.024 * Number(data.get('chargingTimePerDay'))

    return equation * Number(data.get('numberOfEvs')) - Number(data.get('existingChargingPoints'))
  }

  _updateOutput = (value) => {
    this.setState({ output: isNaN(value) ? "Error" : Math.ceil(value) });
  };

  output = () => {
    if(this.state.output !== null) {
      return <div>You need to build {this.state.output} Charging Points.</div>
    } else {
      return null;
    }
  }

  processForm = (e) => {
    if (e.preventDefault) e.preventDefault();
    const numberOfNewChargingPoints = this._numberOfChargersRequired(new FormData(this.formRef.current));
    this._updateOutput(numberOfNewChargingPoints);

    this.props.onSubmit(numberOfNewChargingPoints);
  };

  toggle = () => {
    this.setState({ output: null })
    this.props.toggle()
  }

  render() {
      return (
          <div className={`Calculator ${this.props.in ? "Calculator--in" : ""}`}>
            <h1>How many electric charging points do you need to build?</h1>
            <div onClick={this.toggle} className={`toggle ${this.props.in ? "toggle--dismiss" : "toggle--summon"}`}></div>

            <form onSubmit={this.processForm} ref={this.formRef} id="form">

              <label htmlFor={"numberOfEvs"}>Predicted number of EVs in the region</label>
              <input type="number" name="numberOfEvs" />

              <label htmlFor={"existingChargingPoints"}># of Existing Charging Points</label>
              <input type="number" name="existingChargingPoints" />

              <label htmlFor={"chargingTimePerDay"}>Average hours per day spent charging (e.g. hours chargers are working)</label>
              <input type="range" min={3} max={7} defaultValue={3} name="chargingTimePerDay" id="chargingTimePerDaySlider" />

              <label htmlFor={"percentageWhoPublicCharge"}>Fraction of EV owners who use public charging</label>
              <input type="number" name="fractionWhoPublicCharge" defaultValue={0.15} />

              <label htmlFor={"kWhPerMile"}>Average EV kWh per mile</label>
              <input type="number" name="kWhPerMile" defaultValue={0.4} />

              <label htmlFor={"distancePerDay"}>Average EV distance driven per day</label>
              <input type="number" name="distancePerDay" defaultValue={40} />

              <label htmlFor={"chargerPower"}>Fraction of EV owners who like this charger type</label>
              <input type="number" name="fractionWhoLikeThisChargerType" defaultValue={0.9} />

              <button type="submit">Go</button>
            </form>

            {this.output()}
          </div>
      )
    }
}

export default Calculator;