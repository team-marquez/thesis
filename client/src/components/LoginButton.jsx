import React from 'react'

import { Button, Portal, Segment, Header, Input, Icon, Image } from 'semantic-ui-react'
import firebase from './firebase.js'

class LoginButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      index: 0,
      email: '',
      password: '',
      user: 'Welcome User',
      image: 'https://react.semantic-ui.com/images/avatar/large/patrick.png'
    }
    this.openSignIn = this.openSignIn.bind(this)
    this.openLogIn = this.openLogIn.bind(this)
    this.closePopup = this.closePopup.bind(this)
    this.loginWithGoogle = this.loginWithGoogle.bind(this)
    this.loginWithFacebook = this.loginWithFacebook.bind(this)
    this.loginWithEmail = this.loginWithEmail.bind(this)
    this.createWithEmail = this.createWithEmail.bind(this)
    this.checkUserLoggedIn = this.checkUserLoggedIn.bind(this)
    this.logOut = this.logOut.bind(this)
    this.changeUser = this.changeUser.bind(this)
  }

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
      console.log('Logged In With Google', results)
      this.changeUser(results.additionalUserInfo.profile.given_name, results.additionalUserInfo.profile.picture.data.url)
    })
    this.closePopup()
  }

  // Firebase Auth with Facebook, not saving sessions.
  loginWithFacebook () {
    const provider = new firebase.auth.FacebookAuthProvider()
    firebase.auth().signInWithPopup(provider)
    .then(results => {      
      console.log('Logged In With Facebook', results.additionalUserInfo.profile.picture.data.url)
      this.changeUser(results.additionalUserInfo.profile.name, results.additionalUserInfo.profile.picture.data.url)
    })
    .catch(err => console.log(err))
    this.closePopup()
  }

  //Firebase Auth User Creation with Email/Password
  createWithEmail () {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
    this.closePopup()
  }

  //Firebase Auth User Login with Email/Password
  loginWithEmail () {
    console.log('and the bigger picture', this.state)
    console.log('just checking...', this.state.email)
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
    this.closePopup()
  }

  //Check if user is logged in
  checkUserLoggedIn () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        this.changeUser(user.displayName, user.photoURL)
      } else {
        // No user is signed in.
      }
    });
  }

  // Firebase log out method. NOT IMPLEMENTED YET
  logOut () {
    firebase.auth().signOut()
    .then(() => {
      console.log('logged out')
      this.changeUser('Welcome User', 'https://react.semantic-ui.com/images/avatar/large/patrick.png')
    })
  }

  //Set username
  changeUser (username, image) {
    this.setState({
      user: username,
      image: image || this.state.image
    })
  }

  render () {
    const { open } = this.state
    return (
      <div>
        <div className = 'signUpButton' style = {{textAlign: 'center', marginTop: '5px', marginRight: '10px', marginBottom: '5px'}}>

          <div style = {{display: 'inline-block', float: 'left', marginLeft: '10px', paddingTop: '10px'}}>
            <Button animated='fade'>
              <Button.Content visible>Log Out</Button.Content>
              <Button.Content hidden onClick = {this.logOut}><Icon name='user close' /></Button.Content>
            </Button>
          </div>


          <div style = {{display: 'inline-block', marginTop: '5px'}}>
            <Header as='h3'>
              <Image circular src={this.state.image} /> {this.state.user}
            </Header>
          </div>

          <div style = {{display: 'inline-block', float: 'right', paddingTop: '10px'}}>
            <Button.Group>
              <Button
                content={open ? 'Close Portal' : 'Open Portal'}
                negative={open}
                onClick={this.openSignIn}
              >Sign Up</Button>
              <Button.Or />
              <Button
                content={open ? 'Close Portal' : 'Open Portal'}
                negative={open}
                positive={!open}
                onClick={this.openLogIn}
              >Login</Button>
            </Button.Group>
          </div>
        </div>

        <div>
          {this.state.index === 1 ? (
            <Portal onClose={this.closePopup} open={open}>
              <Segment style={{ left: '37%', position: 'fixed', top: '10%', zIndex: 1000 }}>
                <Header style={{textAlign: 'center'}}>Sign Up</Header>
                <div style={{textAlign: 'center'}}>
                  <Input iconPosition='left' placeholder='Email' size='mini'>
                    <Icon name='at' />
                    <input onChange={(e) => {this.emailVariable(e)}}/>
                  </Input>
                  <Input iconPosition='left' type='password' placeholder='Password' size='mini' onSubmit={this.createWithEmail}>
                    <Icon name='key' />
                    <input 
                      onChange={(e) => {this.passwordVariable(e)}}
                    />
                  </Input> 
                  <Button size='mini' icon='world' onClick={this.createWithEmail}/><br/><br/> 
                  <p>Or Sign Up With Google/Facebook</p>
                  <a><i onClick = {this.loginWithGoogle} className="google plus square icon huge"></i></a>
                  <a><i onClick = {this.loginWithFacebook} className="facebook square icon huge"></i></a>
                </div>
              </Segment>
            </Portal>
          ) : (
            <Portal onClose={this.closePopup} open={open}>
              <Segment style={{ left: '37%', position: 'fixed', top: '10%', zIndex: 1000 }}>
                <Header style={{textAlign: 'center'}}>Log In</Header>
                <div style={{textAlign: 'center'}}>
                  <Input iconPosition='left' placeholder='Email' size='mini'>
                    <Icon name='at' />
                    <input onChange={(e) => {this.emailVariable(e)}}/>
                  </Input>
                  <Input iconPosition='left' type='password' placeholder='Password' size='mini'>
                    <Icon name='key' />
                    <input 
                      onChange={(e) => {this.passwordVariable(e)}}
                    />
                  </Input> 
                  <Button size='mini' icon='world' onClick={this.loginWithEmail}/><br/><br/>
                  <p>Or Log In With Google/Facebook</p>
                  <a><i onClick = {this.loginWithGoogle} className="google plus square icon huge"></i></a>
                  <a><i onClick = {this.loginWithFacebook} className="facebook square icon huge"></i></a>
                </div>
              </Segment>
            </Portal>
          )}
        </div>

      </div>
    )
  }
}

export default LoginButton
