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
            <div className='kambanAct'>
              {activity.name.length > 20 ? activity.name.substring(0, 30) : activity.name}
            </div>
            <br />
            <div className='kambanAct' >
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
            <Image className='kambanImage' src={activity.image}/>
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
      dinner: [],
      counter: 0,
      checkmarkColor: ['grey', 'grey', 'grey', 'grey']
    }
    this.onDragEnd = this.onDragEnd.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.getBudgets = this.getBudgets.bind(this)
    this.incrementCounter = this.incrementCounter.bind(this)
    this.decrementCounter = this.decrementCounter.bind(this)
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


  incrementCounter (index) {
    let count = this.state.counter + 1
    let color = this.state.checkmarkColor
    color[index] = 'green'
    this.setState({
      counter: count,
      checkmarkColor: color
    })
  }

  decrementCounter (index) {
    let count = this.state.counter - 1
    let color =  this.state.checkmarkColor
    color[index] = 'grey'
    this.setState({
      counter: count,
      checkmarkColor: color
    })
  }

  render() {
    return (
      <ApolloConsumer>
      {(client) => {
      return (
      <div className='mainPage'>
        <div>
          <Segment
            clearing
            style={{ backgroundImage: "linear-gradient(lightCyan, white)" }}
          >
            <Header as="h2" icon="user circle" floated="right" />
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
                        className='gridBorder'
                        key={index}
                        style={{
                          backgroundImage:
                            this.props.temp[index].rain_chance === 0
                              ? "linear-gradient(rgba(255,255,255,0.6) 0%,rgba(255,255,255,255.6) 100%), url(https://previews.123rf.com/images/sgorin/sgorin1607/sgorin160700042/62126745-picturesque-waterfall-in-sunny-day-vertical.jpg)"
                              : "linear-gradient(rgba(255,255,255,0.6) 0%,rgba(255,255,255,255.6) 100%), url(https://previews.123rf.com/images/charnsitr/charnsitr1504/charnsitr150400122/39393935-view-through-the-raindrop-window-on-rainy-day-in-vertical.jpg)"
                        }}
                      >
                        <div>
                          <div className='weatherIcon'>
                            {this.props.temp[index].rain_chance === 0
                                ? <Icon name="rain" className='rainy' size='large'/>
                                : <Icon name='sun' className='sunny' size='large'/>}
                          </div>
                          <div className='expandIcon' onClick={() => this.props.flip(item.orig, index)}>
                            <Icon className='expandIcon' name="expand arrows alternate" size='large'/>
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
                                    style={{float: 'left'}}
                                    basic 
                                    color='rgba(58, 160, 175, 0.11)'
                                    onFocus={() => {
                                      let newstate = {}
                                      newstate[item.id] = !this.state[item.id]
                                      this.setState(newstate)
                                    }}
                                    ref="flipper"
                                  >
                                    STATS
                                  </Button>
                                  {this.state.checkmarkColor[index] === 'grey' ? (<Icon onClick={() => this.incrementCounter(index)} style={{marginTop: '7px', float: 'right'}} name='check' size='large' color={this.state.checkmarkColor[index]}/>) : (<Icon onClick={() => this.decrementCounter(index)} style={{marginTop: '7px', float: 'right'}} name='check' size='large' color={this.state.checkmarkColor[index]}/>)}
                                </div>
                                <div>
                                  <Graphs vis={this.state[item.id]} budget={(this.state.dayBudget[index]/this.state.totalBudget)*100} breakfast={this.state.breakfast[index]} lunch={this.state.lunch[index]} dinner={this.state.dinner[index]} />
                                  <br/>
                                  <br/>
                                  <hr></hr>
                                  <Button
                                    basic 
                                    color='rgba(58, 160, 175, 0.11)'
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
            {this.state.counter === this.props.days.length ? (<Button color='green' style={{width: '90%', marginTop: '-8px'}}>Confirm Trip</Button>) : (<Button color='red' disabled style={{width: '90%', marginTop: '-8px'}}>Confirm All Trips</Button>)}
          </DragDropContext>
        </Grid>
      </div>)}}
      </ApolloConsumer>
    )
  }
}

export default Kamban
