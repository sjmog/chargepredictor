import React from 'react';
import './Slider.css';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.defaultValue };
    this.inputRef = React.createRef();
  }

  onInput = () => {
    let value = this.inputRef.current.value;

    this.setState({ value: value })

    this.props.onInput(value);
  };

  render() {
    return(
      <fieldset className={"Slider"}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <div className={"Slider__holder"}>
          <input 
            ref={this.inputRef}
            type={"range"} 
            name={this.props.name}
            min={Number(this.props.min)}
            max={Number(this.props.max)} 
            step={Number(this.props.step)}
            defaultValue={Number(this.props.defaultValue)}
            onInput={this.onInput}
            className={"holder__range"}
          />
          <div className={"holder__output"}>
            {this.props.isPercentage ? this.state.value * 100 : this.state.value}
            <span className={"suffix"}>
              {this.props.suffix}
            </span>
          </div>
        </div>
      </fieldset>
    )
  }
}

export default Slider;