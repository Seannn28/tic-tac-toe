import React from "react";
export default class Timer extends React.Component {
  render() {
    return <div className="timers"> {this.props.title} {(Math.floor(this.props.time / 1000))}</div>;
  }
}

