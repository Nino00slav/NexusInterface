import Color from 'color';

export function negate(color) {
  return Color(color)
    .negate()
    .string();
}

export function lighten(color, value) {
  return Color(color)
    .lighten(value)
    .string();
}

export function darken(color, value) {
  return Color(color)
    .darken(value)
    .string();
}

export function saturate(color, value) {
  return Color(color)
    .saturate(value)
    .string();
}

export function desaturate(color, value) {
  return Color(color)
    .desaturate(value)
    .string();
}

export function grayscale(color) {
  return Color(color)
    .grayscale()
    .string();
}

export function whiten(color, value) {
  return Color(color)
    .whiten(value)
    .string();
}

export function blacken(color, value) {
  return Color(color)
    .blacken(value)
    .string();
}

export function fade(color, value) {
  return Color(color)
    .fade(value)
    .string();
}

export function opaquer(color, value) {
  return Color(color)
    .opaquer(value)
    .string();
}

export function rotate(color, value) {
  return Color(color)
    .rotate(value)
    .string();
}

export function mix(color1, color2, value) {
  return Color(color1)
    .mix(Color(color2), value)
    .string();
}

export function isLight(color) {
  return Color(color).isLight();
}

export function isDark(color) {
  return Color(color).isDark();
}

export function toHex(color) {
  return Color(color).hex();
}
