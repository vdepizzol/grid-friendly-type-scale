import React from 'react';
import './EditorTextSample.css';

class EditorTextSample extends React.Component {

  constructor(props) {
    super(props);
    this.textareaRef = React.createRef();

    this.state = {
      value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor pharetra odio. Sed sollicitudin odio ac justo sagittis, quis dapibus sapien cursus. In leo massa, lacinia sit amet ipsum vitae, imperdiet aliquet lectus. Ut sollicitudin in diam in finibus. Praesent porta commodo eros eu mattis. Proin quis placerat nunc. Duis at condimentum urna, vitae vestibulum turpis. Phasellus vulputate lectus erat, id elementum urna commodo eget.',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.textareaRef.current.parentNode.dataset.replicatedValue = event.target.value;
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
        <div class="editor-ruler"
          data-replicated-value={this.state.value}
          style={{
            '--sample-font-size': this.fontSize,
            '--sample-line-height': this.lineHeight,
            '--sample-font-weight': this.fontWeight,
            '--sample-ruler-small': this.rulerSmall,
            '--sample-ruler-large': this.rulerLarge
          }}
        >
          <textarea
            autoCorrect={false}
            ref={this.textareaRef}
            onChange={this.handleChange}
            value={this.state.value} />
        </div>
      </div>
    );
  }
}

export default EditorTextSample;