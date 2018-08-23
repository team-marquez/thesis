import React from 'react'
import moment from 'moment'
import { Slider } from 'react-semantic-ui-range'
import {
  Modal,
  Input,
  Label,
  Checkbox,
  Button,
  Icon
} from 'semantic-ui-react'
import { format, addDays } from 'date-fns'
import { DateRange } from 'react-date-range'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { ApolloConsumer } from 'react-apollo'

let PREF_QUERY = gql`
  query PREF_QUERY($pref: Pref) {
    userPrefs(pref: $pref)
  }
`

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf())
  date.setDate(date.getDate() + days)
  return date
}

class UserPreferences extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bright: 'brightness(100%)',
      f_a: 50,
      i_o: 50,
      l_t: 50,
      NSFW: false,
      party_size: 1,
      budget: 0,
      tripDates: null,
      maxDate: null
    }
    this.mouseEnter = this.mouseEnter.bind(this)
    this.mouseExit = this.mouseExit.bind(this)
  }

  // Mouse enter event to the make the brightness higher on the location we are selecting.
  mouseEnter() {
    this.setState({
      bright: 'brightness(125%)'
    })
  }

  // Mouse exit event to return the brightness back to original when not on the location.
  mouseExit() {
    this.setState({
      bright: 'brightness(100%)'
    })
  }

  render() {
    const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
    return (
      <ApolloConsumer>
        {client => (
          <div>
            <Modal
              size={'mini'}
              trigger={
                <Button basic color='white' animated="fade" onClick={this.pickTrip}>
                  <Button.Content visible>Take us away</Button.Content>
                  <Button.Content hidden>
                    <Icon name="plane" />
                  </Button.Content>
                </Button>
              }
            >
              <Modal.Header style={{ textAlign: 'center' }}>
                Set Your Preferences
              </Modal.Header>
              <Modal.Content>
                <div style={{ textAlign: 'center' }}>
                  <DateRange
                    maxDate={moment(this.state.maxDate)}
                    onChange={changes => {
                      this.setState({
                        maxDate: changes.startDate._d.addDays(3),
                        tripDates: changes
                      })
                    }}
                    calendars={1}
                  />
                </div>
                <br />
                <div style={{ textAlign: 'center' }}>
                  <Input
                    labelPosition="right"
                    type="number"
                    placeholder="Budget"
                    onChange={e =>
                      this.setState({
                        budget: e.target.value
                      })
                    }
                  >
                    <Label basic>$</Label>
                    <input />
                    <Label>.00</Label>
                  </Input>
                  <br />
                </div>
                <br />
                <Modal.Description>
                  <div style={{ float: 'right', display: 'inline-block' }}>
                    {'Activities' + ` ${this.state.f_a}%`}
                  </div>
                  <div style={{ textAlign: 'left', display: 'inline-block' }}>
                    {'Food' + ` ${100 - this.state.f_a}%`}
                  </div>
                  <Slider
                    value={this.state.f_a}
                    color="purple"
                    inverted={false}
                    settings={{
                      start: 50,
                      min: 0,
                      max: 100,
                      step: 1,
                      onChange: value => {
                        this.setState({
                          f_a: value
                        })
                      }
                    }}
                  />
                  <div style={{ float: 'right', display: 'inline-block' }}>
                    {'Outdoors' + ` ${this.state.i_o}%`}
                  </div>
                  <div style={{ textAlign: 'left', display: 'inline-block' }}>
                    {'Indoors' + ` ${100 - this.state.i_o}%`}
                  </div>
                  <Slider
                    value={this.state.i_o}
                    color="pink"
                    inverted={false}
                    settings={{
                      start: 50,
                      min: 0,
                      max: 100,
                      step: 1,
                      onChange: value => {
                        this.setState({
                          i_o: value
                        })
                      }
                    }}
                  />
                  <div style={{ float: 'right', display: 'inline-block' }}>
                    {'Touristy' + ` ${this.state.l_t}%`}
                  </div>
                  <div style={{ textAlign: 'left', display: 'inline-block' }}>
                    {'Local' + ` ${100 - this.state.l_t}%`}
                  </div>
                  <Slider
                    value={this.state.l_t}
                    color="green"
                    inverted={false}
                    settings={{
                      start: 50,
                      min: 0,
                      max: 100,
                      step: 1,
                      onChange: value => {
                        this.setState({
                          l_t: value
                        })
                      }
                    }}
                  />{' '}
                  <br />
                  <div style={{ display: 'inline-block', marginRight: '95px' }}>
                    <Input
                      icon="users"
                      size="mini"
                      iconPosition="left"
                      type="number"
                      placeholder="Party size"
                      style={{ width: '100px', textAlign: 'right' }}
                      onChange={e =>
                        this.setState({
                          party_size: e.target.value
                        })
                      }
                    />
                  </div>
                  <div style={{ display: 'inline-block' }}>
                    <Checkbox
                      label="Family Friendly"
                      onChange={() => this.setState({ NSFW: !this.state.NSFW })}
                    />
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <br />
                    <Button
                      content="Next"
                      icon="right arrow"
                      labelPosition="right"
                      onClick={async () => {
                        const { data } = await client.query({
                          query: PREF_QUERY,
                          variables: {
                            pref: {
                              totalBudget: this.state.budget,
                              partySize: this.state.party_size,
                              tripDates: {
                                startDate: this.state.tripDates.startDate,
                                endDate: this.state.tripDates.endDate._d.addDays(
                                  -1
                                )
                              },
                              LT: this.state.l_t,
                              IO: this.state.i_o,
                              FA: this.state.f_a,
                              kidFriendly: this.state.NSFW
                            }
                          }
                        })
                        client.writeData({ data })
                        let itin = JSON.parse(data.userPrefs)
                        client.writeData({
                          data: { itinerary: JSON.stringify(itin.itinerary) }
                        })
                        this.props.pickTrip()
                      }}
                    />
                  </div>
                </Modal.Description>
              </Modal.Content>
            </Modal>
          </div>
        )}
      </ApolloConsumer>
    )
  }
}

export default UserPreferences
