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
        {id: 0, size: 12, title: "Caption", computedLineHeight: null, adjustedLineHeight: null},
        {id: 1, size: 14, title: "Body 1", computedLineHeight: null, adjustedLineHeight: null},
        {id: 2, size: 16, title: "Body 2"},
        {id: 3, size: 18, title: "Subtitle"},
        {id: 4, size: 20, title: "Title"}
      ]
    }

    this.handleBaseFontChange = this.handleBaseFontChange.bind(this);
    this.handleSnapToggleChange = this.handleSnapToggleChange.bind(this);
    this.handleGridSizeChange = this.handleGridSizeChange.bind(this);
    this.handleDefaultLineHeightChange = this.handleDefaultLineHeightChange.bind(this);
    this.handleFontFamilyChange = this.handleFontFamilyChange.bind(this);

    this.handleTypeScaleEditorChange = this.handleTypeScaleEditorChange.bind(this);
    this.computeDefaultLineHeight = this.computeDefaultLineHeight.bind(this);
    this.computeLineHeights = this.computeLineHeights.bind(this);
  }

  componentDidMount() {
    this.computeLineHeights();
  }

  handleBaseFontChange(e) {
    this.setState({
      baseFont: e.target.value
    });
  }

  handleSnapToggleChange(e) {
    const snap = !this.state.snapToggle;

    this.setState({
      snapToggle: snap
    });

    //this.computeLineHeights();
    
    if (snap === true) {
      console.log('snapped');
      this.computeLineHeights();

      // Reset computedLineHeight
      /*
      this.setState(state => {
        const typeScale = state.typeScale.map((item) => {
          console.log('@', item['size'], this.props.defaultLineHeight);
          item['computedLineHeight'] = this.computeDefaultLineHeight(item['size'], this.state.defaultLineHeight);
          return item;
        });
        return { typeScale: typeScale };
      });
      */
    } else {
      console.log('not snapped');
      //this.computeLineHeights(null, 1);

      // Reset adjustedLineHeight to be equal to computedLineHeight
      this.setState(state => {
        const typeScale = state.typeScale.map((item) => {
          item['adjustedLineHeight'] = item['computedLineHeight'];
          console.log(item);
          return item;
        });
        return { typeScale: typeScale };
      });
    }
  }

  handleGridSizeChange(e) {
    console.log('grid size changed');
    const value = e.target.value;
    this.setState({
      gridSize: value
    });
    this.computeLineHeights(null, value);
  }

  handleDefaultLineHeightChange(e) {
    const value = e.target.value;
    this.setState({
      defaultLineHeight: value
    });
    this.computeLineHeights(value);
  }

  handleFontFamilyChange(e) {
    const value = e.target.value;
    this.setState({
      fontFamily: value
    });
  }

  handleTypeScaleEditorChange(id, key, value) {
    const defaultLineHeight = this.state.defaultLineHeight;

    console.log(id, key, value);

    this.setState(state => {
      const typeScale = state.typeScale.map((item, i) => {
        if (id === i) {
          item[key] = value;
          if (key === 'size') {
            const computedLineHeight = item['size'] * defaultLineHeight
            item['computedLineHeight'] = computedLineHeight;
            item['adjustedLineHeight'] = this.roundToGrid(computedLineHeight);
          }
        }
        return item;
      });
      return { typeScale: typeScale };
    });
  }

  roundToGrid(number, newGridSize) {
    const gridSize = newGridSize ?? this.state.gridSize;
    return Math.round(number / gridSize) * gridSize;
  }

  computeDefaultLineHeight(fontSize, lineHeight) {
    return fontSize * lineHeight;
  }

  computeLineHeights(newLineHeight, newGridSize) {
    const defaultLineHeight = newLineHeight ?? this.state.defaultLineHeight;
    const gridSize = newGridSize ?? this.state.gridSize;

    console.log(defaultLineHeight, gridSize);

    this.setState(state => {
      const typeScale = state.typeScale.map((item) => {
        const computedLineHeight = this.computeDefaultLineHeight(item['size'], defaultLineHeight);
        item['computedLineHeight'] = computedLineHeight;
        item['adjustedLineHeight'] = this.roundToGrid(computedLineHeight, gridSize);
        console.log('well', item);
        return item;
      });
      return { typeScale: typeScale };
    });
  }

  /*

    this.state.typeScale.map((typeScaleItem) => {

    });
    /*this.setState({
      typeScale: value
    });
  }
  */

  render() {

    return (
      <div className="App">
        <section className="App-panel">

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
              disabled={!this.state.snapToggle}
              onChange={this.handleGridSizeChange}
              value={this.state.gridSize}
              suffix="px" />
          </VLabel>

          <VLabel id="line-height" title="Default line height">
            <VInputField id="line-height"
                step="0.1"
                onChange={this.handleDefaultLineHeightChange}
                value={this.state.defaultLineHeight} />
          </VLabel>

          <VLabel id="font-family" title="Font family">
            <VInputField
                type="text"
                id="font-family"
                onChange={this.handleFontFamilyChange}
                value={this.state.fontFamily} />
          </VLabel>

          <TypeScaleEditor
            typeScale={this.state.typeScale}
            onChange={this.handleTypeScaleEditorChange}
            snapToggle={this.state.snapToggle}
            gridSize={this.state.gridSize} />

        </section>
        <section className="App-output">
          <SampleGrid
            gridSize={this.state.gridSize}
            typeScale={this.state.typeScale} />
        </section>

        <section className="App-about">
          <Welcome name="V" />
        </section>
      </div>
    );
  }
}

export default App;
