import React from 'react';
import './EditorTextSample.css';

class EditorTextSample extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showGrid: true
    };

    this.handleShowGridChange = this.handleShowGridChange.bind(this);
  }

  handleShowGridChange() {
    const showGrid = !this.state.showGrid;

    this.setState({
      showGrid: showGrid
    });
  }

  render() {
    this.fontSize = (this.props.fontSize / this.props.config.baseFont) + 'rem';
    this.lineHeight = 'calc(' + this.props.lineHeight + ' / ' + this.props.fontSize + ')';
    this.fontWeight = (this.props.fontWeight) ? this.props.fontWeight : 'normal';

    this.rulerSmall = (this.props.config.snapToggle)
      ? (this.props.config.gridSize / this.props.config.baseFont) + 'rem'
      : 0;
    
    this.rulerLarge = (this.props.lineHeight / this.props.config.baseFont) + 'rem';

    return (
      <div className="editor-text-sample">
        <div class="editor-ruler" style={{
          '--sample-font-size': this.fontSize,
          '--sample-line-height': this.lineHeight,
          '--sample-font-weight': this.fontWeight,
          '--sample-ruler-small': this.rulerSmall,
          '--sample-ruler-large': this.rulerLarge
        }}>
          {this.props.text} While it’s true that the Dutch and Flemish are avid linguists, a little effort on your part to speak the local language will be warmly received as a sign of good-will. Phasellus vulputate lectus erat, id elementum urna commodo eget.
        </div>
      </div>
    );
  }
}

export default EditorTextSample;