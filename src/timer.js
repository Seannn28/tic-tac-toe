import React from "react";

export default class Timer extends React.Component {
  render() {
    return <div>Seconds: {this.props.time}</div>;
  }
}
