import Component from '../react/component'
import { setAttribute } from './dom'

// 只需要把vnode转成dom就行
function _render (vnode) {
  console.log('vnode2', vnode)
  /**
   * @todo 这里这个布尔值没弄明白
   */
  if (vnode === undefined || vnode === null) {
    vnode = ''
  }

  if (typeof vnode === 'number' || typeof vnode === 'boolean') {
    vnode = String(vnode)
  }

  if (typeof vnode === 'string') {
    return document.createTextNode(vnode)
  }

  if (typeof vnode.type === 'function') {
    const component = createComponent(vnode.type, vnode.props)
    // setComponentProps(component, vnode.props)
    return renderComponent(component).base
  }
  console.log(vnode)
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
  return dom
}

function createComponent (component, props) {
  let instance = null
  // 如果是类,直接返回实例
  if (component.prototype && component.prototype.render) {
    instance = new component(props)
    console.log('instance', instance)
    // 如果是函数，扩展为类组件
  } else {
    instance = new Component(props)
    instance.constructor = component
    instance.render = function () {
      return this.constructor(props)
    }
    console.log('instance', instance)
  }
  return instance
}
function setComponentProps (component, props) {
  // component.props = props
  renderComponent(component)
}
export function renderComponent (component) {
  let base = null
  const renderer = component.render()
  if (component.base && component.componentWillUpdate) {
    component.componentWillUpdate()
  }
  base = _render(renderer)
  if (component.base && component.base.parentNode) {
    component.base.parentNode.replaceChild(base, component.base)
  }
  if (component.base) {
    if (component.componentDidUpdate) component.componentDidUpdate()
  } else if (component.componentDidMount) {
    component.componentDidMount()
  }
  component.base = base
  base._component = component
  return component
}

export function render (vnode, parentDom) {
  console.log('vnode', vnode)
  console.log('parentDom', parentDom)
  return parentDom.appendChild(_render(vnode))
}
