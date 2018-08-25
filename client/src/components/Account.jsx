import React from 'react'

import { Button, Portal, Segment, Header, Input, Icon, Image, Popup } from 'semantic-ui-react'
import firebase from './firebase.js'
import Login from './Login.jsx'
import Register from './Register.jsx'

class Account extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      index: 0,
      email: '',
      password: ''
    }
    
    this.openSignIn = this.openSignIn.bind(this)
    this.openLogIn = this.openLogIn.bind(this)
    this.closePopup = this.closePopup.bind(this)
    this.loginWithGoogle = this.loginWithGoogle.bind(this)
    this.loginWithFacebook = this.loginWithFacebook.bind(this)
    this.loginWithEmail = this.loginWithEmail.bind(this)
    this.createWithEmail = this.createWithEmail.bind(this)
    this.checkUserLoggedIn = this.checkUserLoggedIn.bind(this)
  }

  // Checks the session from the start, and will change the picture and username of the user if they are already logged in.
  componentDidMount () {
    this.checkUserLoggedIn()
  }

  // Sets email to users email
  emailVariable(e) {
    this.setState({email: e.target.value})
  }

  // Sets password to users password
  passwordVariable(e) {
    this.setState({password: e.target.value})
  }

  // Call to open the sign up Portal
  openSignIn () {
    this.setState({
      open: !this.state.open, index: 1
    })
  }

  // Call to open the log in Portal
  openLogIn () {
    this.setState({
      open: !this.state.open, index: 2
    })
  }

  // Call to close the Portal from click anywhere
  closePopup () {
    this.setState({
      open: false, index: 0
    })
  }

  // Firebase Auth with Google, not saving sessions.
  loginWithGoogle () {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(results => {
      this.props.changeUser(results.additionalUserInfo.profile.given_name, results.additionalUserInfo.profile.picture)
      this.props.handleLogin()
    })
    this.closePopup()
  }

  // Firebase Auth with Facebook, not saving sessions.
  loginWithFacebook () {
    const provider = new firebase.auth.FacebookAuthProvider()
    firebase.auth().signInWithPopup(provider)
    .then(results => {      
      this.props.changeUser(results.additionalUserInfo.profile.name, results.additionalUserInfo.profile.picture.data.url)
      this.props.handleLogin()
    })
    .catch(err => console.log(err))
    this.closePopup()
  }

  //Firebase Auth User Creation with Email/Password
  createWithEmail () {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(response => {
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
    this.closePopup()
  }

  //Firebase Auth User Login with Email/Password
  loginWithEmail () {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(results => {
      this.props.handleLogin()
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
    this.closePopup()
  }

  //Check if user is logged in
  checkUserLoggedIn () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.changeUser(user.displayName, user.photoURL)
        this.props.handleLogin()
      } else {
        this.props.handleLogout()
      }
    });
  }

  render () {
    return (
       <div>
        {this.props.loggedIn === true ? <div>
            <Popup trigger={
              <Image src={this.props.image} avatar onClick={this.props.handleButtonClick} style={{position: 'absolute', top: '4%', left: '94%'}} />
            } content='User Profile'/>
          </div> : <div style={{position: 'absolute', top: '4%', left: '86%'}}>
            <Button.Group>
              <Button onClick={this.openLogIn}>Login</Button>
              <Button.Or />
              <Button onClick={this.openSignIn}>Register</Button>
            </Button.Group>
          </div>}

        <div>
          {this.state.index === 2 ? 
          <Login index={this.state.index} closePopup={this.closePopup} open={this.state.open}
          emailVariable={this.emailVariable}
          passwordVariable={this.passwordVariable}
          loginWithFacebook={this.loginWithFacebook}
          loginWithGoogle={this.loginWithGoogle}
          loginWithEmail={this.loginWithEmail}
          /> : null}

          {this.state.index === 1 ?
          <Register index={this.state.index} closePopup={this.closePopup} open={this.state.open}
          emailVariable={this.emailVariable}
          passwordVariable={this.passwordVariable}
          createWithEmail={this.createWithEmail}
          loginWithFacebook={this.loginWithFacebook}
          loginWithGoogle={this.loginWithGoogle}
          openOnboarding={this.props.openOnboarding}
          /> : null}
      </div>
    </div>
  )}
}

export default Account
