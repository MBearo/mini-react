import React from '../react'
import ReactDOM from '../react-dom'
console.log(React)

class Welcome extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      num: 0
    }
  }

  handleClick () {
    this.setState({ num: this.state.num + 1 })
  }

  render () {
    console.error('this', this)
    return (<div>
      <p>Hello {this.state.num} </p>
      <button onClick={this.handleClick.bind(this)}>add</button>
    </div>)
  }
}
function Test (props) {
  console.log('Test props', props)
  return (<a href="http://www.google.com">5435{props.haha}</a>)
}
var x = 10
// function tick () {
const a = (
  <h1>
      1是
    <h2 a="1" b="2">2</h2>
    <h3>3</h3>
    <Test haha="sdf"></Test>
    <Welcome ids="ddd"></Welcome>
    <Welcome ids="dfs"></Welcome>
    <Welcome ids="ef3" ddd={x}></Welcome>
    <h4 idaa="sgsdf">4</h4>
    {[1, 2, 3].map(item => (<div>{item}</div>))}
    <div>{new Date().toLocaleTimeString()}</div>
  </h1>
)
console.log(a)
console.log(<Welcome ids="ddd"></Welcome>)
ReactDOM.render(a, document.getElementById('app'))
// }

// setInterval(() => {
//   tick()
// }, 1000)
