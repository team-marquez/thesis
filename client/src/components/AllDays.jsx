import React from "react"

import Kamban from "./Kamban.jsx"
import DayModal from "./DayModal.jsx"
import DayCard from "./DayCard.jsx"

import { compose, graphql } from "react-apollo"
import gql from "graphql-tag"

let ITINERARY = gql`
  {
    itinerary @client
  }
`
let USER = gql`
  {
    userPrefs @client
  }
`

class Cont extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dayCardUp: false,
      day: {},
      counter: 0
    }
    this.genDayCard = this.genDayCard.bind(this)
    this.flip = this.flip.bind(this)
  }

  flip(day, index = {}) {
    console.table(day)
    console.log("index", index)
    this.setState({
      dayCardUp: !this.state.dayCardUp,
      day: day,
      index: index
    })
    let temp = JSON.parse(this.props.changeable.itinerary)
    console.log(temp[index])
  }

  genDayCard() {
    return this.state.dayCardUp ? (
      <DayCard
        day={this.state.day}
        flip={this.flip}
        index={this.state.index}
        itinerary={JSON.parse(this.props.changeable.itinerary)}
      />
    ) : (
      <div />
    )
  }

  render() {
    let { weather, budget } = JSON.parse(this.props.static.userPrefs)
    let itinerary = JSON.parse(this.props.changeable.itinerary)
    return this.state.dayCardUp ? (
      this.genDayCard()
    ) : (
      <Kamban days={itinerary} budget={budget} flip={this.flip} temp={weather} home={this.props.home}/>
    )
  }
}

const AllDays = compose(
  graphql(ITINERARY, { name: "changeable" }),
  graphql(USER, { name: "static" })
)(Cont)

//this.props.static.userPrefs
//this.props.changeable.itinerary

export default AllDays
