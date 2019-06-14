import React from "react";
import "./App.css";

const easeOutCubic = (currentIteration, changeInValue, totalIterations) => {
  return (
    changeInValue * (Math.pow(currentIteration / totalIterations - 1, 3) + 1)
  );
};

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      maxValue: "100000",
      currentIteration: 0
    };
  }

  getCountUpdate = () => {
    let { value, maxValue, currentIteration } = this.state;

    const animationDuration = 3;
    const fps = 60;
    const totalIterations = animationDuration * fps;

    let currentValue = Math.floor(
      easeOutCubic(currentIteration, +maxValue, totalIterations)
    );

    if (value < +maxValue) {
      requestAnimationFrame(this.getCountUpdate);
    }

    this.setState(prevState => ({
      value: currentValue,
      currentIteration: prevState.currentIteration + 1
    }));
  };

  handleButton = () => {
    this.getCountUpdate();
    this.setState({
      value: 0,
      currentIteration: 0
    });
  };

  handleInput = e => {
    this.setState({
      maxValue: e.target.value
    });
  };

  render() {
    let { value } = this.state;
    return (
      <div className="App">
        <h1>Counter</h1>
        <h3>{value}</h3>
        <label>
          What is the maximum value you want, Sir? Write please(optional,
          default: 100000)
        </label>
        <input type="number" onChange={this.handleInput} />
        <button onClick={this.handleButton}>
          {value === 0 ? "Start" : "Reset"}
        </button>
      </div>
    );
  }
}

export default Counter;
