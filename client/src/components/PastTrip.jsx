import React from 'react'

import { Segment, Image, Rating } from 'semantic-ui-react'

class PastTrip extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pastTrips: [
        { img: 'https://i.imgur.com/SDrLtgc.jpg' },
        { img: 'https://i.imgur.com/L9ov00i.jpg' },
        { img: 'https://i.imgur.com/z6GNhq3.jpg' }
      ]
    }
  }

  render() {
    return (
      this.state.pastTrips.map((trip, index) => (
        <Segment basic key={index}>
          <div className="pastTripBox">
            <div>
              <Image className="pastTripImage" src={trip.img} />
            </div>
            <Rating icon="heart" defaultRating={3} maxRating={5} size="large" />
          </div>
          <hr />
        </Segment>
      ))
    )
  }
}

export default PastTrip
