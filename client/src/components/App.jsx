import React from "react";

import LoginButton from "./LoginButton.jsx";
import LocationModal from "./LocationModal.jsx";
import Footer from "./Footer.jsx";
import AllDays from "./AllDays.jsx";
import UserProfile from './UserProfile.jsx'
import Onboarding from './Onboarding.jsx'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pickedTrip: false,
      home: false,
      user: 'Welcome User',
      image: 'https://react.semantic-ui.com/images/avatar/large/patrick.png',
    };
    this.pickTrip = this.pickTrip.bind(this)
    this.switchHome = this.switchHome.bind(this)
    this.changeUser = this.changeUser.bind(this)
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

  //Set username
  changeUser (username, image) {
    this.setState({
      user: username,
      image: image || this.state.image
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
                  <LoginButton home={this.switchHome} user={this.state.user} image={this.state.image} changeUser={this.changeUser}/>  
                </div>
                <div style={{display: 'inline-block'}}>
                  <LocationModal pickTrip={this.pickTrip}/>
                </div>
                  <Footer/>
                  <Onboarding/>
              </div>
            ) : (
              <div style={{textAlign: 'center'}}>
                <AllDays/>
              </div>
            )}
          </div>
        ) : (
          <UserProfile home={this.switchHome} user={this.state.user}/>
        )}
      </div>
    )
  }
}

export default App;
