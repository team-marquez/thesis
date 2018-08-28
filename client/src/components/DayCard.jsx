import React from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Image, Button, Icon } from "semantic-ui-react"
import { ApolloConsumer } from "react-apollo";

// Generates an array of the amount of days selected. Content displays the image, name, cost, location, description, and link.
const getItems = (count, array) =>
  Array.from({ length: count }, (v, activity) => activity).map(activity => ({
    id: `item-${activity}`,
    content: {
      image: array[activity].image,
      name: array[activity].name,
      cost: array[activity].cost,
      location: array[activity].location,
      description: array[activity].description,
      link: array[activity].website
    },
    orig: array[activity]
  }))

// a little function to help us with reordering the result
// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list)
//   const [removed] = result.splice(startIndex, 1)
//   result.splice(endIndex, 0, removed)

//   return result
// }

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  let start = result[startIndex]
  let end = result[endIndex]
  result[startIndex] = end
  result[endIndex] = start
  return result
}

const grid = 10

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `${grid}px auto 0px`,
  width: '90%',

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",
  border: "2px solid black",

  // styles we need to apply on draggables
  ...draggableStyle
})

// Styling for when the card is being dragged.
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "white" : "white",
  width: "90%",
  margin: 'auto'
})

class DayCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: getItems(6, this.props.day)
    }
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  onDragEnd(result) {
    console.table(JSON.stringify(result, null, 2))
    // dropped outside the list
    if (!result.destination) {
      return
    }
    if (result.source.index % 2 !== result.destination.index % 2) {
      console.log(`result.source % 2 = ${result.source % 2}
      result.destination % 2 = ${result.destination % 2}`)
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

  render() {
    return (
      <ApolloConsumer>
      {(client) => {
      return (
      <div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {this.state.items.map((item, index) => (
                  <div key={index}>
                    <p style={{marginTop: '10px'}} className='costAmount'>
                      {index === 0
                        ? "Breakfast"
                        : index === 1
                          ? "Breakfast Activity"
                          : index === 2
                            ? "Lunch"
                            : index === 3
                              ? "Lunch Activity"
                              : index === 4
                                ? "Dinner"
                                : index === 5
                                  ? "Dinner Activity"
                                  : null}
                    </p>
                    <Icon className='freeTime' style={{marginTop: '4%'}} size='big' name='x'></Icon>
                    <Icon className='nextAct' style={{marginTop: '3%'}} size='huge' name='triangle right'></Icon>
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
                          <div>
                            <div className='imageAlign'>
                              <a href={item.content.link} target="_blank">
                                <Image
                                  className='dayImage'
                                  src={item.content.image}
                                />
                              </a>
                            </div>
                            <div className='actTitle'>
                              <div className='titleCost'>
                                <strong>{item.content.name}</strong>
                              </div>
                              <div className='actCost'>
                                {item.content.cost === null || 0
                                  ? "Free"
                                  : item.content.cost === 1
                                    ? "$"
                                    : item.content.cost === 2
                                      ? "$$"
                                      : item.content.cost === 3
                                        ? "$$$"
                                        : item.content.cost === 4
                                          ? "$$$$"
                                          : null}
                              </div>
                            </div>
                            <div className='actLocation'>
                              <em>{item.content.location = item.content.location.replace(/([A-Z])/g, ' $1').trim()}</em>
                            </div>
                            <div className='actDescription'>
                              {item.content.description.replace(/(([^\s]+\s\s*){70})(.*)/,"$1…")}
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  </div>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Button
          style={{margin: '1%'}}
          onClick={() => {
            this.props.flip(this.props.day)
            let temp = this.props.itinerary.slice()
            temp[this.props.index] = this.state.items.map(elem => elem.orig)
            client.writeData({ data: { itinerary: JSON.stringify(temp) } })
          }}
        >
          Close
        </Button>
      </div>)
      }}
      </ApolloConsumer>
    )
  }
}

export default DayCard

// Refactor ternary to conditional, handle in componentDidMount function if/else