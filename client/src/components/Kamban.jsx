import React from 'react'
<<<<<<< HEAD

import { Grid, Image, Button } from 'semantic-ui-react'
=======
import { Mutation, Query } from "react-apollo";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Grid, Button } from 'semantic-ui-react'
>>>>>>> merges
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { FlexyFlipCard } from 'flexy-flipcards'

import Graphs from './Graphs.jsx'

const getItems = (count, array) =>
  Array.from({ length: count }, (v, index) => index).map(index => ({
    id: `item-${index}`,
    content: array[index].map((activity) => { return (  
      <div>
        <div>  
          <div style={{float: 'right'}}>{activity.name}</div><br/>
          <div style={{float: 'right'}}>{activity.cost === 0 ? 'Free' : activity.cost === 1 ? '$' : activity.cost === 2 ? '$$' : activity.cost === 3 ? '$$$' : activity.cost === 4 ? '$$$$' : null}</div>
          <Image style={{width: '50px', height: '50px'}} src={activity.image}></Image>
        </div> <br/>
      </div>
    )})
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 45;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: '10px',
  margin: 0,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'white',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'white' : 'white',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
});

class Kamban extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      items: getItems(this.props.days.length, this.props.days),
      open: false
    }
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  }

  render () {
    return (
      <div>
        <Grid style={{display: 'inline-block'}}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable" type="app" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  {this.state.items.map((item, index) => (
                    <div  style={{border: '2px solid gray', height: '700px', width: '300px', marginRight: '10px', float: 'right'}}>
                      <div>
                        {`${index + 50} degrees`}
                      </div>
                      <br/>


                      <Draggable key={item.id} draggableId={item.id} index={index}>
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
                              frontBackgroundColor="white"
                              backBackgroundColor="white"
                          >
                              <div >
                                <p>{item.content}</p>
                                <Button ref='flipper'></Button>
                              </div>
                              <div>
                                <Graphs></Graphs>
                                <Button ref='flipper'></Button>
                              </div>
                          </FlexyFlipCard>
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
        </Grid>
      </div>
    )
  }
}


export default Kamban
