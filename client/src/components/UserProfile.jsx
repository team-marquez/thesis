import React from "react"
import {
  Button,
  Header,
  Segment,
  Rating
} from "semantic-ui-react"
import client from "../index.jsx"
import gql from "graphql-tag"
import jsPDF from "jspdf"

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
      .then(({data}) => this.setState({image: data.image}))
  }

  downloadPDF () {
    let pdf = new jsPDF("l", "mm", "a4");
    let img = new Image;
    img.onload = function() {
      pdf.addImage(this, 'JPEG', 0, 0, 300, 200);
      pdf.save("current-trip.pdf");
    };
    img.crossOrigin = "";
    img.src = this.state.image  
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
                <img src={this.state.image} style={{width: '100%'}} alt="Current Trip"></img>
                <br />
              </div>
              <Button onClick={this.downloadPDF} content='Download' basic color='olive' icon='download' labelPosition='left' style={{display: 'inherit', margin: '5px auto 0px'}}/>
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
                        {/* <img src={trip.img}></img> */}
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
