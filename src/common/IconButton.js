import React from 'react';
import './IconButton.css';

class IconButton extends React.Component {
  static #defaultClassNames = 'IconButton';

  render() {
    let classNames = '';

    return (
        <button
          className={IconButton.#defaultClassNames + ' ' + classNames}
          onClick={this.props.onClick}
          aria-label={this.props.label}
          >
          {this.props.icon}
        </button>
    );
  }
}

export default IconButton;