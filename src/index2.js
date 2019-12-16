import { render, Component, h } from '../preact1.3/preact'
const React = {}
React.createElement = h

const a = (
  <p>
    <h1>1</h1>
    <span>{[5, 6].map(v => v)}</span>
    {[1, 2, 3].map(v => <div>{v}</div>)}
  </p>
)
console.log('a', a)
render(a, document.body)
