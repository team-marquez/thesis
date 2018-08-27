import React from 'react'

import { Button, Image, Popup } from 'semantic-ui-react'
import firebase from './firebase.js'
import Login from './Login.jsx'
import client from '../index.jsx'

import Register from './Register.jsx'

class Account extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      index: 0,
      email: '',
      password: '',
      userId: ''
    }
    
    this.openSignIn = this.openSignIn.bind(this)
    this.openLogIn = this.openLogIn.bind(this)
    this.closePopup = this.closePopup.bind(this)

    this.loginWithGoogle = this.loginWithGoogle.bind(this)
    this.loginWithFacebook = this.loginWithFacebook.bind(this)
    this.loginWithEmail = this.loginWithEmail.bind(this)
    this.createWithEmail = this.createWithEmail.bind(this)
    this.checkUserLoggedIn = this.checkUserLoggedIn.bind(this)
    
    this.handleUserId = this.handleUserId.bind(this)
    this.emailVariable = this.emailVariable.bind(this)
    this.passwordVariable = this.passwordVariable.bind(this)
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

  handleUserId (id) {
    this.setState({userId: id})
  }

  // Firebase Auth with Google, not saving sessions.
  loginWithGoogle () {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(results => {
      console.log(results)
      this.props.changeUser(results.additionalUserInfo.profile.given_name, results.additionalUserInfo.profile.picture)
      this.handleUserId(results.additionalUserInfo.profile.id)
      this.props.handleLogin()

      this.closePopup()
    })
  }

  // Firebase Auth with Facebook, not saving sessions.
  loginWithFacebook () {
    const provider = new firebase.auth.FacebookAuthProvider()
    return firebase.auth().signInWithPopup(provider)
    .then(results => {
      console.log(results)
      this.props.changeUser(results.additionalUserInfo.profile.name, results.additionalUserInfo.profile.picture.data.url)
      this.handleUserId(results.additionalUserInfo.profile.id)
      this.props.handleLogin()
      
      this.closePopup()
    })
    .catch(err => console.log(err))
  }

  //Firebase Auth User Creation with Email/Password
  createWithEmail () {
    return firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(response => {
      console.log('Created user successfully', response)
      this.closePopup()
    }).catch(function(error) {
      console.error('Error creating user', error)
    })
  }

  //Firebase Auth User Login with Email/Password
  loginWithEmail () {
    return firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(results => {
      this.props.handleLogin()
      this.closePopup()
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    })
  }
  
  //Check if user is logged in
  checkUserLoggedIn () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.changeUser(user.displayName, user.photoURL)
        this.props.handleLogin()
        client.writeData({data: {userId: user.uid}})
      } else {
        this.props.handleLogout()
      }
    })
  }

  render () {
    return (
       <div>
        {this.props.loggedIn === true ? <div>
            <Popup trigger={
              <Image src={this.props.image} avatar onClick={this.props.handleButtonClick} style={{height: '9%', width: '5%', position: 'absolute', top: '3%', left: '93%', cursor:'pointer'}} />
            } content='User Profile'/>
          </div> : <div className='loginRegisterButton'>
            <Button.Group>
              <Button onClick={this.openLogIn}>Login</Button>
              <Button.Or />
              <Button onClick={this.openSignIn}>Register</Button>
            </Button.Group>
          </div>}

        <div>
          {this.state.index === 2 ? 
          <Login closePopup={this.closePopup} open={this.state.open}
          emailVariable={this.emailVariable}
          passwordVariable={this.passwordVariable}
          loginWithFacebook={this.loginWithFacebook}
          loginWithGoogle={this.loginWithGoogle}
          loginWithEmail={this.loginWithEmail}
          handleUserId={this.handleUserId}
          userId={this.state.userId}
          /> : null}

          {this.state.index === 1 ?
          <Register index={this.state.index} closePopup={this.closePopup} open={this.state.open}
          emailVariable={this.emailVariable}
          passwordVariable={this.passwordVariable}
          createWithEmail={this.createWithEmail}
          loginWithFacebook={this.loginWithFacebook}
          loginWithGoogle={this.loginWithGoogle}
          openOnboarding={this.props.openOnboarding}
          email={this.state.email}
          password={this.state.password}
          userId={this.state.userId}
          /> : null}
      </div>
    </div>
  )}
}

export default Account
