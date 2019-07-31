import React from "react";
import ReactScoreIndicator from "react-score-indicator";

export default class scoreboard extends React.Component {
  render() {
    return (
      <div className="playerscore" data-testid={"scoreboard"}>
        <ReactScoreIndicator value={this.props.scoreboard} maxValue={4} />
      </div>
    );
  }
}
