import React from 'react'
import gql from 'graphql-tag'
import { ApolloConsumer } from 'react-apollo'
import { Modal, Input, Icon, Header, Button } from 'semantic-ui-react'

const FIREBASE_USER = gql`
  query FirebaseUser($firebaseId: String) {
    firebaseUser(firebaseId: $firebaseId) {
      id
    }
  }
`



class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <div>
            <Modal onClose={this.props.closePopup} open={open} size="tiny">
                <Header className='logInButton'>Log In</Header>
                <div className='logInButton'>
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
                  onClick={async () => {
                    await this.props.loginWithEmail()

                    // const { data } = await client.query({
                    //   query: FIREBASE_USER,
                    //   variables: { firebaseId: 'test' }
                    // })

                    this.props.handleUserId(data.firebaseUser.id)
                  }}
                />
                <br />
                <br />
                <p>Or Log In With Google/Facebook</p>
                <a>
                  <i
                    className="google plus square icon huge"
                    onClick={async () => {
                      await this.props.loginWithGoogle()
                      console.log('Firebase ID', this.props.userId)

                      const { data } = await client.query({
                        query: FIREBASE_USER,
                        variables: { firebaseId: 'test' }
                      })

                      console.log('Database ID', this.props.userId)
                      client.writeData({data: {userId: data.firebaseUser.id}})
                      console.log('logged in with google?')
                      
                      // this.props.handleUserId(data.firebaseUser.id)
                    }}
                  />
                </a>
                <a>
                  <i
                    className="facebook square icon huge"
                    onClick={async () => {
                      await this.props.loginWithFacebook()
                      const { data } = await client.query({
                        query: FIREBASE_USER,
                        variables: { firebaseId: 'test' }
                      })
                      client.writeData({data: {userId: data.firebaseUser.id}})
                      console.log('logged in with fb?')
                      // this.props.handleUserId(data.firebaseUser.id)
                    }}
                  />
                </a>
              </div>
            </Modal>
          </div>
        )}
      </ApolloConsumer>
    )
  }
}

export default Login
