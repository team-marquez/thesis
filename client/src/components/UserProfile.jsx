import React from "react"
import {
  Button,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  Rating
} from "semantic-ui-react"
import client from "../index.jsx"
import gql from "graphql-tag"
class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trip: "current",
      pastTrips: [
        { img: "https://i.imgur.com/SDrLtgc.jpg", rating: 4 },
        { img: "https://i.imgur.com/L9ov00i.jpg", rating: 3 },
        { img: "https://i.imgur.com/z6GNhq3.jpg", rating: 5 }
			],
			image: null,
    }
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleSidebarHide = this.handleSidebarHide.bind(this)
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
      .then(({data}) => this.setState({image: data.image}))
  }

  handleButtonClick() {
    this.setState({
      visible: !this.state.visible
    })
  }

  handleSidebarHide() {
    this.setState({
      visible: false
    })
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <Segment
              clearing
              style={{ backgroundImage: "linear-gradient(lightCyan, white)" }}
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
							<Image
                        size="large"
                        src={this.state.image}
                      />
                <br />
              </div>
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
                      <div>
                        <Image className="pastTripImage" src={trip.img} />
                      </div>
                      <Rating
                        icon="heart"
                        defaultRating={trip.rating}
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
}

export default UserProfile
