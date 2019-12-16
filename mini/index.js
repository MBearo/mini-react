function render (component, parent) {

}
function h (nodeName, attributes, ...args) {
  const len = args.length
  let arr = []
  const children = []
  if (len) {
    for (let i = 0; i < len; i++) {
      const p = args[i]
      arr = Array.isArray(p) ? p : [p]
      for (let j = 0; j < arr.length; j++) {
        children.push(arr[j])
      }
    }
  }
  return new VNnode(nodeName, attributes, children)
}

class VNnode {
  constructor (nodeName, attributes, children) {
    this.nodeName = nodeName
    this.attributes = attributes
    this.children = children
  }
}
VNnode.prototype.__isVNode = true

function build (dom, vnode, rootComponent) {

}
export { render, h }
