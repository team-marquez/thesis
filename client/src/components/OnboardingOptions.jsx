import React from "react";

class OnboardingOptions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      indoorSelected: false,
      outdoorSelected: false
    }
    this.selectIndoor = this.selectIndoor.bind(this)
    this.selectOutdoor = this.selectOutdoor.bind(this)
  }

  selectIndoor() {
    this.setState({ indoorSelected: true, outdoorSelected: false})
  }

  selectOutdoor() {
    this.setState({ indoorSelected: false, outdoorSelected: true})
  }
  
  render() {
    return (
      <div>
        <div onClick={() => {
          this.props.selectOption(this.props.indoor)
          this.selectIndoor()
        }}
          style= {this.state.indoorSelected ? {border: '3px solid green'} : null }
          >
          <h2>Option 1</h2>
          <div>
            <h3>{this.props.indoor.name}</h3>
            <img src={this.props.indoor.img} />
            Description: {this.props.indoor.description}
          </div>
        </div>
        <div onClick={() => {
          this.props.selectOption(this.props.outdoor)
          this.selectOutdoor()
        }}
          style= {this.state.outdoorSelected ? {border: '3px solid green'} : null }
        >
          <h2>Option 2</h2>
          <div>
            <h3>{this.props.outdoor.name}</h3>
            <img src={this.props.outdoor.img} />
            Description: {this.props.outdoor.description}
          </div>
        </div>
      </div>
    )
  }
};

export default OnboardingOptions;
