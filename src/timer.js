import React from "react";
export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: props.time, paused: props.paused };
  }

  tick() {
    if (!this.state.paused) {
        this.interval = setTimeout(() => this.update(), 10);
    }
}

update() {
    this.setState(state => ({
        seconds: state.seconds - 0.01
      }));
      this.tick();
}

  componentWillReceiveProps(newProps) {
      this.setState({
          paused: newProps.paused
      })
      this.tick();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        Seconds: {this.state.seconds} -{this.state.paused?"Paused":""}
      </div>
    );
  }
}
