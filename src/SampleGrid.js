import React from 'react';

class SampleGrid extends React.Component {
  render() {
    const gridSize = this.props.gridSize;

    const style = {
      backgroundSize: gridSize + "px " + gridSize + "px",
      backgroundImage: "linear-gradient(to bottom, grey 1px, transparent 1px)",
      height: 200
    };

    return (
      <div
        className="sample-grid"
        style={style}
      >
        {this.props.gridSize}
      </div>
    );
  }
}

export default SampleGrid;