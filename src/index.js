console.log(1111)

const React = {}
React.createElement = function (tag, attrs, ...children) {
  console.log(tag, attrs, children)
}

const a = (
  <h1>
    <h2 a="1" b="2">2</h2>
    <h3>3</h3>
    <h4>4</h4>
    {[1, 2, 3].map(item => (<div>{item}</div>))}
  </h1>
)
