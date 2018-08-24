import React from 'react'
import { Button, Icon, Sidebar, Menu, Breadcrumb } from 'semantic-ui-react'

import LoginButton from './LoginButton.jsx'
import Footer from './Footer.jsx'
import AllDays from './AllDays.jsx'
import UserProfile from './UserProfile.jsx'
import Onboarding from './Onboarding.jsx'
import UserPreferences from './UserPreferences.jsx'

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
      background: 'https://images.unsplash.com/photo-1523756025758-565a549d6eb6?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9&s=d8663c5594055b93eb4401194c780668'
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

    this.setState({location})

    if (location === 'New York') {
      this.setState({ background: 'https://images.unsplash.com/photo-1523756025758-565a549d6eb6?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9&s=d8663c5594055b93eb4401194c780668'})
    } else if (location === 'Paris') {
      this.setState({background: 'https://images.unsplash.com/photo-1500313830540-7b6650a74fd0?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9&s=6e938f7571b1c14add60901d6b841307'})
    } else if (location === 'Tokyo') {
      this.setState({background: 'https://images.unsplash.com/photo-1527596773609-5f8544271a51?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9&s=e87e76e6629f4f774e01de9997672597'})
    }
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
            <Menu.Item as="a" onClick={this.handleLogout}>
              Logout
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            {this.state.home === false ? (
              <div>
                {this.state.pickedTrip === false ? (
                  <div
                    style={{ display: 'flex', width: '100vw', height: '100vh' }}
                  >
                    <img
                      style={{
                        minWidth: '100vw',
                        minHeight: '100vh',
                        filter: 'grayscale(100%)'
                      }}
                      src={this.state.background}
                    />
                    <div>
                      <LoginButton
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
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        font: 'arial',
                        color: 'white',
                        fontSize: '100px',
                        fontWeight: 'bold',
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <div style={{ marginBottom: '8%' }}>New York</div>
                      <div style={{ width: '29%', margin: 'auto' }}>
                        <UserPreferences pickTrip={this.pickTrip} />
                      </div>
                    </div>
                    {/* <Onboarding open={this.state.openOnboarding} closer = {this.closeFirstOnboard} /> */}{' '}
                    */}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <AllDays home={this.goHome} user={this.state.user} />
                  </div>
                )}
              </div>
            ) : (
              <UserProfile home={this.goHome} user={this.state.user} />
            )}

<div style={{position: 'absolute', bottom: '5%', left: '45%'}}>
            <Breadcrumb>
              <Breadcrumb.Section onClick={this.locationChange}>Tokyo</Breadcrumb.Section>
              <Breadcrumb.Divider icon='map pin'/>
              <Breadcrumb.Section onClick={this.locationChange}>Paris</Breadcrumb.Section>
              <Breadcrumb.Divider icon='map pin'/>
              <Breadcrumb.Section onClick={this.locationChange}>New York</Breadcrumb.Section>
              <Breadcrumb.Divider icon='map pin'/>
            </Breadcrumb>
</div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default App
