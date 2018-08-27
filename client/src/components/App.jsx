import React from 'react'
import { Button, Icon, Sidebar, Menu, Breadcrumb } from 'semantic-ui-react'

import Account from './Account.jsx'
import Footer from './Footer.jsx'
import AllDays from './AllDays.jsx'
import UserProfile from './UserProfile.jsx'
import Onboarding from './Onboarding.jsx'
import UserPreferences from './UserPreferences.jsx'
import firebase from './firebase.js'
import { images } from './helpers/splashImages.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pickedTrip: false,
      home: false,
      user: 'Welcome User',
      image: 'https://react.semantic-ui.com/images/avatar/large/patrick.png',
      openOnboarding: false,
      visible: false,
      login: false,
      location: 'New York',
      background: '',
      backgroundNY: ''
    }

    this.pickTrip = this.pickTrip.bind(this)
    this.goHome = this.goHome.bind(this)
    this.changeUser = this.changeUser.bind(this)
    this.openOnboarding = this.openOnboarding.bind(this)
    this.closeFirstOnboard = this.closeFirstOnboard.bind(this)

    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleSidebarHide = this.handleSidebarHide.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)

    this.locationChange = this.locationChange.bind(this)
  }

  // Set random background image from our helper splashImage file.
  componentDidMount() {
    let img = images[Math.floor(Math.random() * images.length)]
    console.log(img)
    this.setState({ background: img, backgroundNY: img })
  }

  // Conditional rendering function for displaying the home page and the trip page. Works on LocationModals 'Next' button.
  pickTrip() {
    this.setState({
      pickedTrip: !this.state.pickedTrip
    })
  }

  goHome() {
    this.setState({
      home: false
    })
  }

  //Set username
  changeUser(username, image) {
    this.setState({
      user: username,
      image: image || this.state.image
    })
  }

  openOnboarding() {
    this.setState({ openOnboarding: true })
  }

  closeFirstOnboard() {
    this.setState({ openOnboarding: false })
  }

  handleButtonClick() {
    this.setState({ visible: !this.state.visible })
  }

  handleSidebarHide() {
    this.setState({ visible: false })
  }

  handleLogin() {
    this.setState({ login: true })
  }

  handleLogout() {
    this.setState({ login: false })
  }

  locationChange(e) {
    var location = e.target.text

    this.setState({ location })

    if (location === 'New York') {
      this.setState({
        background: this.state.backgroundNY
      })
    } else if (location === 'Paris') {
      this.setState({
        background:
          'https://images.unsplash.com/photo-1500313830540-7b6650a74fd0?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9&s=6e938f7571b1c14add60901d6b841307'
      })
    } else if (location === 'Tokyo') {
      this.setState({
        background:
          'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ebd34ddde3f2b4ea6dcdc9b7d329b774&auto=format&fit=crop&w=2850&q=80'
      })
    }
  }

  logOut() {
    firebase.auth().signOut()
      .then(() => {
        this.changeUser('Anonymous User', 'https://react.semantic-ui.com/images/avatar/large/patrick.png')
        this.handleLogout()
      })
  }

  render() {
    return (
      <div>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            onHide={this.handleSidebarHide}
            vertical
            visible={this.state.visible}
            width="thin"
          >
            <Menu.Item as="a" onClick={this.switchHome}>
              Home
            </Menu.Item>
            <Menu.Item>Current Trip</Menu.Item>
            <Menu.Item>Past Trips</Menu.Item>
            <Menu.Item as="a" onClick={this.logOut}>
              Logout
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            {this.state.home === false ? (
              <div>
                {this.state.pickedTrip === false ? (
                  <div className='splash'>
                    <img className='splashImage' src={this.state.background}/>
                    <div>
                      <Account
                        user={this.state.user}
                        image={this.state.image}
                        changeUser={this.changeUser}
                        openOnboarding={this.openOnboarding}
                        handleButtonClick={this.handleButtonClick}
                        handleLogin={this.handleLogin}
                        handleLogout={this.handleLogout}
                        loggedIn={this.state.login}
                      />
                    </div>
                    <div className='cityName'>
                      {this.state.location === 'New York' ? (
                        <div>
                          <div className='newYork'>New York</div>
                          <div className='newYorkTrip'>
                            <UserPreferences pickTrip={this.pickTrip} able={false}/>
                          </div>
                        </div>
                      ) : this.state.location === 'Tokyo' ? (
                        <div>
                          <div className='tokyo'>Tokyo</div>
                          <div className='tokyoTrip'>
                            <UserPreferences pickTrip={this.pickTrip} able={true}/>
                          </div>
                        </div>
                      ) : (<div>
                        <div className='paris'>Paris</div>
                        <div className='parisTrip'>
                          <UserPreferences pickTrip={this.pickTrip} able={true}/>
                        </div>
                        </div>)}
                    </div>
                    <Onboarding open={this.state.openOnboarding} closer = {this.closeFirstOnboard} />
                  </div>
                ) : (
                  <div className='allDaysComp'>
                    <AllDays home={this.goHome} user={this.state.user} />
                  </div>
                )}
              </div>
            ) : (
              <UserProfile home={this.goHome} user={this.state.user} />
            )}
            {this.state.pickedTrip === false ? (
              <div className='breadCrumbs'>
                <Breadcrumb>
                  <Breadcrumb.Section onClick={this.locationChange}>
                    Tokyo
                  </Breadcrumb.Section>
                  <Breadcrumb.Divider icon="map pin" />
                  <Breadcrumb.Section onClick={this.locationChange}>
                    Paris
                  </Breadcrumb.Section>
                  <Breadcrumb.Divider icon="map pin" />
                  <Breadcrumb.Section onClick={this.locationChange}>
                    New York
                  </Breadcrumb.Section>
                  <Breadcrumb.Divider icon="map pin" />
                </Breadcrumb>
              </div>
            ) : (<div></div>)}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default App
