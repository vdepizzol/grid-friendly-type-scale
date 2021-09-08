import React from 'react';

class Welcome extends React.Component {
  render() {
      return (
        <div>
          <h1>Hello, {this.props.name}</h1>
          <p>CSS uses line boxes with half leadings to render text. It's a native feature of the Web, an ingenious solution to support such a flexible interactive medium.</p>

          <p>CSS recommends line-height to be defined using unitless numbers, as a way to preserve the font-size/line-height ratio in descendent elements.</p>

          <p>Snapping line boxes in a grid, even if a finer one, allows typography elements to be used in UI components more deliberatedly, while still maintaining a good level of flexibility.</p>

          <p>This playground lets you think of your type ramp in terms of pixels (like modern design tools do), and lets you test and validate how to keep the line boxes snapped to the grid. It then generates a scale usingrem for font-size (relative to a base font size, generally 16px), and unitless for line-height.</p>

          <p>Using this playground's output alongside a grid system that is also set in rem, one can create flexible components that make a universally scalable UI, rendered entirely on rem and calc(), while still being able to think of your designs in terms of pixels.</p>
        </div>);
  }
}
export default Welcome;