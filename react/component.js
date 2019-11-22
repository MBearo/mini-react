
import { renderComponent } from '../react-dom/render'
export default class Component {
  constructor (props = {}) {
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
