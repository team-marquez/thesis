import React from "react";

import LoginButton from "./LoginButton.jsx";
import LocationModal from "./LocationModal.jsx";
import Footer from "./Footer.jsx";
import AllDays from "./AllDays.jsx";
import Onboarding from './Onboarding.jsx'

import { Button } from 'semantic-ui-react'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pickedTrip: false,
      home: false
    };
    this.pickTrip = this.pickTrip.bind(this)
    this.switchHome = this.switchHome.bind(this)
  }

  // Conditional rendering function for displaying the home page and the trip page. Works on LocationModals 'Next' button.
  pickTrip() {
    this.setState({
      pickedTrip: !this.state.pickedTrip
    });
  }

  switchHome() {
    this.setState({
      home: !this.state.home
    })
  }

  render() {
    return (
      <div>
        {this.state.home === false ? (
          <div>
            {this.state.pickedTrip === false ? (
              <div>
                <div style={{textAlign: 'center', marginBottom: '15px'}}>
                  <LoginButton/>  
                </div>
                <div style={{display: 'inline-block'}}>
                  <LocationModal pickTrip={this.pickTrip}/>
                </div>
                  <Footer/>
                  <Onboarding/>
                  <Button onClick = {this.switchHome}></Button>
              </div>
            ) : (
              <div style={{textAlign: 'center'}}>
                <AllDays/>
              </div>
            )}
        </div>
        ) : (<div> <Button onClick = {this.switchHome}></Button></div>)}
      </div>
    )
  }
}

export default App;
