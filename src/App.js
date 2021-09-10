//import logo from './logo.svg';
import React from 'react';
import Welcome from './Welcome';
import VInputField from './VInputField';
import VLabel from './VLabel';
import SampleGrid from './SampleGrid';
import TypeScaleEditor from './TypeScaleEditor';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      baseFont: 16,
      snapToggle: true,
      gridSize: 4,
      defaultLineHeight: 1.5,
      fontFamily: "sans-serif",
      typeScale: [
        {id: 0, size: 12, title: "Caption"},
        {id: 1, size: 14, title: "Body 1"},
        {id: 2, size: 16, title: "Body 2"},
        {id: 3, size: 18, title: "Subtitle"},
        {id: 4, size: 20, title: "Title"}
      ]
    };

    this.bindHandlersToContext();

    //this.computeDefaultLineHeight = this.computeDefaultLineHeight.bind(this);
    //this.setLineHeights = this.setLineHeights.bind(this);

    this.setLineHeights(this.state.typeScale, this.state);
  }

  bindHandlersToContext() {
    this.handleBaseFontChange = this.handleBaseFontChange.bind(this);
    this.handleSnapToggleChange = this.handleSnapToggleChange.bind(this);
    this.handleGridSizeChange = this.handleGridSizeChange.bind(this);
    this.handleDefaultLineHeightChange = this.handleDefaultLineHeightChange.bind(this);
    this.handleFontFamilyChange = this.handleFontFamilyChange.bind(this);
    this.handleTypeScaleEditorChange = this.handleTypeScaleEditorChange.bind(this);
  }

  //#region [ handlers ]
  handleBaseFontChange(e) {
    this.setState({
      baseFont: e.target.value.trim() || 0
    });
  }

  handleSnapToggleChange(e) {
    let isSnapActive =  e.target.checked;

    let typeScale = this.state.typeScale.concat();
    this.setLineHeights(typeScale, {
      defaultLineHeight: this.state.defaultLineHeight, 
      gridSize: this.state.gridSize, 
      snapToggle: isSnapActive
    });

    this.setState({
      snapToggle: isSnapActive,
      typeScale: typeScale,
    });
  }

  handleGridSizeChange(e) {
    const value = e.target.value;

    let typeScale = this.state.typeScale.concat();
    this.setLineHeights(typeScale, {
      defaultLineHeight: this.state.defaultLineHeight, 
      gridSize: value, 
      snapToggle: this.state.snapToggle
    });

    this.setState({
      gridSize: value,
      typeScale: typeScale,
    });
  }

  handleDefaultLineHeightChange(e) {
    const value = e.target.value;

    let typeScale = this.state.typeScale.concat();
    this.setLineHeights(typeScale, {
      defaultLineHeight: value, 
      gridSize: this.state.gridSize, 
      snapToggle: this.state.snapToggle
    });

    this.setState({
      defaultLineHeight: value,
      typeScale: typeScale,
    });
  }

  handleFontFamilyChange(e) {
    const value = e.target.value;
    this.setState({
      fontFamily: value
    });
  }

  handleTypeScaleEditorChange(id, key, value) {
    let typeScales = this.state.typeScale.concat();

    let typeScale = typeScales.find(item => item.id === id);
    typeScale[key] = value;

    if (key === 'size') {
      this.setLineHeights(typeScales, {
        defaultLineHeight: this.state.defaultLineHeight, 
        gridSize: this.state.gridSize, 
        snapToggle: this.state.snapToggle
      });
    }

    this.setState({typeScale: typeScales});   
  }
  //#endregion

  //#region [ helper methods ]
  roundToGrid(number, gridSize) {
    return Math.round(number / gridSize) * gridSize;
  }

  computeDefaultLineHeight(fontSize, lineHeight) {
    return fontSize * lineHeight;
  }

  //typescales, scale properties {newLineHeight, newGridSize, isSnapActive}
  setLineHeights(typeScales, scaleProps) {
    const {defaultLineHeight, gridSize, snapToggle: isSnapActive} = scaleProps;
    
    typeScales.forEach(item => {
      const computedLineHeight = this.computeDefaultLineHeight(item.size, defaultLineHeight);
      item.computedLineHeight = computedLineHeight;

      item.adjustedLineHeight = (isSnapActive)
        ? this.roundToGrid(computedLineHeight, gridSize)
        : item.computedLineHeight;
    });
  }
  //#endregion

  render() {

    return (
      <div className="App">
        <section className="App-panel">
          <h2>Grid-friendly relative line heights for the web</h2>
          <p>Test and validate your type scale while thinking in CSS pixels (like modern design tools do), snap line heights to a grid (for scalability when working with components), and generate a relative output using <code>rem</code> for font sizes and unitless line heights. <a href="#">Learn more</a>.</p>

          <div className="VRow">
            <VLabel id="base-font" title="Base size">
              <VInputField
                  id="base-font"
                  onChange={this.handleBaseFontChange}
                  value={this.state.baseFont}
                  suffix="px" />
            </VLabel>

            <VLabel
              title="Snap to"
              type="toggle"
              onChange={this.handleSnapToggleChange}
              checked={this.state.snapToggle}>
              <VInputField
                id="base-grid"
                isDisabled={!this.state.snapToggle}
                onChange={this.handleGridSizeChange}
                value={this.state.gridSize}
                suffix="px" />
            </VLabel>

            <VLabel
              id="line-height"
              title="Default line height">
              <VInputField id="line-height"
                  step="0.1"
                  onChange={this.handleDefaultLineHeightChange}
                  value={this.state.defaultLineHeight} />
            </VLabel>
          </div>

          <VLabel
            id="font-family"
            title="Font family"
            fullWidth={true}>
            <VInputField
                type="text"
                id="font-family"
                onChange={this.handleFontFamilyChange}
                list="fontFamilySuggestions"
                value={this.state.fontFamily} />
          </VLabel>

          <datalist id="fontFamilySuggestions">
            <option value="-apple-system,BlinkMacSystemFont,Segoe UI Variable Text,Segoe UI,Meiryo,system-ui,ui-sans-serif,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji" />
            <option value="Selawik" />
            <option value="sans-serif" />
          </datalist>

          <h2 style={{
            marginTop: 16
          }}>Type scale</h2>

          <TypeScaleEditor
            typeScale={this.state.typeScale}
            onChange={this.handleTypeScaleEditorChange}
            snapToggle={this.state.snapToggle}
            gridSize={this.state.gridSize} />

        </section>
        
        <section className="App-output">
          <SampleGrid
            gridSize={this.state.gridSize}
            typeScale={this.state.typeScale}
            fontFamily={this.state.fontFamily} />
        </section>

        <section className="App-about">
          <Welcome name="V" />
        </section>
      </div>
    );
  }
}

export default App;
