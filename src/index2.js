import { render, Component, h } from '../preact1.3/preact'
const React = {}
React.createElement = h

class Clock2 extends Component {
  click (e) {
    e.stopPropagation()
    console.log(this)
    console.log(e)
  }

  render (props, state) {
    return <div onclick={e => this.click(e)}>111</div>
  }
}

class Clock extends Component {
  constructor () {
    super()
    // set initial time:
    this.state.time = Date.now()
  }

  componentDidMount () {
    // update time every second
    // window._timer = setInterval(() => {
    //   this.setState({ time: Date.now() })
    // }, 1000)
  }

  // componentWillUnmount () {
  //   // stop when not renderable
  //   clearInterval(this.timer)
  // }
  click (e) {
    console.log(this)
    console.log(e)
  }

  render (props, state) {
    const time = new Date(state.time).toLocaleTimeString()
    return <span onclick={e => this.click(e)}>{ time } <Clock2/> </span>
  }
}

// const a = (
//   <p>
//     <h1>1</h1>
//     <span>{[5, 6].map(v => v)}</span>
//     {[1, 2, 3].map(v => <div>{v}</div>)}
//   </p>
// )
// console.log('a', a)
console.log('Clock', <Clock/>)

render(<Clock/>, document.body)
