import React from 'react';
import './VInputField.css';


class VInputField extends React.Component {
  static #defaultClassNames = 'VInputField';

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.inputField = React.createRef();
  }

  handleChange(e) {
    this.props.onChange(e);
  }

  handleDoubleClick(e) {
    this.inputField.current.select();
  }

  render() {
    let className = (this.props.disabled) ? 'disabled' : '';
    className += (this.props.isVisible) ? ' hidden' : '';
    className += (this.props.className) ? (' ' + this.props.className) : '';

    return (
      <label
        className={VInputField.#defaultClassNames + ' ' + className}
        onDoubleClick={this.handleDoubleClick}>

        <input
          name={this.props.name}
          type={this.props.type ?? 'number'}
          step={this.props.step}
          id={this.props.id}
          disabled={this.props.disabled}
          defaultValue={this.props.value}
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          list={this.props.list}
          ref={this.inputField} />

        {this.props.suffix &&
          <span className="suffix">{this.props.suffix}</span>
        }
      </label>
    );
  }
}

export default VInputField