import React from 'react';

class SampleGrid extends React.Component {
  render() {
    const gridSize = this.props.gridSize;

    const style = {
      backgroundSize: gridSize + "px " + gridSize + "px",
      backgroundImage: "linear-gradient(to bottom, #ccc 1px, transparent 1px)",
      overflow: 'auto',
      padding: (gridSize * 4) + 'px'
    };

    const lipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis, erat in convallis sollicitudin, tellus felis euismod urna, in vestibulum lacus nulla consequat mi. In ut viverra dolor, eu varius nisi. Morbi fermentum iaculis sagittis. Sed ut mi neque. Phasellus ornare arcu faucibus tincidunt lacinia. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum molestie vestibulum elit, in porta ex mattis vel.';

    const listItems = this.props.typeScale.map((typeScaleItem) => {
      const style = {
        fontSize: typeScaleItem.size + 'px',
        lineHeight: typeScaleItem.adjustedLineHeight + 'px',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        marginBottom: 'calc(' + (this.props.gridSize * 2) + 'px - 1px)',

        backgroundSize: typeScaleItem.adjustedLineHeight + "px " + typeScaleItem.adjustedLineHeight + "px",
        backgroundImage: "linear-gradient(to bottom, red 1px, transparent 1px)",
        borderBottom: '1px solid red'
      };
      return (
        <div key={typeScaleItem.id} style={style}>
          {typeScaleItem.title} {lipsum}
        </div>
      );
    });

    return (
      <div
        className="sample-grid"
        style={style}
      >
        {listItems}
      </div>
    );
  }
}

export default SampleGrid;