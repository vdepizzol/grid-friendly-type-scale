import React from 'react';

class SampleGrid extends React.Component {

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
    const gridSize = this.props.gridSize;
    const fontFamily = this.props.fontFamily;

    const style = {
      backgroundSize: gridSize + "px " + gridSize + "px",
      padding: (gridSize * 4) + 'px'
    };

    const lipsum = 'While it’s true that the Dutch and Flemish are avid linguists, a little effort on your part to speak the local language will be warmly received as a sign of good-will. And remember that a country’s language is also a key to its culture.';

    const listItems = this.props.typeScale.map((typeScaleItem) => {
      // FIXME
      const style = {
        fontSize: typeScaleItem.size + 'px',
        maxWidth: '64ch',
        fontFamily: fontFamily,
        lineHeight: typeScaleItem.adjustedLineHeight + 'px',
        backgroundColor: (this.state.showGrid) ? 'rgba(255, 0, 0, 0.1)' : 'transparent',
        marginBottom: (this.state.showGrid) ? 'calc(' + (this.props.gridSize * 2) + 'px - 1px)' : (this.props.gridSize * 2),

        backgroundSize: typeScaleItem.adjustedLineHeight + "px " + typeScaleItem.adjustedLineHeight + "px",
        backgroundImage: (this.state.showGrid) ? "linear-gradient(to bottom, red 1px, transparent 1px)" : 'none',
        borderBottom: (this.state.showGrid) ? '1px solid red' : 'transparent'
      };
      return (
        <div key={typeScaleItem.id} style={style}>
          {typeScaleItem.title} {lipsum}
        </div>
      );
    });
    
    let className = (this.state.showGrid) ? 'show-grid' : '';

    return (
      <div>
        <input
          type="checkbox"
          onChange={this.handleShowGridChange }
          checked={this.state.showGrid} />
        <div
          className={ "sample-grid " + className }
          style={style}
        >
          {listItems}
        </div>
      </div>
    );
  }
}

export default SampleGrid;