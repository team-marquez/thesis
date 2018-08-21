import React from 'react'
import { Mutation, Query } from "react-apollo";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Grid, Button, Image } from 'semantic-ui-react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { FlexyFlipCard } from 'flexy-flipcards'

import Graphs from './Graphs.jsx'

const getItems = (count, array) =>
  Array.from({ length: count }, (v, index) => index).map(index => ({
    id: `item-${index}`,
    content: array[index].map((activity) => { return (  
      <div>
        <div>  
          <div style={{float: 'right', color: 'rgb(245, 255, 246)', fontWeight: 'bold', textShadow: '2px 0px black'}}>{activity.name}</div><br/>
          <div style={{float: 'right', color: 'rgb(245, 255, 246)', fontWeight: 'bold', textShadow: '2px 0px black'}}>{activity.cost === null || 0 ? 'Free' : activity.cost === 1 ? '$' : activity.cost === 2 ? '$$' : activity.cost === 3 ? '$$$' : activity.cost === 4 ? '$$$$' : null}</div>
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
  background: isDragging ? 'lightgreen' : 'rgba(0,0,0,0.0)',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'rgba(0,0,0,0.0)' : 'rgba(0,0,0,0.0)',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
});

class Kamban extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      items: getItems(this.props.days.length, this.props.days),
      open: false,
      graphShowing: false
    }
    this.onDragEnd = this.onDragEnd.bind(this)
    this.showGraphs = this.showGraphs.bind(this)
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

  showGraphs () {
    this.setState({
      graphShowing: !this.state.graphShowing
    })
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
                    <div  key = {index} style={{border: '2px solid gray', height: '700px', width: '300px', marginRight: '10px', float: 'right', 
                    backgroundImage: this.props.temp[index].rain_chance === 0 ? 'url(https://i.imgur.com/gf8W6wy.jpg)' : 'url(https://78.media.tumblr.com/a9207e4a4e7c4680611259bfd6f3d341/tumblr_ns4cghz1OP1u7nuo6o1_500.jpg)'}}>
                      <div> 
                        <div>
                          {`${this.props.temp[index].max_temp.toString().substr(0, 2)}° Max || ${this.props.temp[index].min_temp.toString().substr(0, 2)}° Min`}
                        </div>
                        <div>
                          {this.props.temp[index].rain_chance === 0 ? 'Little to No chance of rain' : 'High chance of rain'}
                        </div>
                        <hr></hr>
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
                              frontBackgroundColor="rgba(0,0,0,0.0)"
                              backBackgroundColor="white"
                          >
                            <div>
                              <div>{item.content}</div>
                              {this.state.graphShowing === false ? (<Button onClick = {this.showGraphs}>Load Data</Button>) : (<div><div><Button ref='flipper'>STATS</Button></div></div>)}
                            </div>
                            <div>
                              {this.state.graphShowing === false ? (<div><Button ref='flipper'>TRIP</Button></div>) : (<div><Graphs></Graphs>
                              <Button ref='flipper'>TRIP</Button></div>)}
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
