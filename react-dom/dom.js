export function setAttribute (dom, key, value) {
  if (key === 'className') {
    key = 'class'
  }
  if (/^on[A-Z]/.test(key)) {
    key = key.toLowerCase()
    dom[key] = value
  } else if (key === 'style') {
    if (typeof value === 'string') {
      dom.style.cssText = value
    } else if (typeof value === 'object') {
      for (const name in value) {
        if (Object.prototype.hasOwnProperty.call(value, name)) {
          dom.style[name] = value[name]
        }
      }
    }
  } else {
    dom.setAttribute(key, value)
  }
}
