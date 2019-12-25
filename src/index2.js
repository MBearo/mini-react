import { render, Component, h } from '../preact1.3/preact'
const React = {}
React.createElement = h

class Clock extends Component {
  constructor () {
    super()
    // set initial time:
    this.state.time = Date.now()
  }

  componentDidMount () {
    // update time every second
    this.timer = setInterval(() => {
      this.setState({ time: Date.now() })
    }, 1000)
  }

  componentWillUnmount () {
    // stop when not renderable
    clearInterval(this.timer)
  }

  render (props, state) {
    const time = new Date(state.time).toLocaleTimeString()
    return <span>{ time }</span>
  }
}

const a = (
  <p>
    <h1>1</h1>
    <span>{[5, 6].map(v => v)}</span>
    {[1, 2, 3].map(v => <div>{v}</div>)}
  </p>
)
console.log('a', a)
render(<Clock/>, document.body)
