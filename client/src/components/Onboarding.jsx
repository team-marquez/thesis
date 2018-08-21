import React from 'react'
import  { Button, Modal, Header } from 'semantic-ui-react'
const { onboardingActivities } = require('./helpers/onboardingActivities.js')

class Onboarding extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            onboardingArray: []
        }
        this.fillOnboardingArray = this.fillOnboardingArray.bind(this)
    }

    componentWillMount() {
      this.fillOnboardingArray()
    }

    fillOnboardingArray() {
      let chosenIndicies = {};
      let randomizedActivities = []
      while (randomizedActivities.length < 6) {
        let ind = Math.floor(Math.random() * 6)
        if (chosenIndicies.hasOwnProperty(ind.toString())) continue
        randomizedActivities.push([onboardingActivities.indoor[ind], onboardingActivities.outdoor[ind]])
      }
      this.setState({onboardingArray: randomizedActivities})
    }
    
    render() {
      return (
        <div>
          <Modal size = {'fullscreen'} trigger= {<Button>Display Onboarding</Button>} >
            <Header content={`Welcome to Let's Go To!`} />
            <Modal.Content>
              <p>
                In order to make sure you get a personalized trip that suits you best, we need to know a little bit more about you!
              </p>
              <p>
                You'll be presented with a series of activities.  All you need to do is tell us which one you prefer.
              </p>
              <p>
                To get started, just press Next!
              </p>
            </Modal.Content>
          </Modal>
        </div>
      )
    }
    
  }
  
  export default Onboarding