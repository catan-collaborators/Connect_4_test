import React from 'react';
import ReactDOM from 'react-dom'

const Column = (props) => {
    return (
      <div id={props.name} onClick={() => props.placePiece(props.name)}>
        {props.column.map((space, key) => {
          if (space === 0) {
          return (<div id="blank" key = {key}></div>)
          } if (space === 'R') {
            return (<div id="red" key = {key}></div>)
          } if (space === 'Y') {
            return (<div id="yellow" key = {key}></div>)
          } 
        })}
      </div>
    )
  }

  export default Column;