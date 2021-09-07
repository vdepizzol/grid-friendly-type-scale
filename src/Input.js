import React from 'react';
import './Input.css';


class Input extends React.Component {
  
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
    console.log('double click', e.target.nodeName, this);
    //e.target.select()
    this.inputField.current.select();
  }

  render() {
    let className = "input";

    if (this.props.disabled) {
      className += " disabled";
    }

    return (
      <label
        className={className}
        onDoubleClick={this.handleDoubleClick}>

        <input
          type={this.props.type || "number"}
          id={this.props.id}
          disabled={this.props.disabled}
          defaultValue={this.props.value}
          onChange={this.handleChange}
          ref={this.inputField} />

        {this.props.suffix &&
          <span className="suffix">{this.props.suffix}</span>
        }
      </label>
    );
  }
}
export default Input;