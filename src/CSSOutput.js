import React from 'react';

class CSSOutput extends React.Component {

  constructor(props) {
    super(props);

    this.convertBaseFontToPercentage = this.convertBaseFontToPercentage.bind(this);
    this.convertToFriendlyClassName = this.convertToFriendlyClassName.bind(this);
    this.convertFontSizeToRem = this.convertFontSizeToRem.bind(this);
    this.convertLineHeightToUnitless = this.convertLineHeightToUnitless.bind(this);
    this.convertPixelsToRem = this.convertPixelsToRem.bind(this);
  }

  convertBaseFontToPercentage(baseFont) {
    return (baseFont * 100) / 16;
  }

  convertToFriendlyClassName(className) {
    return className ? className.replace(/\s+/g, '-').toLowerCase() : 'a';
    //return className;
  }

  convertFontSizeToRem(fontSize, baseFont) {
    return fontSize / baseFont;
  }

  convertLineHeightToUnitless(lineHeight, fontSize) {
    return 'calc(' + lineHeight + ' / ' + fontSize + ')';
  }

  convertPixelsToRem(size, baseFont) {
    return size / baseFont;
  }

  render() {

    let variables = [];
    let classes = [];
    let variablePrefix = this.convertToFriendlyClassName(this.props.variablePrefix);

    let loop = this.props.typeScale.map((item) => {
      console.log('a');
      const name = this.convertToFriendlyClassName(item.title);
      const fontSize = this.convertFontSizeToRem(item.size, this.props.baseFont);
      const fontWeight = item.weight;
      const lineHeight = this.convertLineHeightToUnitless(item.adjustedLineHeight, item.size);
      const lineBox = this.convertPixelsToRem(item.adjustedLineHeight, this.props.baseFont);

      // process information before applying syntax highlighting classes

      variables.push(`  --${variablePrefix}-${name}-font-size: ${fontSize}rem; /* ${item.size}px */
  --${variablePrefix}-${name}-font-weight: ${fontWeight};
  --${variablePrefix}-${name}-line-height: ${lineHeight};
  --${variablePrefix}-${name}-line-box: ${lineBox}rem; /* ${item.adjustedLineHeight}px */`);

      classes.push(`.${this.convertToFriendlyClassName(item.title)} {
  font-size: ${this.convertFontSizeToRem(item.size, this.props.baseFont)}rem; /* ${item.size}px */
  line-height: ${this.convertLineHeightToUnitless(item.adjustedLineHeight, item.size)};
}`);
    });

    const root = `:root {
  font-size: ${this.convertBaseFontToPercentage(this.props.baseFont)}%;
  
${variables.join("\n\n")}
}

${classes.join("\n\n")}`;

    return root;
  }
}

export default CSSOutput;