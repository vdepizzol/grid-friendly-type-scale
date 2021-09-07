//import logo from './logo.svg';
import React from 'react';
import Welcome from './Welcome';
import Input from './Input';
import SampleGrid from './SampleGrid';
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
      typeRamp: []
    }

    this.handleBaseFontChange = this.handleBaseFontChange.bind(this);
    this.handleSnapToggleChange = this.handleSnapToggleChange.bind(this);
    this.handleGridSizeChange = this.handleGridSizeChange.bind(this);
    this.handleDefaultLineHeightChange = this.handleDefaultLineHeightChange.bind(this);
    this.handleFontFamilyChange = this.handleFontFamilyChange.bind(this);

    //this.handleBaseFont = this.handleBaseFont.bind(this)
  }

  handleBaseFontChange(value) {
    this.setState({
      baseFont: value
    });
  }

  handleSnapToggleChange(value) {
    this.setState({
      snapToggle: !this.state.snapToggle
    });
  }

  handleGridSizeChange(value) {
    this.setState({
      gridSize: value
    });
  }

  handleDefaultLineHeightChange(value) {
    this.setState({
      defaultLineHeight: value
    });
  }

  handleFontFamilyChange(value) {
    this.setState({
      fontFamily: value
    });
  }

  render() {
    return (
      <div className="App">
        <section className="App-panel">
          <div>
            <label htmlFor="base-font">Base size:</label>
            <Input
              id="base-font"
              onChange={this.handleBaseFontChange}
              value={this.state.baseFont}
              suffix="px" />
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                onChange={this.handleSnapToggleChange}
                checked={this.state.snapToggle} />
              Snap to:
            </label>
            <Input
              id="base-grid"
              disabled={!this.state.snapToggle}
              onChange={this.handleGridSizeChange}
              value={this.state.gridSize}
              suffix="rem" />
          </div>

          <div>
            <label htmlFor="line-height">Default line height:</label>
            <Input id="line-height"
              onChange={this.handleDefaultLineHeightChange}
              value={this.state.defaultLineHeight} />
          </div>

          <div>
            <label htmlFor="font-family">Font family:</label>
            <Input
              type="text"
              id="font-family"
              onChange={this.handleFontFamilyChange}
              value={this.state.fontFamily} />
          </div>
        </section>
        <section className="App-output">
          <SampleGrid gridSize={this.state.gridSize} />
        </section>

        <section className="App-about">
          <Welcome name="V" />
        </section>
      </div>
    );
  }
}

export default App;
