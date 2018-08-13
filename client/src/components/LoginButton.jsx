import React from 'react'

import { Button, Portal, Segment, Header, Input, Icon } from 'semantic-ui-react'
import firebase from './firebase.js'

class LoginButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      index: 0
    }
    this.openSignIn = this.openSignIn.bind(this)
    this.openLogIn = this.openLogIn.bind(this)
    this.closePopup = this.closePopup.bind(this)
    this.loginWithGoogle = this.loginWithGoogle.bind(this)
    this.loginWithFacebook = this.loginWithFacebook.bind(this)
    this.logOut = this.logOut.bind(this)
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
    .then(results => console.log('Logged In With Google', results))
  }

  // Firebase Auth with Facebook, not saving sessions.
  loginWithFacebook () {
    const provider = new firebase.auth.FacebookAuthProvider()
    firebase.auth().signInWithPopup(provider)
    .then(results => console.log('Logged In With Facebook', results))
    .catch(err => console.log(err))
  }

  // Firebase log out method. NOT IMPLEMENTED YET
  logOut () {
    firebase.auth().signOut()
    .then(() => console.log('logged out'))
  }

  render () {
    const { open } = this.state
    return (
      <div>
        <div className = 'signUpButton' style = {{textAlign: 'right', marginTop: '5px', marginRight: '10px', marginBottom: '5px'}}>
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

        <div>
          {this.state.index === 1 ? (
            <Portal onClose={this.closePopup} open={open}>
              <Segment style={{ left: '37%', position: 'fixed', top: '10%', zIndex: 1000 }}>
                <Header style={{textAlign: 'center'}}>Sign Up</Header>
                <div style={{textAlign: 'center'}}>
                  <Input iconPosition='left' placeholder='Email' size='mini'>
                    <Icon name='at' />
                    <input />
                  </Input>
                  <Input iconPosition='left' type='password' placeholder='Password' size='mini'>
                    <Icon name='key' />
                    <input />
                  </Input> <br/><br/>
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
                    <input />
                  </Input>
                  <Input iconPosition='left' type='password' placeholder='Password' size='mini'>
                    <Icon name='key' />
                    <input />
                  </Input> <br/><br/>
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
