import React from 'react';
import ReactDom from 'react-dom';

class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }
  render() {
    return (
      <div>
        <h1>{this.state.counter}</h1>
        <button
          onClick={() => this.setState({ counter: this.state.counter + 1 })}
        >
          Click ME
        </button>
      </div>
    );
  }
}

ReactDom.render(
  <Car />,
  document.querySelector('.authHomePage .friendList-content')
);

ReactDom.render(
  <Car />,
  document.querySelector('.authHomePage .chatList-content')
);
