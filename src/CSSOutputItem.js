import React from 'react';
import * as helpers from './helpers';

class CSSOutputItem extends React.Component {
  /**
   * 
   * @param props { size, variablePrefix, name, fontSize, fontWeight, lineHeight, lineBoxHeight, adjustedLineHeight }
   * @returns 
   */
  generateCssPropertiesCode(props) {
    const itemCssCode = 
      `  --${props.variablePrefix}-${props.name}-font-size: ${props.fontSize}rem; /* ${props.size}px */\n`
    + `  --${props.variablePrefix}-${props.name}-font-weight: ${props.fontWeight};\n` 
    + `  --${props.variablePrefix}-${props.name}-line-height: ${props.lineHeight};\n` 
    + `  --${props.variablePrefix}-${props.name}-line-box-height: ${props.lineBoxHeight}rem; /* ${props.adjustedLineHeight}px */\n`;

    return itemCssCode;
  }

  render() {
    const item = this.props.typeScaleItem;

    const itemProps = {
      variablePrefix: helpers.convertToFriendlyClassName(this.props.variablePrefix),
      name: helpers.convertToFriendlyClassName(item.title),
      size: item.size,
      fontSize: helpers.convertFontSizeToRem(item.size, this.props.baseFont), 
      fontWeight: item.weight, 
      lineHeight: helpers.convertLineHeightToUnitless(item.adjustedLineHeight, item.size), 
      lineBoxHeight: helpers.convertPixelsToRem(item.adjustedLineHeight, this.props.baseFont), 
      adjustedLineHeight: item.adjustedLineHeight
    };

    const itemVariable = this.generateCssPropertiesCode(itemProps);

    return (
      <>
        <div 
          key={`output-${item.id}`}
          className={`${item.isActive ? "code-highlight" : ""}`}
        >{itemVariable}</div>
        {"\n"}
      </>
    );
  }
}

export default CSSOutputItem;