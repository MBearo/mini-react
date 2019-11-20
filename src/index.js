import React from '../react'
import ReactDOM from '../react-dom'
console.log(React)

class Welcome extends React.Component {
  render () {
    return <h1>Hello</h1>
  }
}

// function tick () {
const a = (
  <h1>
      1
    <h2 a="1" b="2">2</h2>
    <h3>3</h3>
    <Welcome></Welcome>
    <h4>4</h4>
    {[1, 2, 3].map(item => (<div>{item}</div>))}
    <div>{new Date().toLocaleTimeString()}</div>
  </h1>
)
console.log(a)
ReactDOM.render(a, document.getElementById('app'))
// }

// setInterval(() => {
//   tick()
// }, 1000)
