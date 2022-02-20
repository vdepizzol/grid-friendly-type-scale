import React from 'react';
import CSSOuputItem from './CSSOutputItem.js';

class CSSOutput extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    const loop = this.props.typeScale.map((item) => { 
      return (
        <>
          <CSSOuputItem 
            typeScaleItem={item}
            baseFont={this.props.baseFont} />
        </>
      );
    });

    return loop;
  }
}

export default CSSOutput;