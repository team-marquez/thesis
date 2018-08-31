import React from "react"
import { Button, Header, Segment, Rating } from "semantic-ui-react"
import client from "../index.jsx"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import jsPDF from "jspdf"

let USER_TRIPS = gql`
  query userTrips($id: String) {
    userTrips(id: $id) {
      past {
        trips
      }
    }
  }
`

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trip: "current",
      pastTrips: [
      ],
      image: null,
      userId: null
    }
    this.downloadPDF = this.downloadPDF.bind(this)
  }
  componentWillMount() {
    client
      .query({
        query: gql`
          {
            image @client
          }
        `
      })
      .then(({ data }) => this.setState({ image: data.image }))
    if (this.state.userId === null) {
      client
        .query({
          query: gql`
            {
              userId @client
            }
          `
        })
        .then(({ data }) => {
          let { userId } = data
          console.log("userid gotten")
          this.setState({ userId: userId })
          return userId
        })
        .then(userId => {
          client
            .query({ query: USER_TRIPS, variables: { id: userId } })
            .then(({ data }) =>{
              let array = []
              data.userTrips.past.filter(elem => {
                if (typeof elem.trips[0].image === 'string') {
                  array.push(elem.trips[0].image)
                }
              })

              this.setState({
                pastTrips: array
              })}
            )
        })
    }
  }

  downloadPDF() {
    let pdf = new jsPDF("l", "mm", "a4")
    let img = new Image()
    img.onload = function() {
      pdf.addImage(this, "JPEG", 0, 0, 300, 200)
      pdf.save("current-trip.pdf")
    }
    img.crossOrigin = ""
    img.src = this.state.image
  }

  render() {
    return (
      <Query query={USER_TRIPS} variables={{ id: this.state.userId }}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <img src="https://zippy.gfycat.com/AggravatingRemarkableEmperorshrimp.gif" />
            )
          else if (error) return <p>error</p>
          else {
            return (
              <div>
                <div>
                  <div>
                    <Segment
                      clearing
                      style={{
                        backgroundImage: "linear-gradient(lightCyan, white)"
                      }}
                    >
                      <Header as="h2" icon="user circle" floated="right" />
                    </Segment>
                  </div>
                  {this.props.trip === "current" ? (
                    <Segment basic>
                      <Header className="centerUserPro" as="h3">
                        Current Trip
                      </Header>
                      <div className="userProBox">
                        <img
                          src={this.state.image}
                          style={{ width: "100%" }}
                          alt="Current Trip"
                        />
                        <br />
                      </div>
                      <Button
                        onClick={this.downloadPDF}
                        content="Download"
                        basic
                        color="olive"
                        icon="download"
                        labelPosition="left"
                        style={{ display: "inherit", margin: "5px auto 0px" }}
                      />
                    </Segment>
                  ) : (
                    <div>
                      <Segment basic>
                        <Header className="centerUserPro" as="h3">
                          Past Trips
                        </Header>
                      </Segment>

                      {this.state.pastTrips.map((trip, index) => {
                        return (
                          <Segment basic>
                            <div className="pastTripBox">
                              <div><img src={trip}></img></div>
                              <Rating
                                icon="heart"
                                defaultRating={3}
                                maxRating={5}
                                size="large"
                              />
                            </div>
                            <hr />
                          </Segment>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            )
          }
        }}
      </Query>
    )
  }
}

export default UserProfile
