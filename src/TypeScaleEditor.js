import React from 'react';
import VInputField from './VInputField';
import './TypeScaleEditor.css';

class TypeScaleEditor extends React.Component {
  static #defaultClassNames = 'TypeScaleEditor';


  constructor(props) {
    super(props);

    this.bindHandlersToContext();
  }

  bindHandlersToContext() {
    this.handleInputChange = this.handleInputChange.bind(this);
  }


  handleInputChange(id, name, value) {
    if (name != 'title') value = +value;
    this.props.onChange(id, name, value);
  }

  render() {
    const typeScale = this.props.typeScale;

    const listItems = typeScale.map((typeScaleItem) => {
      let step = this.props.gridSize;

      console.log('render', typeScaleItem.id, typeScaleItem.adjustedLineHeight);

      if (!this.props.snapToggle) {
        step = null;
      }

      return (
      <tr key={typeScaleItem.id} aria-role="row">
        <td aria-role="cell top-left">
          <VInputField
            key={typeScaleItem.id + '_size'}
            name={'typeScale[' + typeScaleItem.id + '][size]'}
            className="inTableEditor"
            onChange={(e) => {
              this.handleInputChange(typeScaleItem.id, 'size', e.target.value);
            }}
            value={typeScaleItem.size}
            suffix="px" />
        </td>
        <td aria-role="cell">
          <VInputField
            key={typeScaleItem.id + '_title'}
            name={'typeScale[' + typeScaleItem.id + '][title]'}
            type="text"
            value={typeScaleItem.title}
            className="fullWidth inTableEditor"
            onChange={(e) => {
              this.handleInputChange(typeScaleItem.id, 'title', e.target.value);
            }} />
        </td>
        <td aria-role="cell">
          <VInputField
            key={typeScaleItem.id + '_adjustedLineHeight'}
            name={'typeScale[' + typeScaleItem.id + '][adjustedLineHeight]'}
            type="number"
            step={step}
            className="inTableEditor"
            onChange={(e) => {
              this.handleInputChange(typeScaleItem.id, 'adjustedLineHeight', e.target.value);
            }}
            value={typeScaleItem.adjustedLineHeight}
            suffix="px" />
        </td>
        <td aria-role="cell">
          <VInputField
            key={typeScaleItem.id + '_weight'}
            name={'typeScale[' + typeScaleItem.id + '][weight]'}
            type="number"
            className="inTableEditor"
            onChange={(e) => {
              this.handleInputChange(typeScaleItem.id, 'weight', e.target.value);
            }}
            placeholder="inherit"
            value={typeScaleItem.weight}
            step="100"
            min="100"
            max="900" />
        </td>
      </tr>
      );
    });

    return (
      <table className={TypeScaleEditor.#defaultClassNames}>
        <thead>
          <tr>
            <th aria-role="columnheader" style={{width: '20%'}}>Size</th>
            <th aria-role="columnheader" style={{width: '40%'}}>Name</th>
            <th aria-role="columnheader" style={{width: '24%'}}>Line height</th>
            <th aria-role="columnheader" style={{width: '20%'}}>Weight</th>
            <th aria-role="columnheader">&nbsp; {/* Actions */ }</th>
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