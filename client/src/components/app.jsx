import React from 'react'

import LoginButton from './LoginButton.jsx'
import LocationModal from './LocationModal.jsx'
import Footer from './Footer.jsx'
import Kamban from './Kamban.jsx'

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
          <div>
            <Kamban/>
          </div>
        )}
      </div>
    )
  }
}

export default App
