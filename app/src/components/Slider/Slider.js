import React from 'react';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.defaultValue };
    this.inputRef = React.createRef();
  }

  onInput = () => {
    const value = this.inputRef.current.value;

    this.setState({ value: value })

    this.props.onInput(value);
  };

  render() {
    return(
      <fieldset>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input 
          ref={this.inputRef}
          type={"range"} 
          name={this.props.name}
          min={Number(this.props.min)}
          max={Number(this.props.max)} 
          step={Number(this.props.step)}
          defaultValue={Number(this.props.defaultValue)}
          onInput={this.onInput}
        />
        <div className={"slider__output"}>{this.state.value}</div>
      </fieldset>
    )
  }
}

export default Slider;