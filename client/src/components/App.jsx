import React from 'react'

import LoginButton from './LoginButton.jsx'
import LocationModal from './LocationModal.jsx'
import Footer from './Footer.jsx'
import Kamban from './Kamban.jsx'

import { Query } from "react-apollo";
import { ApolloProvider } from "react-apollo";
import { Mutation } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pickedTrip: false
    }
    this.pickTrip = this.pickTrip.bind(this)
  }

  pickTrip () {
    this.setState({
      pickedTrip: !this.state.pickedTrip
    })
  }

  render () {
    return (
      <div>
        {this.state.pickedTrip === false ? (
          <div>
            <LoginButton/>
            <LocationModal pickTrip={this.pickTrip}/>
            <Footer/>
          </div>
        ) : (
          <div style={{textAlign: 'center'}}>
            <Kamban/>
          </div>
        )}
      </div>

    )
  }
}

export default App
