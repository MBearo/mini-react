export default class Component {
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
