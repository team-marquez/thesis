import React from 'react'
import { Mutation, Query } from "react-apollo";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Grid, Button } from 'semantic-ui-react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const getItems = (count, array) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: {name: array[k].map((el) => { return (  
      <div>
        <h4>{el.name}</h4>
        <h4>{el.location}</h4>
      </div>
    )})}
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
  padding: 0,
  margin: 0,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'white',
  border: '2px solid gray',

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
                    <div  style={{border: '2px solid gray', height: '500px', marginRight: '10px'}}>
                      <div>
                        {`Weather ${index + 50}`}
                      </div>


                      <Draggable key={item.id} draggableId={item.id} index={index} style ={{marginLeft: '10px', width: '80%'}}>
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
                            {item.content.name}
                            {item.content.location}
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
