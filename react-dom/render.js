import { diff } from './diff'

// 只需要把vnode转成dom就行
// function _render (vnode, container) {
//   console.log('vnode2', vnode)

//   if (vnode === undefined || vnode === null) {
//     vnode = ''
//   }

//   if (typeof vnode === 'number' || typeof vnode === 'boolean') {
//     vnode = String(vnode)
//   }

//   if (typeof vnode === 'string') {
//     return document.createTextNode(vnode)
//   }

//   if (typeof vnode.type === 'function') {
//     const component = createComponent(vnode.type, vnode.props)
//     // setComponentProps(component, vnode.props)
//     return renderComponent(component).base
//   }
//   console.log(vnode)
//   const dom = document.createElement(vnode.type)

//   // 如果有属性设置属性
//   if (vnode.props) {
//     Object.keys(vnode.props).forEach(key => {
//       const value = vnode.props[key]
//       setAttribute(dom, key, value) // 设置属性
//     })
//   }

//   // 如果有子节点
//   if (vnode.children) {
//     vnode.children.forEach(child => {
//       // 这里写的感觉有点隐藏bug
//       if (Array.isArray(child)) {
//         child.forEach(item => render(item, dom))
//       } else {
//         render(child, dom)
//       }
//     }) // 递归渲染子节点
//   }
//   return container.appendChild(dom)
// }

export default function render (vnode, parentDom, dom) {
  diff(dom, vnode, parentDom)
}
