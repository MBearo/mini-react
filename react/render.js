class Component {
  constructor (props = {}) {
    this.props = props
    this.state = {}
  }

  setState (stateChange) {
    // 将修改合并到state
    Object.assign(this.state, stateChange)
    renderComponent(this)
  }
}

export function render (vnode, parentDom) {
  console.log('vnode', vnode)
  /**
   * @todo 这里这个布尔值没弄明白
   */
  if (vnode === undefined || vnode === null || typeof vnode === 'boolean') {
    vnode = ''
  }

  if (typeof vnode === 'number') {
    vnode = String(vnode)
  }

  if (typeof vnode === 'string') {
    const textNode = document.createTextNode(vnode)
    return parentDom.appendChild(textNode)
  }

  if (typeof vnode.type === 'function') {
    return createComponent(vnode.type, vnode.props)
  }

  const dom = document.createElement(vnode.type)

  // 如果有属性设置属性
  if (vnode.props) {
    Object.keys(vnode.props).forEach(key => {
      const value = vnode.props[key]
      setAttribute(dom, key, value) // 设置属性
    })
  }

  // 如果有子节点
  if (vnode.children) {
    vnode.children.forEach(child => {
      // 这里写的感觉有点隐藏bug
      if (Array.isArray(child)) {
        child.forEach(item => render(item, dom))
      } else {
        render(child, dom)
      }
    }) // 递归渲染子节点
  }

  return parentDom.appendChild(dom)
}

function createComponent (component, props) {
  let instance = null
  // 如果是类,直接返回实例
  if (component.prototype && component.prototype.render) {
    instance = new component()
    // 如果是函数，扩展为类组件
  } else {
    instance = new Component(props)
    instance.constructor = component
    instance.render = function () {
      return this.constructor(props)
    }
  }
  return instance
}
function renderComponent () {

}
function setAttribute (dom, key, value) {
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
