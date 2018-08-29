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

import { Link } from 'react-router-dom'

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
      maxDate: null,
      modal: false
    }
    this.handleModal = this.handleModal.bind(this)
  }

  handleModal() {
    this.setState({
      modal: !this.state.modal
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
                <Button disabled={this.props.able} animated="fade" onClick={this.handleModal}>
                  <Button.Content visible>Take us away</Button.Content>
                  <Button.Content hidden>
                    <Icon name="plane" />
                  </Button.Content>
                </Button>
              }
            >
              <Modal.Header className='centerPrefs'>
                Set Your Preferences
              </Modal.Header>
              <Modal.Content>
                <div className='centerPrefs'>
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
                <div className='centerPrefs'>
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
                  <div className='sliderRight'>
                    {'Activities' + ` ${this.state.f_a}%`}
                  </div>
                  <div className='sliderLeft'>
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
                  <div className='sliderRight'>
                    {'Outdoors' + ` ${this.state.i_o}%`}
                  </div>
                  <div className='sliderLeft'>
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
                  <div className='sliderRight'>
                    {'Touristy' + ` ${this.state.l_t}%`}
                  </div>
                  <div className='sliderLeft'>
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
                  <div className='party'>
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
                  <div className='nsfw'>
                    <Checkbox
                      label="Family Friendly"
                      onChange={() => this.setState({ NSFW: !this.state.NSFW })}
                    />
                  </div>
                  <div className='nextButton'>
                    <br />
                    <Link to='/trip'>
                    <Button
                      content="Next"
                      icon="right arrow"
                      labelPosition="right"
                      onClick={async () => {
                        let whatever = await client.query({query: gql`
                        {
                          userId @client
                        }
                        `});
                        const {userId} = whatever.data;
                        let { data } = await client.query({
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
                              kidFriendly: this.state.NSFW,
                              userId: userId
                            }
                          }
                        })
                        client.writeData({ data })
                        let itin = JSON.parse(data.userPrefs)

                        client.writeData({
                          data: { itinerary: itin.itinerary }
                        })

                        console.log('Data', itin)

                        this.handleModal()
                      }}
                    />
                    </Link>
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
