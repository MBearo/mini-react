const memoize = (fn, mem = {}) => k => mem.hasOwnProperty(k) ? mem[k] : (mem[k] = fn(k))

function render (component, parent) {
  console.log('component', component)
  const built = build(null, component)
  parent.appendChild(built)
  return built
}

class Component {

}

function h (nodeName, attributes, ...args) {
  const len = args.length
  let arr = []
  const children = []
  if (len) {
    for (let i = 0; i < len; i++) {
      const p = args[i]
      arr = Array.isArray(p) ? p : [p]
      console.log('arr', arr)
      for (let j = 0; j < arr.length; j++) {
        let child = arr[j]
        const simple = notEmpty(child) && !isVNode(child)
        // 把非空处理为字符串
        if (simple) {
          child = String(child)
        }
        /**
         * @todo 字符串连起来
         */
        children.push(child)
      }
    }
  }
  console.log('children', children)
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
  console.log(vnode)
  let out = dom
  let nodeName = vnode.nodeName
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode)
  }
  if (nodeName === null || nodeName === undefined) {
    nodeName = 'x-undefined-element'
  }
  console.log('nodeName', nodeName)
  out = recycler.create(nodeName)

  const newChildren = []
  if (vnode.children) {
    for (let i = 0, vlen = vnode.children.length; i < vlen; i++) {
      const vchild = vnode.children[i]
      newChildren.push(build(null, vchild))
    }
  }
  for (let i = 0; i < newChildren.length; i++) {
    const child = newChildren[i]
    out.appendChild(child)
  }
  return out
}

const recycler = {
  nodes: {},
  create (nodeName) {
    const name = recycler.normalizeName(nodeName)
    const list = recycler.nodes[name]
    console.log(nodeName)
    // const last = list.pop()
    return document.createElement(nodeName)
  },
  normalizeName: memoize(name => name.toUpperCase())
}
function notEmpty (x) {
  return x !== null && x !== undefined
}
function isVNode (obj) {
  return obj && obj.__isVNode === true
}
export { render, h }
