import React from 'react';
import VInputField from './VInputField';
import './TypeScaleEditor.css';

class TypeScaleEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {

    const typeScale = this.props.typeScale;
    const listItems = typeScale.map((typeScaleItem) => {

      const handleSizeChange = (value) => {
        this.props.onChange(typeScaleItem.id, 'size', value);
      }

      const handleTitleChange = (value) => {
        this.props.onChange(typeScaleItem.id, 'title', value);
      }

      const handleLineHeightChange = (value) => {
        console.log('WHAT');
        this.props.onChange(typeScaleItem.id, 'adjustedLineHeight', value);
        return value;
      }

      let step = this.props.gridSize;

      if (!this.props.snapToggle) {
        step = 1;
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
              type="number"
              disabled
              isVisible={!this.props.snapToggle}
              value={typeScaleItem.computedLineHeight}
              suffix="xo" />

            <VInputField
              type="number"
              step={step}
              onChange={handleLineHeightChange}
              value={typeScaleItem.adjustedLineHeight}
              suffix="a:2" />
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