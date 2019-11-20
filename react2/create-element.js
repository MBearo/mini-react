export function createElement (type, props, ...children) {
  console.log('createElement', type, props, children)
  return {
    type,
    props,
    children
  }
}
