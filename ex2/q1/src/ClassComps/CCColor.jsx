import React, { Component } from 'react'

export default class CCColor extends Component {
  constructor(props) {
    super(props)
  }
  changeColor=(e)=> {
    this.props.sendColorToChange(e.target.textContent)
  }
  render() {
    return (
      <div style=
        {{
          padding: 5,
          height: 70,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <button style={{ border: "solid black 2px" }} onClick={this.changeColor}
        >{this.props.color}</button>
      </div>
    )
  }
}
