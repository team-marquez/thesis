import React from "react";
import { Button, Icon } from 'semantic-ui-react'

import LoginButton from "./LoginButton.jsx";
import Footer from "./Footer.jsx";
import AllDays from "./AllDays.jsx";
import UserProfile from './UserProfile.jsx'
import Onboarding from './Onboarding.jsx'
import UserPreferences from "./UserPreferences.jsx";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pickedTrip: false,
      home: false,
      user: 'Welcome User',
      image: 'https://react.semantic-ui.com/images/avatar/large/patrick.png',
      openOnboarding: false
    };
    this.pickTrip = this.pickTrip.bind(this)
    this.switchHome = this.switchHome.bind(this)
    this.changeUser = this.changeUser.bind(this)
    this.openOnboarding = this.openOnboarding.bind(this)
    this.closeFirstOnboard = this.closeFirstOnboard.bind(this)
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

  openOnboarding () {
    this.setState({openOnboarding: true})
  }

  closeFirstOnboard () {
    this.setState({openOnboarding: false})
  }

  render() {
    return (
      <div>
        {this.state.home === false ? (
          <div>
            {this.state.pickedTrip === false ? (
              <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>

                <img style={{ minWidth: '100%', minHeight: '100%', filter:'grayscale(100%)' }} src="https://images.unsplash.com/photo-1523756025758-565a549d6eb6?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9&s=d8663c5594055b93eb4401194c780668" />

                <div style={{position: 'absolute', top: '4%', left: '86%'}}>
                  <LoginButton home={this.switchHome} user={this.state.user} image={this.state.image} changeUser={this.changeUser}
                    openOnboarding={this.openOnboarding}/>
                </div>

                <div style={{position: 'absolute', top: '50%', left: '50%', font: 'arial', color: 'white', fontSize: '100px', fontWeight: 'bold', transform: 'translate(-50%, -50%)'}}>
                  <div style={{marginBottom: '8%', }}>New York</div>
                  <div style={{width: '29%', margin: 'auto'}}>
                    <UserPreferences pickTrip={this.pickTrip} />
                  </div>
                </div>

                {/* <div style={{textAlign: 'center', marginBottom: '15px'}}>
                  <LoginButton home={this.switchHome} user={this.state.user} image={this.state.image} changeUser={this.changeUser}
                    openOnboarding = {this.openOnboarding}
                  />  
                </div>
                <div style={{display: 'inline-block'}}>
                  <LocationModal pickTrip={this.pickTrip}/>
                </div>
                  <Footer/>
                  <Onboarding open={this.state.openOnboarding} closer = {this.closeFirstOnboard} /> */}
              </div>
            ) : (
              <div style={{textAlign: 'center'}}>
                <AllDays home={this.switchHome} user={this.state.user}/>
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
