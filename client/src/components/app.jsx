import React from 'react'

import LoginButton from './LoginButton.jsx'
import LocationModal from './LocationModal.jsx'
import Footer from './Footer.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <div>
        <LoginButton/>
        <LocationModal/>
        <Footer/>
      </div>
    )
  }
}

export default App
