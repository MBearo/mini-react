import Component from '../react/component'
import { setAttribute } from './dom'

/**
 * @param {HTMLElement} dom 真实DOM
 * @param {vnode} vnode 虚拟DOM
 * @param {HTMLElement} container 容器
 * @returns {HTMLElement} 更新后的DOM
 */
export function diff (dom, vnode, container) {
  const ret = diffNode(vnode, dom)
  if (container && ret.parentNode !== container) {
    container.appendChild(ret)
  }
  return ret
}

function diffNode (vnode, dom) {
  let out = dom
  if (vnode === undefined || vnode === null) {
    vnode = ''
  }
  if (typeof vnode === 'number' || typeof vnode === 'boolean') {
    vnode = String(vnode)
  }
  // diff text node
  if (typeof vnode === 'string') {
    // 如果当前的DOM就是文本节点，则直接更新内容
    if (dom && dom.nodeType === 3) { // nodeType: https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType
      if (dom.textContent !== vnode) {
        dom.textContent = vnode
      }
    // 如果DOM不是文本节点，则新建一个文本节点DOM，并移除掉原来的
    } else {
      out = document.createTextNode(vnode)
      if (dom && dom.parentNode) {
        dom.parentNode.replaceChild(out, dom)
      }
    }
    return out
  }
  // diff component
  if (typeof vnode.type === 'function') {
    return diffComponent(vnode, dom)
  }
  // diff not text node
  if (!dom || !isSameNodeType(vnode, dom)) {
    out = document.createElement(vnode.type)

    if (dom) {
      [...dom.childNodes].map(out.appendChild) // 将原来的子节点移到新节点下

      if (dom.parentNode) {
        dom.parentNode.replaceChild(out, dom) // 移除掉原来的DOM对象
      }
    }
  }
  if (
    (vnode.children && vnode.children.length > 0) ||
      (out.childNodes && out.childNodes.length > 0)
  ) {
    let list = []
    vnode.children.forEach(item => {
      if (Array.isArray(item)) {
        list = list.concat(item)
      } else {
        list.push(item)
      }
    })
    diffChildren(list, out)
  }

  diffAttributes(vnode, out)

  return out
}

function isSameNodeType (vnode, dom) {
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return dom.nodeType === 3
  }

  if (typeof vnode.type === 'string') {
    return dom.nodeName.toLowerCase() === vnode.type.toLowerCase()
  }

  return dom && dom._component && dom._component.constructor === vnode.type
}
function diffComponent (vnode, dom) {
  let c = dom && dom._component
  let oldDom = dom

  // 如果组件类型没有变化，则重新set props
  if (c && c.constructor === vnode.type) {
    setComponentProps(c, vnode.props)
    dom = c.base
  // 如果组件类型变化，则移除掉原来组件，并渲染新的组件
  } else {
    if (c) {
      unmountComponent(c)
      oldDom = null
    }

    c = createComponent(vnode.type, vnode.props)

    setComponentProps(c, vnode.props)
    dom = c.base

    if (oldDom && dom !== oldDom) {
      oldDom._component = null
      removeNode(oldDom)
    }
  }

  return dom
}
function setComponentProps (component, props) {
  if (!component.base) {
    if (component.componentWillMount) component.componentWillMount()
  } else if (component.componentWillReceiveProps) {
    component.componentWillReceiveProps(props)
  }

  component.props = props

  renderComponent(component)
}
function unmountComponent (component) {
  if (component.componentWillUnmount) component.componentWillUnmount()
  removeNode(component.base)
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
function diffChildren (vchildren, dom) {
  const domChildren = dom.childNodes
  const children = []

  const keyed = {}

  if (domChildren.length > 0) {
    for (let i = 0; i < domChildren.length; i++) {
      const child = domChildren[i]
      const key = child.key
      if (key) {
        // keyedLen++
        keyed[key] = child
      } else {
        children.push(child)
      }
    }
  }

  if (vchildren && vchildren.length > 0) {
    let min = 0
    let childrenLen = children.length

    for (let i = 0; i < vchildren.length; i++) {
      const vchild = vchildren[i]
      const key = vchild.key
      let child

      if (key) {
        if (keyed[key]) {
          child = keyed[key]
          keyed[key] = undefined
        }
      } else if (min < childrenLen) {
        for (let j = min; j < childrenLen; j++) {
          const c = children[j]

          if (c && isSameNodeType(vchild, c)) {
            child = c
            children[j] = undefined

            if (j === childrenLen - 1) childrenLen--
            if (j === min) min++
            break
          }
        }
      }
      console.log(vchild, child)
      child = diffNode(vchild, child)

      const f = domChildren[i]
      if (child && child !== dom && child !== f) {
        if (!f) {
          dom.appendChild(child)
        } else if (child === f.nextSibling) {
          removeNode(f)
        } else {
          dom.insertBefore(child, f)
        }
      }
    }
  }
}
function removeNode (dom) {
  if (dom && dom.parentNode) {
    dom.parentNode.removeChild(dom)
  }
}
export function renderComponent (component) {
  let base = null

  const renderer = component.render()

  if (component.base && component.componentWillUpdate) {
    component.componentWillUpdate()
  }

  base = diffNode(renderer, component.base)

  component.base = base
  base._component = component

  if (component.base) {
    if (component.componentDidUpdate) component.componentDidUpdate()
  } else if (component.componentDidMount) {
    component.componentDidMount()
  }

  component.base = base
  base._component = component
}
function diffAttributes (vnode, dom) {
  const old = {} // 当前DOM的属性
  const attrs = vnode.props // 虚拟DOM的属性

  for (let i = 0; i < dom.attributes.length; i++) {
    const attr = dom.attributes[i]
    old[attr.name] = attr.value
  }

  // 如果原来的属性不在新的属性当中，则将其移除掉（属性值设为undefined）
  for (const name in old) {
    if (!(name in attrs)) {
      setAttribute(dom, name, undefined)
    }
  }

  // 更新新的属性值
  for (const name in attrs) {
    if (old[name] !== attrs[name]) {
      setAttribute(dom, name, attrs[name])
    }
  }
}
