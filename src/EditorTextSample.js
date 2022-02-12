import React from 'react';
import './EditorTextSample.css';

class EditorTextSample extends React.Component {

  constructor(props) {
    super(props);
    this.textareaRef = React.createRef();
    this.textSampleOrder = 8;

    this.state = {
      value: this.generateTextSample(),
    };

    this.handleChange = this.handleChange.bind(this);
  }

  generateTextSample() {
    // needs to place this somewhere else to be shared.
    const textSamples = [
      'Aesthetic-Usability Effect: Users often perceive aesthetically pleasing design as design that’s more usable.',
      'Doherty Threshold: Productivity soars when a computer and its users interact at a pace (<400ms) that ensures that neither has to wait on the other.',
      'Fitts’s Law: The time to acquire a target is a function of the distance to and size of the target.',
      'Goal-Gradient Effect: The tendency to approach a goal increases with proximity to the goal.',
      'Hick’s Law: The time it takes to make a decision increases with the number and complexity of choices.',
      'Jakob’s Law: Users spend most of their time on other sites. This means that users prefer your site to work the same way as all the other sites they already know.',
      'Law of Common Region: Elements tend to be perceived into groups if they are sharing an area with a clearly defined boundary.',
      'Law of Proximity: Objects that are near, or proximate to each other, tend to be grouped together.',
      'Law of Prägnanz: People will perceive and interpret ambiguous or complex images as the simplest form possible, because it is the interpretation that requires the least cognitive effort of us.',
    ];
    return textSamples[this.textSampleOrder];
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