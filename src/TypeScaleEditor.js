import React from 'react';
import EditorTextSample from './EditorTextSample';
import Textbox from './common/Textbox';
import {ReactComponent as LineHeightIcon} from './icons/line-height.svg';
import './TypeScaleEditor.css';

class TypeScaleEditor extends React.Component {
  static #defaultClassNames = 'TypeScaleEditor';


  constructor(props) {
    super(props);

    this.bindHandlersToContext();
  }

  bindHandlersToContext() {
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleInputChange(id, name, value) {
    if (name != 'title') value = +value;
    this.props.onChange(id, name, value);
  }

  handleFocus(event, id) {
    console.log('focus', event);
    this.highlightOutput(id);
  }

  handleBlur(event, id) {
    console.log('blur', event);
  }

  highlightOutput(id) {
    console.log('id', id);
  }

  removeOutputHighlight() {
    // TODO
  }

  render() {
    let listItems = this.props.typeScale.map((typeScaleItem) => {
      let step = this.props.gridSize;

      if (!this.props.snapToggle) {
        step = null;
      }

      return (
        <div
          className="type-scale-item"
          onFocus={(e) => {
            console.log('wait wat');
            this.handleFocus(e, typeScaleItem.id);
          }}
          onBlur={(e) => {
            console.log('blur');
            this.handleBlur(e, typeScaleItem.id);
          }}>
          <div class="type-scale-item-toolbar">
            <Textbox
              key={typeScaleItem.id + '_title'}
              type="text"
              value={typeScaleItem.title}
              className={['monospace']}
              width="md"
              onChange={(e) => {
                this.handleInputChange(typeScaleItem.id, 'title', e.target.value);
              }} />

            <Textbox
              key={typeScaleItem.id + '_size'}
              width="sm"
              onChange={(e) => {
                this.handleInputChange(typeScaleItem.id, 'size', e.target.value);
              }}
              value={typeScaleItem.size}
              suffix="px" />
            
            <Textbox
              key={typeScaleItem.id + '_adjustedLineHeight'}
              type="number"
              step={step}
              width="sm"
              prefixIcon={<LineHeightIcon />}
              onChange={(e) => {
                this.handleInputChange(typeScaleItem.id, 'adjustedLineHeight', e.target.value);
              }}
              value={typeScaleItem.adjustedLineHeight}
              suffix="px" />

            <Textbox
              key={typeScaleItem.id + '_weight'}
              className={['width-sm']}
              type="number"
              onChange={(e) => {
                this.handleInputChange(typeScaleItem.id, 'weight', e.target.value);
              }}
              value={typeScaleItem.weight}
              step="100"
              min="100"
              max="900" />
          </div>

          <EditorTextSample
            uid={typeScaleItem.id}
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
      <div className="type-scale-editor">
        {listItems}
      </div>
    );
  };

}

export default TypeScaleEditor;