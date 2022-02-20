import React from 'react';
import * as helpers from './helpers';
import './EditorTextSample.css';


let lastFocusTime;

class EditorTextSample extends React.Component {

  constructor(props) {
    super(props);
    this.textareaRef = React.createRef();
    this.hoverLineRef = React.createRef();
    this.containerRef = React.createRef();

    this.textSampleOrder = 8;

    this.state = {
      value: this.generateTextSample(),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
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

  handleMouseOver(event) {
    this.hoverLineRef.current.style.display = 'block';
  }

  handleMouseMove(event) {
    const bounds = event.target.getBoundingClientRect();
    const y = event.clientY - bounds.top;
    const lineBox = this.props.lineHeight;
    const lineTop = helpers.floorToGrid(y, lineBox);
    this.hoverLineRef.current.style.top = `${lineTop}px`;
  }

  handleMouseOut(event) {
    this.hoverLineRef.current.style.top = '0';
    this.hoverLineRef.current.style.display = 'none';
  }

  componentDidUpdate() {
    // window.setTimeout(() => {
    //   if (this.containerRef.current.contains(document.activeElement)) return;

    //   this.textareaRef.current.focus()
    // }, 100);
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
      <div
        ref={this.containerRef}
        className="editor-text-sample"
        style={{
          '--sample-font-size': this.fontSize,
          '--sample-line-height': this.lineHeight,
          '--sample-font-weight': this.fontWeight,
          '--sample-ruler-small': this.rulerSmall,
          '--sample-ruler-large': this.rulerLarge
        }}
      >
        <span ref={this.hoverLineRef} className="editor-hover-line"></span>
        <div className="editor-ruler"
          data-replicated-value={this.state.value}
          onMouseOver={this.handleMouseOver}
          onMouseMove={this.handleMouseMove}
          onMouseOut={this.handleMouseOut}
        >
          <textarea
            autoCorrect="off"
            ref={this.textareaRef}
            onChange={this.handleChange}
            value={this.state.value}
            />
        </div>
      </div>
    );
  }
}

export default EditorTextSample;