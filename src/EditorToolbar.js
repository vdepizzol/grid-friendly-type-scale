import React from 'react';
import Textbox from './common/Textbox';
import TextboxLabel from './common/TextboxLabel';
import {ReactComponent as LineHeightIcon} from './icons/line-height.svg';
import {ReactComponent as GridSnapIcon} from './icons/grid-snap.svg';
import './EditorToolbar.css';

class EditorToolbar extends React.Component {

  constructor(props) {
    super(props);

    this.bindHandlersToContext();
  }

  handleBaseFontChange(e) {
    return this.props.onBaseFontChange(e.target.value);
  }

  handleSnapToggleChange(e) {
    return this.props.onSnapToggleChange(e.target.checked);
  }

  handleGridSizeChange(e) {
    return this.props.onGridSizeChange(e.target.value);
  }

  handleDefaultLineHeightChange(e) {
    return this.props.onDefaultLineHeightChange(e.target.value);
  }

  handleFontFamilyChange(e) {
    return this.props.onFontFamilyChange(e.target.value);
  }

  bindHandlersToContext() {
    this.handleBaseFontChange = this.handleBaseFontChange.bind(this);
    this.handleSnapToggleChange = this.handleSnapToggleChange.bind(this);
    this.handleGridSizeChange = this.handleGridSizeChange.bind(this);
    this.handleDefaultLineHeightChange = this.handleDefaultLineHeightChange.bind(this);
    this.handleFontFamilyChange = this.handleFontFamilyChange.bind(this);
  }

  render() {
      return (
        <div className="editor-toolbar">
          <div className="editor-toolbar-base">

            <TextboxLabel
              id="line-height"
              title="Default line height">
              <Textbox
                id="line-height"
                width="full"
                step="0.1"
                prefixIcon={<LineHeightIcon />}
                onChange={this.handleDefaultLineHeightChange}
                value={this.props.config.defaultLineHeight} />
            </TextboxLabel>

            <TextboxLabel id="base-font" title="Base size">
              <Textbox
                  id="base-font"
                  width="sm"
                  onChange={this.handleBaseFontChange}
                  value={this.props.config.baseFont}
                  suffix="px" />
            </TextboxLabel>

            <TextboxLabel
              title="Snap to"
              type="toggle"
              onChange={this.handleSnapToggleChange}
              checked={this.props.config.snapToggle}>
              <Textbox
                id="base-grid"
                width="sm"
                prefixIcon={<GridSnapIcon />}
                isDisabled={!this.props.config.snapToggle}
                onChange={this.handleGridSizeChange}
                value={this.props.config.gridSize}
                suffix="px" />
            </TextboxLabel>

            <TextboxLabel
              id="font-family"
              title="Font family">
              <Textbox
                  type="text"
                  className={['width-md']}
                  id="font-family"
                  onChange={this.handleFontFamilyChange}
                  list="fontFamilySuggestions"
                  value={this.props.config.fontFamily} />
            </TextboxLabel>

            <datalist id="fontFamilySuggestions">
              <option value="-apple-system,BlinkMacSystemFont,Segoe UI Variable Text,Segoe UI,Meiryo,system-ui,ui-sans-serif,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji" />
              <option value="Selawik" />
              <option value="sans-serif" />
            </datalist>
          </div>

          <div className="editor-toolbar-output">
          <TextboxLabel
              id="variable-prefix"
              title="Variable prefix">
              <Textbox
                  type="text"
                  className={['monospace width-md']}
                  id="variable-prefix"
                  /*onChange={this.handleFontFamilyChange}*/
                  value="text" />
            </TextboxLabel>

          </div>
        </div>
      );
  }
}
export default EditorToolbar;