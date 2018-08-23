import React from "react"

import Kamban from "./Kamban.jsx"
import DayModal from "./DayModal.jsx"

import { Query } from "react-apollo"
import gql from "graphql-tag"

let ITINERARY = gql`
  {
    userPrefs @client
  }
`

class AllDays extends React.Component {

  render() {
    return (
      <Query query={ITINERARY}>
        {({ loading, error, data }) => {
          if (loading) return (<h1> LOADING </h1>)
          if (error) return (<h1>ERROR</h1>)
          else {
						data = JSON.parse(data.userPrefs)
            return (
              <div>
                <Kamban days={data.itinerary} temp={data.weather} home={this.props.home} user={this.props.user}/>
                <DayModal days={data.itinerary} />
              </div>
            )
          }
        }}
      </Query>
    )
  }
}

export default AllDays