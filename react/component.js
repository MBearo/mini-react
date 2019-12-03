
import { renderComponent } from '../react-dom/diff'
export default class Component {
  constructor (props = {}) {
    this.isReactComponent = true
    this.props = props
    // console.log('props', props)
    this.state = {}
  }

  setState (stateChange) {
    // 将修改合并到state
    Object.assign(this.state, stateChange)
    renderComponent(this)
  }
}
