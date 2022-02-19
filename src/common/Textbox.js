import React from 'react';
import './Textbox.css';
import {ReactComponent as SpinUpIcon} from '../icons/spin-up.svg';
import {ReactComponent as SpinDownIcon} from '../icons/spin-down.svg';


class Textbox extends React.Component {
  static #defaultClassNames = 'Textbox';

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      spinUpPressed: false,
      spinDownPressed: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleSpinUp = this.handleSpinUp.bind(this);
    this.handleSpinDown = this.handleSpinDown.bind(this);

    this.inputElement = React.createRef();
  }

  handleChange(e) {
    this.updateValue(+e.target.value);
    // this.setState({
    //   value: e.target.value
    // });

    // this.props.onChange(e);
  }

  handleKeyDown(e) {
    console.log(e, e.code);

    let stateUpdate = {
      spinUpPressed: e.code === 'ArrowUp',
      spinDownPressed: e.code === 'ArrowDown',
    };

    this.setState(stateUpdate);
  }

  handleKeyUp(e) {
    this.setState({
      spinUpPressed: false,
      spinDownPressed: false,
    });
  }

  handleDoubleClick(e) {
    //this.inputElement.current.select();
  }

  handleSpinUp(e) {
    e.preventDefault();

    // FIXME
    // parseFloat is unstable 1.7000000000001

    const step = parseFloat(this.props.step || 1);

    // this.setState({
    //   value: this.state.value + step,
    // });

    this.updateValue(this.state.value + step);
    // needs to trigger `change` event
  }

  handleSpinDown(e) {
    e.preventDefault();

    // FIXME
    // parseFloat is unstable 1.7000000000001

    const step = parseFloat(this.props.step || 1);
    
    // this.setState({
    //   value: this.state.value - step,
    // });
    this.updateValue(this.state.value - step);

    // needs to trigger `change` event

  }

  updateValue(value) {
    if (value !== 0) {
      value = Math.max(
        +this.props.min,
        Math.min(+this.props.max, value)
      );
  
      
    }
    
    this.setState({
      value: value || '',
    });

    if (value !== 0) this.props.onChange(value);
  }

  render() {
    let className = (this.props.isDisabled) ? 'disabled' : '';
    className += (this.props.width) ? (' width-' + this.props.width) : '';
    className += (this.props.className) ? (' ' + this.props.className) : '';
    className += (this.props.prefixIcon) ? ' has-prefix' : '';
    className += (this.props.suffix) ? ' has-suffix' : '';

    const type = (this.props.type) ? this.props.type : 'number';

    return (
      <label
        className={Textbox.#defaultClassNames + ' ' + className}
        onDoubleClick={this.handleDoubleClick}>

        {this.props.prefixIcon &&
          <span className="prefix">{this.props.prefixIcon}</span>
        }

        <input
          id={this.props.id}
          name={this.props.name}
          type={type}
          value={this.state.value}
          disabled={this.props.isDisabled}
          placeholder={this.props.placeholder}
          list={this.props.list}
          ref={this.inputElement}
          
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}

          step={this.props.step}
          min={this.props.min}
          max={this.props.max}
          />

        {type == 'number' &&
          <span className="spin-button">
            <span className={`spin-up ${this.state.spinUpPressed ? " pressed" : ""}`} 
                  onMouseDown={this.handleSpinUp}>
              <span>
                <SpinUpIcon />
              </span>
            </span>
            <span className={`spin-down ${this.state.spinDownPressed ? " pressed" : ""}`} onMouseDown={this.handleSpinDown}>
              <span>
                <SpinDownIcon />
              </span>
            </span>
          </span> 
        }
        {this.props.suffix &&
          <span className="suffix">{this.props.suffix}</span>
        }
      </label>
    );
  }
}

export default Textbox;