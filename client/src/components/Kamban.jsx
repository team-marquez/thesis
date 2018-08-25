import React from "react"
import {
  Grid,
  Button,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar
} from "semantic-ui-react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { FlexyFlipCard } from "flexy-flipcards"
import Graphs from "./Graphs.jsx"
import {ApolloConsumer} from "react-apollo"


// Generates an array of the data we get back. Shows the name, cost, and the image.
const getItems = (count, array) =>
  Array.from({ length: count }, (v, index) => index).map(index => ({
    id: `item-${index}`,
    content: array[index].map(activity => {
      return (
        <div>
          <div>
            <div
              style={{
                float: "right",
                fontWeight: "bold",
              }}
            >
              {activity.name.length > 20 ? activity.name.substring(0, 30) : activity.name}
            </div>
            <br />
            <div
              style={{
                float: "right",
                fontWeight: "bold",
              }}
            >
              {activity.cost === null || 0
                ? "Free"
                : activity.cost === 1
                  ? "$"
                  : activity.cost === 2
                    ? "$$"
                    : activity.cost === 3
                      ? "$$$"
                      : activity.cost === 4
                        ? "$$$$"
                        : null}
            </div>
            <Image
              style={{ width: "50px", height: "50px" }}
              src={activity.image}
            />
          </div>{" "}
          <br />
        </div>
      )
    }),
    orig: array[index]
  }))

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const grid = 45

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: "10px",
  margin: '-11px 0px 0px',

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "rgba(0,0,0,0.0)",

  // styles we need to apply on draggables
  ...draggableStyle
})

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "rgba(0,0,0,0.0)" : "rgba(0,0,0,0.0)",
  display: "flex",
  padding: '20px 0px',
  overflow: "auto"
})

class Kamban extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: getItems(this.props.days.length, this.props.days),
      open: false,
      "item-0": false,
      "item-1": false,
      "item-2": false,
      "item-3": false,
      "item-4": false,
      "item-5": false,
      totalBudget: (this.props.budget.totalBudget/100 * 4),
      dayBudget: [],
      breakfast: [],
      lunch: [],
      dinner: []
    }
    this.onDragEnd = this.onDragEnd.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.getBudgets = this.getBudgets.bind(this)
  }

  componentDidMount () {
    this.getBudgets()
  }

  getBudgets () {
    let _days = this.props.days
    let costOfDays = []
    let breakfast = []
    let lunch = []
    let dinner = []
    for (let i = 0; i < _days.length; i++) {
      let cost = 0
      let day = _days[i]
      for (let j = 0; j < day.length; j++) {
        cost += day[j].cost
        if (j === 0) breakfast.push(day[j].cost)
        if (j === 2) lunch.push(day[j].cost)
        if (j === 4) dinner.push(day[j].cost)
      }
      costOfDays.push(cost)
    }
    this.setState({
      dayBudget: costOfDays,
      breakfast: breakfast,
      lunch: lunch,
      dinner: dinner
    })
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    )

    this.setState({
      items
    })
  }

  handleClick(int) {
    this.setState({ vis: !this.state.vis })
  }

  render() {
    return (
      <ApolloConsumer>
      {(client) => {
      return (
      <div style={{marginBottom: '15px'}}>
        <div>
          <Segment
            clearing
            style={{ backgroundImage: "linear-gradient(lightCyan, white)" }}
          >
            {this.props.user === "Welcome User" ? (
              <Header as="h2" icon="user circle" floated="right" />
            ) : (
              <Header
                as="h2"
                icon="user circle"
                onClick={this.props.home}
                floated="right"
              />
            )}
          </Segment>
        </div>

        <Grid style={{ display: "inline-block" }}>
          <DragDropContext
            onDragEnd={result => {
              this.onDragEnd(result)
              let temp = JSON.stringify(
                this.state.items.map(elem => elem.orig)
              )
              client.writeData({ data: { itinerary :  temp} })
            }}
          >
            <Droppable
              droppableId="droppable"
              type="app"
              direction="horizontal"
            >
              {(provided, snapshot) => {
                return (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                  >
                    {this.state.items.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          border: "2px solid gray",
                          height: "100%",
                          width: "300px",
                          marginRight: "10px",
                          float: "right",
                          backgroundColor:
                            this.props.temp[index].rain_chance === 0
                              ? "rgba(58, 160, 175, 0.11)"
                              : "rgba(108, 101, 80, 0.18)"
                        }}
                      >
                        <div>
                          <div style={{display: 'inline-block', float: 'right', margin: '10px 5px 0px -20px'}}>
                            {this.props.temp[index].rain_chance === 0
                                ? <Icon name="rain" size='large'/>
                                : <Icon name='sun' size='large'/>}
                          </div>
                          <div>
                            {`${this.props.temp[index].max_temp
                              .toString()
                              .substr(0, 2)}° Max || ${this.props.temp[
                              index
                            ].min_temp
                              .toString()
                              .substr(0, 2)}° Min`}
                          </div>
                          <div>
                            {this.props.temp[index].rain_chance === 0
                              ? "Little to No chance of rain"
                              : "High chance of rain"}
                          </div>
                          <hr />
                        </div>
                        <br />

                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                           
                              <FlexyFlipCard
                                frontBackgroundColor="rgba(0,0,0,0.0)"
                                backBackgroundColor="rgba(0,0,0,0.0)"
                              >
                                <div>
                                  <div>{item.content}</div>
                                  <hr></hr>
                                  <Button
                                    onFocus={() => {
                                      let newstate = {}
                                      newstate[item.id] = !this.state[item.id]
                                      this.setState(newstate)
                                    }}
                                    ref="flipper"
                                  >
                                    STATS
                                  </Button>
                                  <Button onClick={() => this.props.flip(item.orig, index)}>EXPAND</Button>
                                </div>
                                <div>
                                  <Graphs style={{marginTop: '-10px'}} vis={this.state[item.id]} budget={(this.state.dayBudget[index]/this.state.totalBudget)*100} breakfast={this.state.breakfast[index]} lunch={this.state.lunch[index]} dinner={this.state.dinner[index]} />
                                  <br/>
                                  <br/>
                                  <hr></hr>
                                  <Button
                                    onFocus={() => {
                                      console.log(item.id)
                                      setTimeout(() => {
                                        let newstate = {}
                                        newstate[item.id] = !this.state[item.id]
                                        this.setState(newstate)
                                      }, 500)
                                    }}
                                    ref="flipper"
                                  >
                                    TRIP
                                  </Button>
                                  <Button onClick={() => this.props.flip(item.orig, index)}>EXPAND</Button>
                                </div>
                              </FlexyFlipCard>
                            </div>
                          )}
                        </Draggable>
                      </div>
                    ))}
                    {provided.placeholder}
                  </div>
                )
              }}
            </Droppable>
            <Button color='red' style={{width: '90%', marginTop: '-8px'}}>Confirm Trip</Button>
          </DragDropContext>
        </Grid>
      </div>)}}
      </ApolloConsumer>
    )
  }
}

export default Kamban
