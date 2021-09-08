import React from 'react';
import './VLabel.css';

class VLabel extends React.Component {
  static #defaultClassNames = 'VLabel';

  /*
  constructor(props) {
    super(props);
  }
  */

  render() {

    let labelCheckbox = (this.props.type === 'toggle') ? (
      <input
        type="checkbox"
        onChange={this.props.onChange}
        checked={this.props.checked} />
    ) : '';

    return (
      <div className={VLabel.#defaultClassNames}>
        <label htmlFor={this.props.id}>
          {labelCheckbox}
          {this.props.title}:
        </label>
        {this.props.children}
      </div>
    );
  }
}

export default VLabel;