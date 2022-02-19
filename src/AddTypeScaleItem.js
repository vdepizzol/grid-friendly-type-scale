import React from 'react';
import './AddTypeScaleItem.css';

class AddTypeScaleItem extends React.Component {
  static #defaultClassNames = 'AddTypeScaleItem';
  render() {
    return (
      <>
        <button
          className={AddTypeScaleItem.#defaultClassNames}
          onClick={this.props.handleAddItem}
        >
          Add
        </button>
      </>
    );
  }
}

export default AddTypeScaleItem;