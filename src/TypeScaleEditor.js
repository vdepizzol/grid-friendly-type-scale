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
    console.log('rerender editor', typeScale);
    const listItems = typeScale.map((typeScaleItem) => {

      const handleSizeChange = (value) => {
        this.props.onChange(typeScaleItem.id, 'size', value);
      }

      const handleTitleChange = (value) => {
        this.props.onChange(typeScaleItem.id, 'title', value);
      }

      const handleAdjustedLineHeightChange = (value) => {
        this.props.onChange(typeScaleItem.id, 'adjustedLineHeight', value);
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
          <div style={{display: 'grid', gridAutoFlow: 'column', gap: 4}}>
            <VInputField
              isVisible={!this.props.snapToggle}
              type="text"
              disabled
              value={typeScaleItem.computedLineHeight}
              suffix="c:1" />

            <VInputField
              isVisible={!this.props.snapToggle}
              type="number"
              step={this.props.gridSize}
              onChange={handleAdjustedLineHeightChange}
              value={typeScaleItem.adjustedLineHeight}
              suffix="a:2" />

            <VInputField
              isVisible={this.props.snapToggle}
              type="number"
              onChange={handleAdjustedLineHeightChange}
              value={typeScaleItem.adjustedLineHeight}
              suffix="a:3" />
          </div>
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