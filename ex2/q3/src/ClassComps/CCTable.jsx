import React, { Component } from 'react'

export default class CCTable extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 100 }
  }
  change50=()=>{
    this.setState({width:50})
  }
  change100=()=>{
    this.setState({width:100})
  }
  render() {
    return (

      <div
        style={{
          width: '140vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border:"solid 2px black",
          borderRadius:5
        }}
      >
        <table
          style={{
            backgroundColor: 'grey',
            width: `${this.state.width}%`,
            borderCollapse: 'collapse',
          }}
          onClick={this.change50}
          onDoubleClick={this.change100}
        >
          <tbody>
            <tr>
              <td style={{ border: '1px solid black' }}>Cell 1</td>
              <td style={{ border: '1px solid black' }}>Cell 2</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black' }}>Cell 3</td>
              <td style={{ border: '1px solid black' }}>Cell 4</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black' }}>Cell 5</td>
              <td style={{ border: '1px solid black' }}>Cell 6</td>
            </tr>
          </tbody>
        </table>
      </div>

    )
  }
}
