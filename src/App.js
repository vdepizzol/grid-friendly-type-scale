//import logo from './logo.svg';
import React from 'react';
import Header from './common/Header';
import EditorToolbar from './EditorToolbar';
import EditorTextSample from './EditorTextSample';
import SampleGrid from './SampleGrid';
import CSSOutput from './CSSOutput';
import TypeScaleEditor from './TypeScaleEditor';
import AddTypeScaleItem from './AddTypeScaleItem';
import * as helpers from './helpers';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      config: {
        baseFont: 16,
        snapToggle: true,
        gridSize: 4,
        defaultLineHeight: 1.5,
        fontFamily: "sans-serif",
        variablePrefix: "text",
      },
      typeScale: [
        {id: 0, size: 32, title: "hero", weight: 400, isActive: false},
        {id: 1, size: 24, title: "title", weight: 600, isActive: false},
        {id: 2, size: 18, title: "subtitle", weight: 500, isActive: false},
        {id: 3, size: 16, title: "bodyLarge", weight: 400, isActive: false},
        {id: 4, size: 14, title: "body", weight: 400, isActive: false},
        {id: 5, size: 12, title: "caption", weight: 400, isActive: false},

        // weight
        // computedLineHeight
        // adjustedLineHeight
      ],
    };

    this.bindHandlersToContext();

    //this.computeDefaultLineHeight = this.computeDefaultLineHeight.bind(this);
    //this.setLineHeights = this.setLineHeights.bind(this);

    this.setLineHeights(this.state.typeScale, this.state.config);
  }

  bindHandlersToContext() {
    this.handleBaseFontChange = this.handleBaseFontChange.bind(this);
    this.handleSnapToggleChange = this.handleSnapToggleChange.bind(this);
    this.handleGridSizeChange = this.handleGridSizeChange.bind(this);
    this.handleDefaultLineHeightChange = this.handleDefaultLineHeightChange.bind(this);
    this.handleFontFamilyChange = this.handleFontFamilyChange.bind(this);

    this.handleTypeScaleEditorChange = this.handleTypeScaleEditorChange.bind(this);
    this.handleTypeScaleEditorActiveChange = this.handleTypeScaleEditorActiveChange.bind(this);
    //this.handleTypeScaleEditorFocus = this.handleTypeScaleEditorFocus.bind(this);
    //this.handleTypeScaleEditorBlur = this.handleTypeScaleEditorBlur.bind(this);

    this.handleVariablePrefixChange = this.handleVariablePrefixChange.bind(this);

    this.handleAddTypeScaleItem = this.handleAddTypeScaleItem.bind(this);
    this.handleRemoveTypeScaleItem = this.handleRemoveTypeScaleItem.bind(this);
  }

  //#region [ handlers ]
  handleBaseFontChange(value) {
    this.setState({
      config: {
        ...this.state.config,
        baseFont: value.trim() || 0
      }
    });

    const baseFontInPercentage = (value * 100) / 16;
    const bodyFontInRem = ((16 * 100) / value) / 100;
    
    // bring these values to the css output, not to the current `document`.
    //document.documentElement.style.setProperty('--base-font', baseFontInPercentage + '%');
    //document.querySelector('body').style.fontSize = `${bodyFontInRem}rem`;
  }

  handleSnapToggleChange(isSnapActive) {
    let typeScale = this.state.typeScale.concat();

    this.setLineHeights(typeScale, {
      defaultLineHeight: this.state.config.defaultLineHeight, 
      gridSize: this.state.config.gridSize, 
      snapToggle: isSnapActive
    });

    this.setState({
      config: {
        ...this.state.config,
        snapToggle: isSnapActive,
        typeScale: typeScale,
      }
    });
  }

  handleGridSizeChange(value) {
    let typeScale = this.state.typeScale.concat();
    this.setLineHeights(typeScale, {
      defaultLineHeight: this.state.config.defaultLineHeight, 
      gridSize: value, 
      snapToggle: this.state.config.snapToggle
    });

    this.setState({
      config: {
        ...this.state.config,
        gridSize: value,
        typeScale: typeScale,
      }
    });
  }

  handleDefaultLineHeightChange(value) {
    let typeScale = this.state.typeScale.concat();
    this.setLineHeights(typeScale, {
      defaultLineHeight: value, 
      gridSize: this.state.config.gridSize, 
      snapToggle: this.state.config.snapToggle
    });

    this.setState({
      config: {
        ...this.state.config,
        defaultLineHeight: value,
        typeScale: typeScale,
      }
    });
  }

  handleFontFamilyChange(value) {
    this.setState({
      config: {
        ...this.state.config,
        fontFamily: value
      }
    });

    document.documentElement.style.setProperty('--font-family', value);
  }

  handleTypeScaleEditorChange(id, key, value) {
    let typeScales = this.state.typeScale.concat();

    let typeScale = typeScales.find(item => item.id === id);
    typeScale[key] = value;

    if (key === 'size') {
      this.setLineHeights(typeScales, {
        defaultLineHeight: this.state.config.defaultLineHeight, 
        gridSize: this.state.config.gridSize, 
        snapToggle: this.state.config.snapToggle
      });
    }

    this.setState({typeScale: typeScales});   
  }

  handleTypeScaleEditorActiveChange(id) {
    this.updateTypeScaleItemActive(id);
  }

  handleVariablePrefixChange(value) {
    this.setState({
      config: {
        ...this.state.config,
        variablePrefix: value
      }
    });
  }

  handleAddTypeScaleItem() {
    const newId = this.getNextTypeScaleItemId();
    const newTypeScaleItem = {
      id: newId,
      title: '',
      size: 24,
      weight: 400
    };

    this.setState({
      typeScale: [...this.state.typeScale, newTypeScaleItem]
    });
  }

  handleRemoveTypeScaleItem(id) {
    this.setState({
      typeScale: this.state.typeScale.filter((typeScale, typeScaleIndex) => {
        return typeScale.id != id;
      })
    });
  }

  //#endregion

  //#region [ helper methods ]

  //typescales, scale properties {newLineHeight, newGridSize, isSnapActive}
  setLineHeights(typeScale, scaleProps) {
    const {defaultLineHeight, gridSize, snapToggle: isSnapActive} = scaleProps;
    
    typeScale.forEach(item => {
      const computedLineHeight = helpers.computeDefaultLineHeight(item.size, defaultLineHeight);
      item.computedLineHeight = computedLineHeight;

      item.adjustedLineHeight = (isSnapActive)
        ? helpers.roundToGrid(computedLineHeight, gridSize)
        : item.computedLineHeight;
    });
  }

  updateTypeScaleItemActive(id) {
    const typeScale = this.state.typeScale ?? [];

    this.setState({
      typeScale: this.setTypeScaleItemActive(typeScale, id)
    });
  }

  setTypeScaleItemActive(typeScale, id) {
    typeScale.previousActiveItem = typeScale.activeItem;

    typeScale.forEach(item => {
      item.isActive = item.id === id;
      if (item.isActive) {
        typeScale.activeItem = item;
      }
    });

    return typeScale;
  }

  getNextTypeScaleItemId() {
    const currentMaxId = this.state.typeScale.reduce((prev, curr) => (curr > prev) ? curr : prev, 0)
    return currentMaxId + 1;
  }
  //#endregion

  render() {

    return (
      <div className="app">

        <div className="app-header">
          <Header />
          { /* Tabs */ }
        </div>

        <div className="app-toolbar">
          <EditorToolbar
            config={this.state.config}
            onBaseFontChange={this.handleBaseFontChange}
            onSnapToggleChange={this.handleSnapToggleChange}
            onGridSizeChange={this.handleGridSizeChange}
            onDefaultLineHeightChange={this.handleDefaultLineHeightChange}
            onFontFamilyChange={this.handleFontFamilyChange}
            handleVariablePrefixChange={this.handleVariablePrefixChange}
          />
        </div>

        <div class="app-main">
          <div className="app-edit-panel">
            <TypeScaleEditor
              config={this.state.config}
              typeScale={this.state.typeScale}
              onChange={this.handleTypeScaleEditorChange}
              //onFocus={this.handleTypeScaleEditorFocus}
              //onBlur={this.handleTypeScaleEditorFocus}
              onActiveChange={this.handleTypeScaleEditorActiveChange}
              snapToggle={this.state.config.snapToggle}
              gridSize={this.state.config.gridSize}
              handleRemoveItem={this.handleRemoveTypeScaleItem} 
              />

            <AddTypeScaleItem handleAddItem={this.handleAddTypeScaleItem} />
          </div>

          <div className="app-output">
            <div class="Output">
              <CSSOutput
                typeScale={this.state.typeScale}
                baseFont={this.state.config.baseFont}
                variablePrefix={this.state.config.variablePrefix}
                />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
