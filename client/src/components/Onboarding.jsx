import React from 'react'
import  { Button, Modal, Header, Icon } from 'semantic-ui-react'
const { onboardingActivities } = require('./helpers/onboardingActivities.js')

class Onboarding extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            onboardingArray: [],
            open: false,
            showFirst: false,
            showSecond: false,
            showThird: false,
            showFourth: false,
            showFifth: false,
            showSixth: false
        }
        this.fillOnboardingArray = this.fillOnboardingArray.bind(this)
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
        this.showFirst = this.showFirst.bind(this)
        this.showSecond = this.showSecond.bind(this)
        this.showThird = this.showThird.bind(this)
        this.showFourth = this.showFourth.bind(this)
        this.showFifth = this.showFifth.bind(this)
        this.showSixth = this.showSixth.bind(this)
        this.submitAnswers = this.submitAnswers.bind(this)
    }
    componentWillMount() {
      this.fillOnboardingArray()
    }

    open(){ this.setState({ open: true }) }
    close() { this.setState({ open: false }, this.showFirst()) }

    showFirst() {this.setState({ showFirst: true})}
    showSecond() {this.setState({ showFirst: false, showSecond: true})}
    showThird() {this.setState({ showSecond: false, showThird: true})}
    showFourth() {this.setState({ showThird: false, showFourth: true})}
    showFifth() {this.setState({ showFourth: false, showFifth: true})}
    showSixth() {this.setState({ showFifth: false, showSixth: true})}
    submitAnswers() {
      this.setState({ showSixth: false})
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
      const { open } = this.state
      return (
        <div>
          <Modal open={open} size = {'fullscreen'} trigger= {<Button onClick = {this.open} >Display Onboarding</Button>} >
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
            <Modal.Actions>
              <Button onClick={this.close} >
                Next <Icon name='right chevron'/>
              </Button>
            </Modal.Actions>
          </Modal>

          <Modal open = {this.state.showFirst}>
            <Modal.Content>
              here i am to save the daaaaaay!
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.showSecond} >
                Next <Icon name='right chevron'/>
              </Button>
            </Modal.Actions>
          </Modal>

          <Modal open = {this.state.showSecond}>
            <Modal.Content>
              data number 2
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.showThird} >
                Next <Icon name='right chevron'/>
              </Button>
            </Modal.Actions>
          </Modal>

          <Modal open = {this.state.showThird}>
            <Modal.Content>
              data number threeeee
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.showFourth} >
                Next <Icon name='right chevron'/>
              </Button>
            </Modal.Actions>
          </Modal>

          <Modal open = {this.state.showFourth}>
            <Modal.Content>
              44444
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.showFifth} >
                Next <Icon name='right chevron'/>
              </Button>
            </Modal.Actions>
          </Modal>

          <Modal open = {this.state.showFifth}>
            <Modal.Content>
              5 5 5 5 5 5
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.showSixth} >
                Next <Icon name='right chevron'/>
              </Button>
            </Modal.Actions>
          </Modal>

          <Modal open = {this.state.showSixth}>
            <Modal.Content>
              666 is evil!
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.submitAnswers} >
              <Icon name='checkmark'/>   Thank You! 
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      )
    }
    
  }
  
  export default Onboarding