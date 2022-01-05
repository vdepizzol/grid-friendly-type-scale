import React from 'react';
import VInputField from './VInputField';
import VLabel from './VLabel';
import './EditToolbar.css';

class EditToolbar extends React.Component {

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
        <div id="edit-toolbar">
          <div class="edit-toolbar-base">
            <VLabel id="base-font" title="Base size">
              <VInputField
                  id="base-font"
                  onChange={this.handleBaseFontChange}
                  value={this.props.config.baseFont}
                  suffix="px" />
            </VLabel>

            <VLabel
              title="Snap to"
              type="toggle"
              onChange={this.handleSnapToggleChange}
              checked={this.props.config.snapToggle}>
              <VInputField
                id="base-grid"
                isDisabled={!this.props.config.snapToggle}
                onChange={this.handleGridSizeChange}
                value={this.props.config.gridSize}
                suffix="px" />
            </VLabel>

            <VLabel
              id="line-height"
              title="Default line height">
              <VInputField id="line-height"
                  step="0.1"
                  onChange={this.handleDefaultLineHeightChange}
                  value={this.props.config.defaultLineHeight} />
            </VLabel>
          </div>

          <div class="edit-toolbar-output">
            <VLabel
              id="font-family"
              title="Font family">
              <VInputField
                  type="text"
                  id="font-family"
                  onChange={this.handleFontFamilyChange}
                  list="fontFamilySuggestions"
                  value={this.props.config.fontFamily} />
            </VLabel>

            <datalist id="fontFamilySuggestions">
              <option value="-apple-system,BlinkMacSystemFont,Segoe UI Variable Text,Segoe UI,Meiryo,system-ui,ui-sans-serif,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji" />
              <option value="Selawik" />
              <option value="sans-serif" />
            </datalist>
          </div>
        </div>
      );
  }
}
export default EditToolbar;