import React from 'react';
import './VInputField.css';


class VInputField extends React.Component {
  static #defaultClassNames = 'input';

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.inputField = React.createRef();
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  handleDoubleClick(e) {
    this.inputField.current.select();
  }

  render() {
    let className = (this.props.disabled) ? 'disabled' : '';

    className += (this.props.isVisible) ? ' hidden' : '';

    return (
      <label
        className={VInputField.#defaultClassNames + ' ' + className}
        onDoubleClick={this.handleDoubleClick}>

        <input
          type={this.props.type ?? 'number'}
          step={this.props.step}
          id={this.props.id}
          disabled={this.props.disabled}
          defaultValue={this.props.value}
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          ref={this.inputField} />

        {this.props.suffix &&
          <span className="suffix">{this.props.suffix}</span>
        }
      </label>
    );
  }
}

export default VInputField