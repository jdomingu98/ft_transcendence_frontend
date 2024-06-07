export function toKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export function toCSSStyleSheet(css) {
  const stylesheet = new CSSStyleSheet()
  stylesheet.replaceSync(css)
  return stylesheet
}

export function toArray(obj) {
  if (!obj)
    return []
  return Array.isArray(obj) ? obj : [obj]
}
