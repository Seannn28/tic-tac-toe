import React from "react";

export default function Square(props) {
  console.log(props.winning)
  return (
    <button className={`square ${props.winning!==-1&&props.winning!==null?"winning":""}`} onClick={props.onClick}>
      {props.value}
    </button>
  );
}
