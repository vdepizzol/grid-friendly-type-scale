import React from 'react';

class CSSOutput extends React.Component {

  constructor(props) {
    super(props);

    this.convertBaseFontToPercentage = this.convertBaseFontToPercentage.bind(this);
    this.convertToFriendlyClassName = this.convertToFriendlyClassName.bind(this);
    this.convertFontSizeToRem = this.convertFontSizeToRem.bind(this);
    this.convertLineHeightToUnitless = this.convertLineHeightToUnitless.bind(this);
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

  render() {

    const root = ':root {' + "\n  " + 'font-size: ' + this.convertBaseFontToPercentage(this.props.baseFont) + "%;\n}" + "\n";

    const listItems = this.props.typeScale.map((typeScaleItem) => {
      let output = '.' + this.convertToFriendlyClassName(typeScaleItem.title) + " { \n";
      output += "  font-size: " + this.convertFontSizeToRem(typeScaleItem.size, this.props.baseFont) + "rem; /* " + typeScaleItem.size + "px */ \n";
      output += "  line-height: " + this.convertLineHeightToUnitless(typeScaleItem.adjustedLineHeight, typeScaleItem.size) + "; \n";
      output += "}\n \n";
      return output;
    });


    return root + listItems;
  }
}

export default CSSOutput;