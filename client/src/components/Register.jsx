import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import { Modal, Input, Icon, Header, Button } from 'semantic-ui-react'

const CREATE_USERS = gql`
  mutation CreateUsers(
    $username: String
    $password: String
    $firebaseId: String
  ) {
    createUsers(
      username: $username
      password: $password
      firebaseId: $firebaseId
    ) {
      id
    }
  }
`

class Register extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    if (this.props.index === 1) {
      return (
        <Mutation mutation={CREATE_USERS}>
          {(createUsers, { data }) => (
            <div>
              <Modal
                onClose={this.props.closePopup}
                open={this.props.open}
                size="tiny"
              >
                <Header className='registerButton'>Sign Up</Header>
                <div className='registerButton'>
                  <Input iconPosition="left" placeholder="Email" size="mini">
                    <Icon name="at" />
                    <input
                      onChange={e => {
                        this.props.emailVariable(e)
                      }}
                    />
                  </Input>
                  <Input
                    iconPosition="left"
                    type="password"
                    placeholder="Password"
                    size="mini"
                  >
                    <Icon name="key" />
                    <input
                      onChange={e => {
                        this.props.passwordVariable(e)
                      }}
                    />
                  </Input>
                  <Button
                    size="mini"
                    icon="world"
                    onClick={() => {
                      this.props.createWithEmail()
                      this.props.openOnboarding()
                    }}
                  />
                  <br />
                  <br />
                  <p>Or Sign Up With Google/Facebook</p>
                  <a>
                    <i
                      className="google plus square icon huge"
                      onClick={() => {
                        this.props.loginWithGoogle()
                        this.props.openOnboarding()
                      }}
                    />
                  </a>
                  <a>
                    <i
                      className="facebook square icon huge"
                      onClick={() => {
                        this.props.loginWithFacebook()
                        this.props.openOnboarding()
                      }}
                    />
                  </a>
                </div>
              </Modal>
            </div>
          )}
        </Mutation>
      )
    } else {
      return null
    }
  }
}

export default Register
