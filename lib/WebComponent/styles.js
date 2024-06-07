export let GLOBAL_CSS = []

export let GLOBAL_CSS_FILES = [
  // 'bootstrap-5.3.3-dist/css/bootstrap.min.css',
  // 'styles.css',
]

export function defineGlobalCSS(css) {
  GLOBAL_CSS = css
}

export function defineGlobalCSSFiles(css) {
  GLOBAL_CSS_FILES = css
}