export function roundToGrid(number, gridSize) {
  return Math.round(number / gridSize) * gridSize;
}

export function floorToGrid(number, gridSize) {
  return Math.floor(number / gridSize) * gridSize;
}

export function computeDefaultLineHeight(fontSize, lineHeight) {
  return fontSize * lineHeight;
}

export function convertToFriendlyClassName(className) {
  return className ? className.replace(/\s+/g, '-').toLowerCase() : 'a';
}

//#region [ css units conversions ]
export function convertBaseFontToPercentage(baseFont) {
  return (baseFont * 100) / 16;
}

export function convertFontSizeToRem(fontSize, baseFont) {
  return fontSize / baseFont;
}

export function convertLineHeightToUnitless(lineHeight, fontSize) {
  return 'calc(' + lineHeight + ' / ' + fontSize + ')';
}

export function convertPixelsToRem(size, baseFont) {
  return size / baseFont;
}
//#endregion