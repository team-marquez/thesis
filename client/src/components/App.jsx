import React from 'react'
import { Sidebar, Menu, Breadcrumb } from 'semantic-ui-react'
import { Switch, Route, Link } from 'react-router-dom'

import Account from './Account.jsx'
import Footer from './Footer.jsx'
import AllDays from './AllDays.jsx'
import Onboarding from './Onboarding.jsx'
import UserPreferences from './UserPreferences.jsx'
import Landing from './Landing.jsx'
import CurrentTrip from './CurrentTrip.jsx'
import PastTrip from './PastTrip.jsx'

import firebase from './firebase.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      home: false,
      user: 'Welcome User',
      image: 'https://react.semantic-ui.com/images/avatar/large/patrick.png',
      visible: false,
      login: false,
      trip: 'current'
    }

    this.changeUser = this.changeUser.bind(this)
    this.openOnboarding = this.openOnboarding.bind(this)
    this.closeFirstOnboard = this.closeFirstOnboard.bind(this)

    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleSidebarHide = this.handleSidebarHide.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
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
            <Menu.Item as="a">
              <Link to='/'>
                Home
              </Link>
            </Menu.Item>
            <Menu.Item as="a">
              <Link to='/current'>
                Current Trip
              </Link>
            </Menu.Item>
            <Menu.Item as='a'>
              <Link to='/past'>
                Past Trips
              </Link>
            </Menu.Item>
            <Menu.Item as="a" onClick={this.logOut}>
              <Link to='/'>
                Logout
              </Link>
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>

            <Switch>
              <Route exact path='/' render={props => <Landing /> } />
              <Route exact path='/current' render={props => <CurrentTrip /> } />
              <Route exact path='/past' render={props => <PastTrip /> } />
              <Route exact path='/trip' render={props => <AllDays {...props} user={this.state.user} />} />
            </Switch>

          </Sidebar.Pusher>
        </Sidebar.Pushable>

        <Account
          user={this.state.user}
          trip={this.state.trip}
          styled={{ height: '9%', width: '5%', position: 'absolute', top: '3%', left: '93%', cursor: 'pointer' }}
          image={this.state.image}
          changeUser={this.changeUser}
          openOnboarding={this.openOnboarding}
          handleButtonClick={this.handleButtonClick}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          loggedIn={this.state.login}
        />
      </div>
    )
  }
}

export default App
