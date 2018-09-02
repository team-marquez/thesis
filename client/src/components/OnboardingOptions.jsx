import React from "react";

//css styling for selected option
let selectedCSS = {
  backgroundImage: "linear-gradient(lightgreen,white)"
};

class OnboardingOptions extends React.Component {
  state = {
    indoorSelected: false,
    outdoorSelected: false
  };

  selectOutdoor = this.selectOutdoor.bind(this);
  selectIndoor = this.selectIndoor.bind(this);

  selectIndoor() {
    this.setState({ indoorSelected: true, outdoorSelected: false });
  }

  selectOutdoor() {
    this.setState({ indoorSelected: false, outdoorSelected: true });
  }

  render() {
    return (
      <div className="onboardingOptions">
        <div
          className="leftOption"
          style={this.state.indoorSelected ? selectedCSS : null}
        >
          <div
            onClick={() => {
              this.props.selectOption(this.props.indoor);
              this.selectIndoor();
            }}
          >
            <h2>Option 1</h2>
            <div>
              <h3>{this.props.indoor.name}</h3>
              <img className="optionImage" src={this.props.indoor.img} />
              <br />
              <h4>Description</h4>
              <p>{this.props.indoor.description}</p>
            </div>
          </div>
        </div>

        <div
          className="rightOption"
          style={this.state.outdoorSelected ? selectedCSS : null}
        >
          <div
            onClick={() => {
              this.props.selectOption(this.props.outdoor);
              this.selectOutdoor();
            }}
          >
            <h2>Option 2</h2>
            <div>
              <h3>{this.props.outdoor.name}</h3>
              <img className="optionImage" src={this.props.outdoor.img} />
              <br />
              <h4>Description</h4>
              <p>{this.props.outdoor.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OnboardingOptions;
