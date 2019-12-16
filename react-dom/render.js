import { diff } from './diff'

export default function render (vnode, parentDom, dom) {
  diff(dom, vnode, parentDom)
}
