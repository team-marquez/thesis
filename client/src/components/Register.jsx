import React from 'react'
import gql from 'graphql-tag'
import { Mutation, ApolloConsumer } from 'react-apollo'
// import client from '../index.jsx'
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
    return (
      <Mutation mutation={CREATE_USERS} update={(cache, {data: {createUsers}}) => {
        console.log(createUsers.id)
        console.log('it works')
        cache.writeData({data:{userId: createUsers.id}})
      }}>
        {(createUsers, { data }) => (
          <div>
            <Modal
              onClose={this.props.closePopup}
              open={this.props.open}
              size="tiny"
            >
              <Header style={{ textAlign: 'center' }}>Sign Up</Header>
              <div style={{ textAlign: 'center' }}>
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
                  onClick={ async () => {
                    let temp = await this.props.createWithEmail()
                    
                    let {data} = await createUsers({
                      variables: {
                        username: this.props.email,
                        password: this.props.password,
                        firebaseId: temp
                      }
                    }, "{id}")

                    // client.writeData({data: {userId: }})
                    //why does this work???
                    this.props.openOnboarding()
                  }}
                />
                <br />
                <br />
                <p>Or Sign Up With Google/Facebook</p>
                <a>
                  <i
                    className="google plus square icon huge"
                    onClick={ async () => {
                      await this.props.loginWithGoogle()

                      await createUsers({
                        variables: {
                          firebaseId: this.props.userId
                        }},"{id}")

                      this.props.openOnboarding()
                    }}
                  />
                </a>
                <a>
                  <i
                    className="facebook square icon huge"
                    onClick={ async () => {
                      await this.props.loginWithFacebook()

                      await createUsers({
                        variables: {
                          firebaseId: this.props.userId
                        }
                      })

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
  }
}

export default Register
