export default function createElement (type, props, ...children) {
  console.log('createElement', type, props, children)
  props = props || {}
  return {
    type,
    props,
    children,
    key: props.key || null
  }
}
