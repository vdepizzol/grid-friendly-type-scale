import React from 'react';
import EditorTextSample from './EditorTextSample';
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
    let listItems = this.props.typeScale.map((typeScaleItem) => {
      let step = this.props.gridSize;

      if (!this.props.snapToggle) {
        step = null;
      }

      return (
        <div class="type-scale-item">
          <div class="type-scale-item-toolbar">
            <VInputField
              key={typeScaleItem.id + '_title'}
              name={'typeScale[' + typeScaleItem.id + '][title]'}
              type="text"
              value={typeScaleItem.title}
              onChange={(e) => {
                this.handleInputChange(typeScaleItem.id, 'title', e.target.value);
              }} />
              
            <VInputField
              key={typeScaleItem.id + '_size'}
              name={'typeScale[' + typeScaleItem.id + '][size]'}
              onChange={(e) => {
                this.handleInputChange(typeScaleItem.id, 'size', e.target.value);
              }}
              value={typeScaleItem.size}
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

            <VInputField
              key={typeScaleItem.id + '_weight'}
              name={'typeScale[' + typeScaleItem.id + '][weight]'}
              type="number"
              onChange={(e) => {
                this.handleInputChange(typeScaleItem.id, 'weight', e.target.value);
              }}
              placeholder="inherit"
              value={typeScaleItem.weight}
              step="100"
              min="100"
              max="900" />
          </div>

          <EditorTextSample
            config={this.props.config}
            text={typeScaleItem.title}
            fontSize={typeScaleItem.size}
            lineHeight={typeScaleItem.adjustedLineHeight}
            fontWeight={typeScaleItem.weight}
            rulerSmall={4}
            rulerLarge={20} />
        </div>
      );
    });

    return (
      <div>
        {listItems}
      </div>
    );
  };

}

export default TypeScaleEditor;