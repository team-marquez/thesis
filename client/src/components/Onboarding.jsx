import React from 'react'
import { Button, Modal, Header, Icon, Progress } from 'semantic-ui-react'
import OnboardingOptions from './OnboardingOptions.jsx'

const { onboardingActivities } = require('./helpers/onboardingActivities.js')

import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const ProgressBar = () => {
  ;<Progress value="2" total="6" progress="ratio" indicating />
}

const UPDATE_USERS = gql`
  mutation UpdateUsers($id: String!, $trips: Json!) {
    updateUsers(id: $id, trips: $trips) {
      id
    }
  }
`

class Onboarding extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      onboardingArray: [],
      showFirst: false,
      showSecond: false,
      showThird: false,
      showFourth: false,
      showFifth: false,
      showSixth: false,
      showClosing: false,
      selectedOption: {},
      chosenActivities: [],
      progress: 0,
      optionSelected: false
    }
    this.fillOnboardingArray = this.fillOnboardingArray.bind(this)
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

  open() {
    this.setState({ open: true })
  }
  close() {
    this.setState({ open: false }, this.showFirst())
  }

  saveSelected() {
    let arr = this.state.chosenActivities
    arr.push({ id: this.state.selectedOption.id })
    this.setState({ selectedOption: {}, chosenActivities: arr })
  }

  showFirst() {
    this.setState({ showFirst: true })
  }
  showSecond() {
    this.setState({ showFirst: false, showSecond: true, optionSelected: false }, this.saveSelected())
  }
  showThird() {
    this.setState({ showSecond: false, showThird: true, optionSelected: false }, this.saveSelected())
  }
  showFourth() {
    this.setState({ showThird: false, showFourth: true, optionSelected: false }, this.saveSelected())
  }
  showFifth() {
    this.setState({ showFourth: false, showFifth: true, optionSelected: false }, this.saveSelected())
  }
  showSixth() {
    this.setState({ showFifth: false, showSixth: true, optionSelected: false }, this.saveSelected())
  }
  closeSixth() {
    this.setState({ showSixth: false, showClosing: true, optionSelected: false }, this.saveSelected())
  }
  submitAnswers() {
    this.setState({ showClosing: false })

    let cats = []
    for (let i = 0; i < this.state.chosenActivities.length; i++) {
      let current = this.state.chosenActivities[i].id
      cats.push(current)
    }
  }

  fillOnboardingArray() {
    let chosenIndicies = {}
    let randomizedActivities = []
    while (randomizedActivities.length < 6) {
      let ind = Math.round(Math.random() * 5)
      if (chosenIndicies.hasOwnProperty(ind.toString())) continue
      randomizedActivities.push([
        onboardingActivities.indoor[ind],
        onboardingActivities.outdoor[ind]
      ])
      chosenIndicies[ind] = null
    }
    this.setState({ onboardingArray: randomizedActivities })
  }

  handleOptionSelect(option) {
    if (this.state.optionSelected) {
      this.setState({ selectedOption: option })
    } else {
      let oldProgress = this.state.progress
      this.setState({progress: ++oldProgress, selectedOption: option, optionSelected: true})
    }
  }

  render() {
    const { open } = this.props
    return (
      <Mutation mutation={UPDATE_USERS}>
        {(updateUsers, { data }) => (
          <div>
            <Modal open={open} size={'tiny'}>
              <Header
                style={{ textAlign: 'center' }}
                content={`Welcome to Let's Go To!`}
              />
              <Modal.Content style={{ fontSize: '18px' }}>
                <p>
                  In order to make sure you get a personalized trip that suits
                  you best, we need to know a little bit more about you!
                </p>
                <p>
                  You'll be presented with a series of activities. All you need
                  to do is tell us which one you prefer.
                </p>
                <p>
                  To get started, just press <em>Next</em>!
                </p>
              </Modal.Content>
              <Modal.Actions style={{ textAlign: 'center' }}>
                <Button
                  primary
                  className="onboardingButton"
                  onClick={() => {
                    this.props.closer()
                    this.showFirst()
                  }}
                >
                  Next <Icon name="right chevron" />
                </Button>
              </Modal.Actions>
            </Modal>

            <Modal open={this.state.showFirst}>
              <Modal.Content>
                <Progress value={this.state.progress.toString()} total="6" progress="ratio" indicating />
                <OnboardingOptions
                  indoor={this.state.onboardingArray[0][0]}
                  outdoor={this.state.onboardingArray[0][1]}
                  selectOption={this.handleOptionSelect}
                />
              </Modal.Content>
              <Modal.Actions style={{ textAlign: 'center' }}>
                <Button
                  color="green"
                  onClick={this.showSecond}
                  className="onboardingButton"
                  disabled = {this.state.optionSelected ? false : true}
                  >
                  Next <Icon name="right chevron" />
                </Button>
              </Modal.Actions>
            </Modal>

            <Modal open={this.state.showSecond}>
              <Modal.Content>
                <Progress value={this.state.progress.toString()} total="6" progress="ratio" indicating />
                <OnboardingOptions
                  indoor={this.state.onboardingArray[1][0]}
                  outdoor={this.state.onboardingArray[1][1]}
                  selectOption={this.handleOptionSelect}
                  />
              </Modal.Content>
              <Modal.Actions style={{ textAlign: 'center' }}>
                <Button
                  color="green"
                  onClick={this.showThird}
                  className="onboardingButton"
                  disabled = {this.state.optionSelected ? false : true}
                  >
                  Next <Icon name="right chevron" />
                </Button>
              </Modal.Actions>
            </Modal>

            <Modal open={this.state.showThird}>
              <Modal.Content>
                <Progress value={this.state.progress.toString()} total="6" progress="ratio" indicating />
                <OnboardingOptions
                  indoor={this.state.onboardingArray[2][0]}
                  outdoor={this.state.onboardingArray[2][1]}
                  selectOption={this.handleOptionSelect}
                  />
              </Modal.Content>
              <Modal.Actions style={{ textAlign: 'center' }}>
                <Button
                  color="green"
                  onClick={this.showFourth}
                  className="onboardingButton"
                  disabled = {this.state.optionSelected ? false : true}
                  >
                  Next <Icon name="right chevron" />
                </Button>
              </Modal.Actions>
            </Modal>

            <Modal open={this.state.showFourth}>
              <Modal.Content>
                <Progress value={this.state.progress.toString()} total="6" progress="ratio" indicating />
                <OnboardingOptions
                  indoor={this.state.onboardingArray[3][0]}
                  outdoor={this.state.onboardingArray[3][1]}
                  selectOption={this.handleOptionSelect}
                  />
              </Modal.Content>
              <Modal.Actions style={{ textAlign: 'center' }}>
                <Button
                  color="green"
                  onClick={this.showFifth}
                  className="onboardingButton"
                  disabled = {this.state.optionSelected ? false : true}
                  >
                  Next <Icon name="right chevron" />
                </Button>
              </Modal.Actions>
            </Modal>

            <Modal open={this.state.showFifth}>
              <Modal.Content>
                <Progress value={this.state.progress.toString()} total="6" progress="ratio" indicating />
                <OnboardingOptions
                  indoor={this.state.onboardingArray[4][0]}
                  outdoor={this.state.onboardingArray[4][1]}
                  selectOption={this.handleOptionSelect}
                  />
              </Modal.Content>
              <Modal.Actions style={{ textAlign: 'center' }}>
                <Button
                  color="green"
                  onClick={this.showSixth}
                  className="onboardingButton"
                  disabled = {this.state.optionSelected ? false : true}
                  >
                  Next <Icon name="right chevron" />
                </Button>
              </Modal.Actions>
            </Modal>

            <Modal open={this.state.showSixth}>
              <Modal.Content>
                <Progress value={this.state.progress.toString()} total="6" progress="ratio" indicating />
                <OnboardingOptions
                  indoor={this.state.onboardingArray[5][0]}
                  outdoor={this.state.onboardingArray[5][1]}
                  selectOption={this.handleOptionSelect}
                  />
              </Modal.Content>
              <Modal.Actions style={{ textAlign: 'center' }}>
                <Button
                  color="green"
                  onClick={this.closeSixth}
                  className="onboardingButton"
                  disabled = {this.state.optionSelected ? false : true}
                  >
                  Thats It <Icon name="right chevron" />
                </Button>
              </Modal.Actions>
            </Modal>

            <Modal open={this.state.showClosing} size={'tiny'}>
              <Modal.Content style={{ fontSize: '18px' }}>
                <p>
                  Thank you for taking the time to give us that information.
                </p>

                <p>Please select the city you would Like To Go To!</p>
              </Modal.Content>
              <Modal.Actions style={{ textAlign: 'center' }}>
                <Button
                  primary
                  onClick={e => {
                    e.preventDefault()
                    updateUsers({
                      variables: {
                        id: this.props.userId,
                        trips: this.state.chosenActivities
                      }
                    })
                    this.submitAnswers()
                  }}
                  className="onboardingButton"
                >
                  <Icon name="checkmark" /> Lets Travel!
                </Button>
              </Modal.Actions>
            </Modal>
          </div>
        )}
      </Mutation>
    )
  }
}

export default Onboarding
