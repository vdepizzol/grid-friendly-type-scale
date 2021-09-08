import React from 'react';
import VInputField from './VInputField';
import './TypeScaleEditor.css';

class TypeScaleEditor extends React.Component {
  
  /*
  constructor(props) {
    super(props);
  }
  */

  render() {
    const typeScale = this.props.typeScale;
    const listItems = typeScale.map((typeScaleItem) => {

      const handleSizeChange = (value) => {
        this.props.onChange(typeScaleItem.id, 'size', value);
      }

      const handleTitleChange = (value) => {
        this.props.onChange(typeScaleItem.id, 'title', value);
      }

      const handleAdjustedLineHeightChange = (value) => {
        this.props.onChange(typeScaleItem.id, 'adjustedLineHeight', value);
        console.log(value)
        return value;
      }

      return (
      <tr key={typeScaleItem.id}>
        <td>
          <VInputField
            value={typeScaleItem.size}
            onChange={handleSizeChange}
            suffix="px" />
        </td>
        <td>
          <VInputField
            type="text"
            onChange={handleTitleChange}
            value={typeScaleItem.title} />
        </td>
        <td>
          {this.props.snapToggle
            ? <VInputField
                type="text"
                disabled
                onChange={handleTitleChange}
                value={typeScaleItem.computedLineHeight} />
            : <VInputField
                type="text"
                onChange={handleAdjustedLineHeightChange}
                value={typeScaleItem.adjustedLineHeight} />
          }
        </td>
        <td>
          <VInputField
            type="number"
            step={this.props.gridSize}
            onChange={handleAdjustedLineHeightChange}
            value={typeScaleItem.adjustedLineHeight} />
        </td>
      </tr>
      );
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Size:</th>
            <th>Title:</th>
            <th>Adjusted lh:</th>
            <th>Computed lh:</th>
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