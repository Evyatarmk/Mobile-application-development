import React, { Component } from 'react'

export default class CCForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      labelToShow: null,
    };
  }
  showText = (e) => {
    this.setState({ labelToShow: e.target.id })
  }
  hideText = () => {
    this.setState({ labelToShow: null })
  }
  ChangePsychometricScore=(e)=>{
    this.setState({ psychometricScore: e.target.value})
   
  }
  render() {
     let ResultIfAcceptedstr=this.state.psychometricScore>555 ?
     "You can be accepted for studies":"You should try next year"

    return (
      <div style={{display:"flex",flexDirection:"column"}}>
        <label style={{
          visibility: this.state.labelToShow === "firstName" ? "visible" : "hidden",
          color: "red"
        }}>
          Enter first name
        </label>
        <input type='text' id="firstName"
          onFocus={this.showText}
          onBlur={this.hideText}>
        </input>

        <label style={{
          visibility: this.state.labelToShow === "lastName" ? "visible" : "hidden",
          color: "red"
        }}>
          Enter last name
        </label>
        <input type='text' id="lastName"
          onFocus={this.showText}
          onBlur={this.hideText}>
        </input>

        <label style={{
          visibility: this.state.labelToShow === "psychometricScore" ? "visible" : "hidden",
          color: "red"
        }}>
          Enter psychometric score
        </label>
        <input type='number' id="psychometricScore"
          onFocus={this.showText}
          onBlur={(e)=>{this.hideText 
          this.ChangePsychometricScore(e)}}>     
        </input>
        <label style={{
          visibility: this.state.psychometricScore ? "visible" : "hidden",
          color: "red"
        }}>
         {ResultIfAcceptedstr}
        </label>
      </div>
    )
  }
}
