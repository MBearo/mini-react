import { createElement } from './create-element'
import { render } from './render'
export default {
  createElement,
  render: (vnode, parentDom) => {
    parentDom.innerHTML = ''
    return render(vnode, parentDom)
  }
}
