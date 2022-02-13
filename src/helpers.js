export function roundToGrid(number, gridSize) {
  return Math.round(number / gridSize) * gridSize;
}

export function floorToGrid(number, gridSize) {
  return Math.floor(number / gridSize) * gridSize;
}

export function computeDefaultLineHeight(fontSize, lineHeight) {
  return fontSize * lineHeight;
}