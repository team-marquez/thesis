import React from 'react'
import  { Button, Modal, Header, Icon } from 'semantic-ui-react'
import OnboardingOptions from './OnboardingOptions.jsx'
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
            showSixth: false,
            showClosing: false,
            selectedOption: {},
            chosenActivities: []
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
        this.closeSixth = this.closeSixth.bind(this)
        this.handleOptionSelect = this.handleOptionSelect.bind(this)
        this.saveSelected = this.saveSelected.bind(this)
    }
    componentWillMount() {
      this.fillOnboardingArray()
    }

    open(){ this.setState({ open: true }) }
    close() { this.setState({ open: false }, this.showFirst()) }

    saveSelected() {
      let arr = this.state.chosenActivities.slice()
      arr.push(this.state.selectedOption)
      this.setState({selectedOption: {}, chosenActivities: arr})
    }

    showFirst() {this.setState({ showFirst: true})}
    showSecond() {this.setState({ showFirst: false, showSecond: true}, this.saveSelected())}
    showThird() {this.setState({ showSecond: false, showThird: true}, this.saveSelected())}
    showFourth() {this.setState({ showThird: false, showFourth: true}, this.saveSelected())}
    showFifth() {this.setState({ showFourth: false, showFifth: true}, this.saveSelected())}
    showSixth() {this.setState({ showFifth: false, showSixth: true}, this.saveSelected())}
    closeSixth() {this.setState({ showSixth: false, showClosing: true}, this.saveSelected())}
    submitAnswers() {
      this.setState({ showClosing: false})
    }


    fillOnboardingArray() {
      let chosenIndicies = {};
      let randomizedActivities = []
      while (randomizedActivities.length < 6) {
        let ind = Math.round(Math.random() * 5)
        if (chosenIndicies.hasOwnProperty(ind.toString())) continue
        randomizedActivities.push([onboardingActivities.indoor[ind], onboardingActivities.outdoor[ind]])
        chosenIndicies[ind] = null
      }
      this.setState({onboardingArray: randomizedActivities})
    }

    handleOptionSelect(option) {
      this.setState({selectedOption: option})
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
              <Button primary onClick={this.close} >
                Next <Icon name='right chevron'/>
              </Button>
            </Modal.Actions>
          </Modal>

          <Modal open = {this.state.showFirst}>
            <Modal.Content>
              <OnboardingOptions indoor={this.state.onboardingArray[0][0]}
                outdoor = {this.state.onboardingArray[0][1]} 
                selectOption = {this.handleOptionSelect}/>
            </Modal.Content>
            <Modal.Actions>
              <Button color='green' onClick={this.showSecond} >
                Next <Icon name='right chevron'/>
              </Button>
            </Modal.Actions>
          </Modal>

          <Modal open = {this.state.showSecond}>
            <Modal.Content>
              <OnboardingOptions indoor={this.state.onboardingArray[1][0]}
                outdoor = {this.state.onboardingArray[1][1]} 
                selectOption = {this.handleOptionSelect}/>
            </Modal.Content>
            <Modal.Actions>
              <Button color='green' onClick={this.showThird} >
                Next <Icon name='right chevron'/>
              </Button>
            </Modal.Actions>
          </Modal>

          <Modal open = {this.state.showThird}>
            <Modal.Content>
              <OnboardingOptions indoor={this.state.onboardingArray[2][0]}
                outdoor = {this.state.onboardingArray[2][1]} 
                selectOption = {this.handleOptionSelect}/>
            </Modal.Content>
            <Modal.Actions>
              <Button color='green' onClick={this.showFourth} >
                Next <Icon name='right chevron'/>
              </Button>
            </Modal.Actions>
          </Modal>

          <Modal open = {this.state.showFourth}>
            <Modal.Content>
              <OnboardingOptions indoor={this.state.onboardingArray[3][0]}
                outdoor = {this.state.onboardingArray[3][1]} 
                selectOption = {this.handleOptionSelect}/>
            </Modal.Content>
            <Modal.Actions>
              <Button color='green' onClick={this.showFifth} >
                Next <Icon name='right chevron'/>
              </Button>
            </Modal.Actions>
          </Modal>

          <Modal open = {this.state.showFifth}>
            <Modal.Content>
              <OnboardingOptions indoor={this.state.onboardingArray[4][0]}
                outdoor = {this.state.onboardingArray[4][1]} 
                selectOption = {this.handleOptionSelect}/>
            </Modal.Content>
            <Modal.Actions>
              <Button color='green' onClick={this.showSixth} >
                Next <Icon name='right chevron'/>
              </Button>
            </Modal.Actions>
          </Modal>

          <Modal open = {this.state.showSixth}>
            <Modal.Content>
              <OnboardingOptions indoor={this.state.onboardingArray[5][0]}
                outdoor = {this.state.onboardingArray[5][1]} 
                selectOption = {this.handleOptionSelect}/>
            </Modal.Content>
            <Modal.Actions>
              <Button primary onClick={this.closeSixth} >
                Thats It <Icon name='right chevron'/>
              </Button>
            </Modal.Actions>
          </Modal>

          <Modal open = {this.state.showClosing}>
            <Modal.Content>
              <p>Thank you for taking the time to give us that information.</p>

              <p>Please select the city  you would Like To Go To!</p>
            </Modal.Content>
            <Modal.Actions>
              <Button primary onClick={this.submitAnswers} >
              <Icon name='checkmark'/>   Lets Travel! 
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      )
    }
    
  }
  
  export default Onboarding