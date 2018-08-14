import React from 'react'

import { Grid } from 'semantic-ui-react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const getItems = (count, array) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: array[k],
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
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
});

class Kamban extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      arr: ['Marty', 'Roman', 'Erik', 'Guillermo'],
      items: [],
      open: false
    }
    this.onDragEnd = this.onDragEnd.bind(this)
    this.setItems = this.setItems.bind(this)
  }

  componentDidMount () {
    this.setItems()
  }

  setItems () {
    this.setState({
      items: getItems(this.state.arr.length, this.state.arr)
    })
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
    const { open } = this.state
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
                    <div>
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
                            {item.content}
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

// class Kamban extends React.Component {
//   constructor (props) {
//     super (props)
//     this.state = {
//       arr: [1, 2, 3, 4, 5]
//     }
//   }

//   render () {
//     return (
//       <div>
//         <Grid style={{display: 'inline-block'}}>
//           <Grid.Row columns={5}>
//             {this.state.arr.map((day) => {
//               return (
//                 <Grid.Column>
//                   <DayCard/>
//                 </Grid.Column>
//               )
//             })}
//           </Grid.Row>
//         </Grid>
//       </div>
//     )
//   }
// }

// state = { open: false }

//   show = size => () => this.setState({ size, open: true })
//   close = () => this.setState({ open: false })

//   render() {
//     const { open, size } = this.state

//     return (
//       <div>
//         <Button onClick={this.show('mini')}>Mini</Button>
//         <Button onClick={this.show('tiny')}>Tiny</Button>
//         <Button onClick={this.show('small')}>Small</Button>
//         <Button onClick={this.show('large')}>Large</Button>
//         <Button onClick={this.show('fullscreen')}>Fullscreen</Button>

        // <Modal size={size} open={open} onClose={this.close}>
        //   <Modal.Header>Delete Your Account</Modal.Header>
        //   <Modal.Content>
        //     <p>Are you sure you want to delete your account</p>
        //   </Modal.Content>
        //   <Modal.Actions>
        //     <Button negative>No</Button>
        //     <Button positive icon='checkmark' labelPosition='right' content='Yes' />
        //   </Modal.Actions>
        // </Modal>
//       </div>