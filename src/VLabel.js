import React from 'react';
import './VLabel.css';

class VLabel extends React.Component {
  static #defaultClassNames = 'VLabel';

  
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
      <div className={ VLabel.#defaultClassNames + ' ' + className}>
        <label htmlFor={this.props.id} onMouseDown={this.handleClick}>
          {labelCheckbox}
          {this.props.title}:
        </label>
        {this.props.children}
      </div>
    );
  }
}

export default VLabel;