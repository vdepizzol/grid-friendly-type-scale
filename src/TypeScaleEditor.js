import React from 'react';
import EditorTextSample from './EditorTextSample';
import Textbox from './common/Textbox';
import IconButton from './common/IconButton';
import './TypeScaleEditor.css';
import {ReactComponent as LineHeightIcon} from './icons/line-height.svg';
import {ReactComponent as TrashIcon} from './icons/trash.svg';

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

    this.handleRemove = this.handleRemove.bind(this);
  }

  handleInputChange(id, name, value) {
    if (name != 'title') value = +value;
    this.props.onChange(id, name, value);
  }

  handleFocus(event, id) {
    console.log('focus', event);
    this.props.onActiveChange(id);
  }

  handleBlur(event, id) {
    console.log('blur', event);
    this.props.onActiveChange();
  }

  handleRemove(id) {
    console.log('handle remove', id);
    this.props.handleRemoveItem(id);
  }

  handleClickToFocus(event, id) {
    console.log('click', event.target.classList.contains('type-scale-item-toolbar'), event);
    if (!event.target.classList.contains('type-scale-item-toolbar')) return;

    this.props.onActiveChange(id);
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
          key={typeScaleItem.id}
          className="type-scale-item"
          onFocus={(e) => {
            console.log('wait wat');
            this.handleFocus(e, typeScaleItem.id);
          }}
          onBlur={(e) => {
            console.log('blur');
            this.handleBlur(e, typeScaleItem.id);
          }}
          onClick={(e) => {
            console.log('click');
            this.handleClickToFocus(e, typeScaleItem.id);
          }}>
            
          <div className="type-scale-item-toolbar">
            <Textbox
              key={typeScaleItem.id + '_title'}
              type="text"
              value={typeScaleItem.title}
              className={['monospace']}
              width="md"
              onChange={(value) => {
                this.handleInputChange(typeScaleItem.id, 'title', value);
              }} />

            <Textbox
              key={typeScaleItem.id + '_size'}
              width="sm"
              min="8"
              max="128"
              onChange={(value) => {
                this.handleInputChange(typeScaleItem.id, 'size', value);
              }}
              value={typeScaleItem.size}
              suffix="px" />
            
            <Textbox
              key={typeScaleItem.id + '_adjustedLineHeight'}
              type="number"
              step={step}
              min={typeScaleItem.size}
              max={typeScaleItem.size * 3}
              width="sm"
              prefixIcon={<LineHeightIcon />}
              onChange={(value) => {
                this.handleInputChange(typeScaleItem.id, 'adjustedLineHeight', value);
              }}
              value={typeScaleItem.adjustedLineHeight}
              suffix="px" />

            <Textbox
              key={typeScaleItem.id + '_weight'}
              className={['width-sm']}
              type="number"
              onChange={(value) => {
                this.handleInputChange(typeScaleItem.id, 'weight', value);
              }}
              value={typeScaleItem.weight}
              step="100"
              min="100"
              max="900" />

            <IconButton
              label="Delete"
              icon={<TrashIcon />}
              onClick={(e) => {
                this.handleRemove(typeScaleItem.id);
              }}
            />
          </div>
          <label className="editor-text-sample-wrapper">
            <EditorTextSample
              config={this.props.config}
              item={typeScaleItem}
              uid={typeScaleItem.id}
              text={typeScaleItem.title}
              fontSize={typeScaleItem.size}
              lineHeight={typeScaleItem.adjustedLineHeight}
              fontWeight={typeScaleItem.weight}
              rulerSmall={4}
              rulerLarge={20} />
          </label>
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