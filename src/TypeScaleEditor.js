import React from 'react';
import VInputField from './VInputField';
import './TypeScaleEditor.css';

class TypeScaleEditor extends React.Component {
  static #defaultClassNames = 'TypeScaleEditor';


  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.adjustLineHeight = this.adjustLineHeight.bind(this);

  }

  handleInputChange(id, name, value) {
    this.props.onChange(id, name, value);
  }

  adjustLineHeight(id, operation) {
    const step = this.props.gridSize * ((operation === 'add') ? 1 : -1);
    const currentValue = this.props.typeScale[id].adjustedLineHeight;

    this.props.onChange(id, 'adjustedLineHeight', currentValue + step);
  }

  render() {
    const typeScale = this.props.typeScale;
    const listItems = typeScale.map((typeScaleItem) => {

      let step = this.props.gridSize;

      if (!this.props.snapToggle) {
        step = 1;
      }

      return (
      <tr key={typeScaleItem.id}>
        <td>
          <VInputField
            key={typeScaleItem.id + '_size'}
            name={'typeScale[' + typeScaleItem.id + '][size]'}
            onChange={(e) => {
              this.handleInputChange(typeScaleItem.id, 'size', e.target.value);
            }}
            value={typeScaleItem.size}
            suffix="px" />
        </td>
        <td>
          <VInputField
            key={typeScaleItem.id + '_title'}
            name={'typeScale[' + typeScaleItem.id + '][title]'}
            type="text"
            value={typeScaleItem.title}
            onChange={(e) => {
              this.handleInputChange(typeScaleItem.id, 'title', e.target.value);
            }} />
        </td>
        <td>
          <div style={{display: 'grid', gridAutoFlow: 'column', gap: 4}}>
            <VInputField
              key={typeScaleItem.id + '_computedLineHeight'}
              name={'typeScale[' + typeScaleItem.id + '][computedLineHeight]'}
              type="number"
              disabled
              isVisible={!this.props.snapToggle}
              onChange={(e) => {
                this.handleInputChange(typeScaleItem.id, 'computedLineHeight', e.target.value);
              }}
              value={typeScaleItem.computedLineHeight}
              suffix="px" />

            <VInputField
              key={typeScaleItem.id + '_adjustedLineHeight'}
              name={'typeScale[' + typeScaleItem.id + '][adjustedLineHeight]'}
              type="number"
              step={step}
              onChange={(e) => {
                this.handleInputChange(typeScaleItem.id, 'adjustedLineHeight', e.target.value);
              }}
              value={typeScaleItem.adjustedLineHeight}
              suffix="px" />
            
            <button
              className="tempBtn"
              onClick={() => {
                this.adjustLineHeight(typeScaleItem.id, 'add');
              }}>+</button>
            
            <button
              className="tempBtn"
              onClick={() => {
                this.adjustLineHeight(typeScaleItem.id, 'substract');
              }}>&minus;</button>
          </div>
        </td>
      </tr>
      );
    });

    return (
      <table className={TypeScaleEditor.#defaultClassNames}>
        <thead>
          <tr>
            <th>Size:</th>
            <th>Title:</th>
            <th>Adjusted line height:</th>
          </tr>
        </thead>
        <tbody>
          {listItems}
        </tbody>
      </table>
    );
  };

}

export default TypeScaleEditor;