import React from 'react';
import './TextboxLabel.css';

class TextboxLabel extends React.Component {
  static #defaultClassNames = 'TextboxLabel';

  
  handleClick(event) {
    /*
    if (event.type == 'mousedown') {
      
    } else {

    }
    */
  }

  render() {
    let labelCheckbox = (this.props.type === 'toggle') ? (
      <input
        type="checkbox"
        onChange={this.props.onChange}
        checked={this.props.checked} />
    ) : '';

    let className = (this.props.fullWidth) ? 'fullWidth' : '';

    return (
      <div className={ TextboxLabel.#defaultClassNames + ' ' + className}>
        <label htmlFor={this.props.id} onMouseDown={this.handleClick}>
          {labelCheckbox}
          {this.props.title}:
        </label>
        {this.props.children}
      </div>
    );
  }
}

export default TextboxLabel;