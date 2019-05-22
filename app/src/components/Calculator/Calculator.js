import React from 'react';
import './Calculator.css';
import Slider from '../Slider';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = { output: null }
    this.SANITY_FACTOR = 0.1;
  }

  _numberOfChargersRequired = (data) => {
    const equation = 0.2214 + 
                     0.216 * Number(data.get('kWhPerMile')) + 
                     0.003 * Number(data.get('distancePerDay')) + 
                     0.515 * Number(data.get('percentageWhoPublicCharge')) +
                     0.288 * Number(data.get('percentageWhoLikeThisChargerType')) +
                    -0.024 * Number(data.get('chargingTimePerDay'))

    return(this.SANITY_FACTOR * 
           equation * 
           Number(data.get('numberOfEvs')) 
         - Number(data.get('existingChargingPoints')))
  }

  _updateOutput = (value) => {
    this.setState({ output: isNaN(value) ? "Error" : Math.ceil(value) });
  };

  output = () => {
    if(this.state.output !== null) {
      if(this.state.output < 0) {
        return <div className={"Calculator__output"}>We need to remove <span className={"output__value"}>{0 - this.state.output}</span> Charging Points.</div>
      } else if(this.state.output > 0) {
        return <div className={"Calculator__output"}>We need to build <span className={"output__value"}>{this.state.output}</span> extra Charging Points.</div>
      } else {
        return <div className={"Calculator__output"}>We already have the perfect number of charging points.</div>
      }
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
            <h1>{this.props.regionName || "region"}</h1>
            <div onClick={this.toggle} className={`toggle ${this.props.in ? "toggle--dismiss" : "toggle--summon"}`}></div>

            <form onSubmit={this.processForm} ref={this.formRef} id="form">
              <Slider
                name={"numberOfEvs"} 
                label={"Predicted number of EVs in the region"}
                min={0} 
                max={30000} 
                step={1000}
                defaultValue={3000}
                onInput={this.processForm} />

              <Slider
                name={"existingChargingPoints"} 
                label={"# of Existing Charging Points"}
                min={0} 
                max={1000} 
                step={100}
                defaultValue={200}
                onInput={this.processForm} />

              <Slider
                name={"chargingTimePerDay"} 
                label={"Hours chargers work per day"}
                min={3} 
                max={7} 
                step={1}
                defaultValue={3}
                suffix={"h/day"}
                onInput={this.processForm} />

              <Slider
                name={"percentageWhoPublicCharge"} 
                label={"Fraction of EV owners who use public charging"}
                min={0} 
                max={1} 
                step={0.05}
                defaultValue={0.15}
                isPercentage={true}
                suffix="%"
                onInput={this.processForm} />

              <Slider
                name={"kWhPerMile"} 
                label={"Average EV kWh per mile"}
                min={0} 
                max={1} 
                step={0.1}
                defaultValue={0.4}
                suffix={"kWh/mi"}
                onInput={this.processForm} />

              <Slider
                name={"distancePerDay"} 
                label={"Average EV distance driven per day"}
                min={20} 
                max={100} 
                step={10}
                defaultValue={40}
                suffix={"mi/day"}
                onInput={this.processForm} />

              <Slider
                name={"percentageWhoLikeThisChargerType"} 
                label={"Fraction of EV owners who like this charger type"}
                min={0.5} 
                max={1} 
                step={0.1}
                defaultValue={0.9}
                isPercentage={true}
                suffix={"%"}
                onInput={this.processForm} />
            </form>

            {this.output()}
          </div>
      )
    }
}

export default Calculator;