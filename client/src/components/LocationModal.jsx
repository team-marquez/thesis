import React from "react";
import moment from 'moment';
import { Slider } from "react-semantic-ui-range";
import {
  Grid,
  Modal,
  Input,
  Label,
  Checkbox,
  Button,
  Image
} from "semantic-ui-react";
import { format, addDays } from "date-fns";
import { DateRange } from "react-date-range";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { ApolloConsumer } from 'react-apollo';


let PREF_QUERY = gql`
  query PrefQuery($args: String!){
    echo(args: $args)
  }
`;

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

class LocationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bright: "brightness(100%)",
      f_a: 50,
      i_o: 50,
      l_t: 50,
      NSFW: false,
      party_size: 1,
      budget: 0,
      tripDates: null,
      maxDate: null,
    };
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseExit = this.mouseExit.bind(this);
  }

  handleSelect(ranges){
		console.log(ranges);
	}

  mouseEnter() {
    this.setState({
      bright: "brightness(125%)"
    });
  }

  mouseExit() {
    this.setState({
      bright: "brightness(100%)"
    });
  }

  render() {

    const selectionRange = {
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection',
		}
    return (
      <ApolloConsumer>
      {(client) => { return (
      <div className="locationOptions" style={{ width: "100%" }}>
        <Grid>
          <Grid.Row centered columns={2}>
            <Grid.Column>
              <Modal
                size={"mini"}
                trigger={
                  <Image
                    src="https://drscdn.500px.org/photo/119659039/m%3D900/v2?webp=true&sig=f0973f50f2fc640b2c6a13491efb40365c11c425b81b6dc05f7dbe9bf15c0d87"
                    onMouseEnter={this.mouseEnter}
                    onMouseLeave={this.mouseExit}
                    style={{
                      marginLeft: "10px",
                      marginBottom: "10px",
                      filter: this.state.bright
                    }}
                  />
                }
              >
                <Modal.Header style={{ textAlign: "center" }}>
                  Set Your Preferences
                </Modal.Header>
                <Modal.Content>
                  <div style={{ textAlign: "center" }}>
                    <DateRange
                      maxDate={moment(this.state.maxDate)}
                      onChange={(changes) =>{
                      console.log(moment(changes.startDate._d.addDays(4)))
                      this.setState({
                        maxDate: changes.startDate._d.addDays(4),
                        tripDates: changes
                      })}}
                      calendars={1}
                    />
                  </div>
                  <br/>
                  <div style={{ textAlign: "center" }}>
                    <Input
                      labelPosition="right"
                      type="number"
                      placeholder="Budget"
                      onChange={(e) => this.setState({
                        budget: e.target.value
                      }) }
                    >
                      <Label basic>$</Label>
                      <input />
                      <Label>.00</Label>
                    </Input>
                    <br />
                  </div>
                  <br/>


                  <Modal.Description>
                    <div style={{ float: "right", display: "inline-block" }}>
                      {"Activities" + ` ${this.state.f_a}%`}
                    </div>
                    <div style={{ textAlign: "left", display: "inline-block" }}>
                      {"Food" + ` ${100 - this.state.f_a}%`}
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
                          });
                        }
                      }}
                    />
                    <div style={{ float: "right", display: "inline-block" }}>
                      {"Outdoors" + ` ${this.state.i_o}%`}
                    </div>
                    <div style={{ textAlign: "left", display: "inline-block" }}>
                      {"Indoors" + ` ${100 - this.state.i_o}%`}
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
                          });
                        }
                      }}
                    />
                    <div style={{ float: "right", display: "inline-block" }}>
                      {"Touristy" + ` ${this.state.l_t}%`}
                    </div>
                    <div style={{ textAlign: "left", display: "inline-block" }}>
                      {"Local" + ` ${100 - this.state.l_t}%`}
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
                          });
                        }
                      }}
                    />{" "}
                    <br />
                    <div
                      style={{ display: "inline-block", marginRight: "95px" }}
                    >
                      <Input
                        icon="users"
                        size="mini"
                        iconPosition="left"
                        type="number"
                        placeholder="Party size"
                        style={{ width: "100px", textAlign: "right" }}
                        onChange={(e) => this.setState({
                          party_size: e.target.value
                        })}
                      />
                    </div>
                    <div style={{ display: "inline-block" }}>
                      <Checkbox label="Family Friendly" onChange={() => this.setState({NSFW: !this.state.NSFW})} />
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <br />
                      <Button
                        content="Next"
                        icon="right arrow"
                        labelPosition="right"
                        onClick={async () => {
                          const { data } = await client.query({
                            query: PREF_QUERY,
                            variables: { args: JSON.stringify({
                              totalBudget: this.state.budget,
                              partySize: this.state.party_size,
                              tripDates: this.state.tripDates,
                              LT: this.state.l_t,
                              IO: this.state.i_o,
                              FA: this.state.f_a,
                              kidFriendly: this.state.NSFW
                            })}
                          })
                          client.writeData({data})          
                          this.props.pickTrip()
                        }}
                      />
                    </div>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
            </Grid.Column>
            <Grid.Column>
              <Image
                src="https://drscdn.500px.org/photo/92890847/m%3D900/v2?webp=true&sig=51138635394c2a7a8a38178eb09e2fb88cd0bebcbcd90ad84f1d3265b8b00e22"
                style={{
                  marginBottom: "10px",
                  marginLeft: "-10px",
                  opacity: "0.8",
                  filter: "grayscale(100%)"
                }}
              />
            </Grid.Column>
            <Grid.Column>
              <Image
                src="https://drscdn.500px.org/photo/3236342/m%3D900/v2?webp=true&sig=9c44f7758ff90da55d211411839b469f3d2e4652ade16897dbe76fd3a911411a"
                style={{
                  marginLeft: "10px",
                  opacity: "0.8",
                  filter: "grayscale(100%)"
                }}
              />
            </Grid.Column>
            <Grid.Column>
              <Image
                src="https://drscdn.500px.org/photo/52784332/m=900/9831e3f3de4586bd113ab838ce2aaeb7"
                style={{
                  marginLeft: "-10px",
                  opacity: "0.8",
                  filter: "grayscale(100%)"
                }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>)}}
      </ApolloConsumer>
    );
  }
}

export default LocationModal;
