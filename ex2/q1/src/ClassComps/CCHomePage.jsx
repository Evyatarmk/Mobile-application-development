import React, { Component } from 'react'
import CCColor from './CCColor'

export default class CCHomePage extends Component {
  constructor(props){
    super(props)
    this.state={backgroundColor:"white"}
  }
  
  changeColor=(color) =>{
    this.setState({backgroundColor:color})
  }
  render() {
    return (
      <div style={
        {backgroundColor:this.state.backgroundColor,
          borderRadius:5,
          padding:10
        }}>
        <CCColor color="red" sendColorToChange={this.changeColor} />
        <CCColor color="yellow" sendColorToChange={this.changeColor}/>
        <CCColor color="green" sendColorToChange={this.changeColor}/>
        <CCColor color="blue" sendColorToChange={this.changeColor}/>
        <CCColor color="black" sendColorToChange={this.changeColor}/>
        <CCColor color="white" sendColorToChange={this.changeColor}/>
        <CCColor color="orange" sendColorToChange={this.changeColor}/>
        <CCColor color="pink" sendColorToChange={this.changeColor}/>
      </div>

    )
  }
}
