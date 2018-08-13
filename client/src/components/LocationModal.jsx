import React from 'react'

import { Slider } from 'react-semantic-ui-range'
import { Grid, Modal, Input, Label, Checkbox, Button, Image } from 'semantic-ui-react'
import { format, addDays } from 'date-fns'
import { DateRange } from 'react-date-range'

class LocationModal extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      bright: 'brightness(100%)'
    }
    this.mouseEnter = this.mouseEnter.bind(this)
    this.mouseExit = this.mouseExit.bind(this)
  }

  mouseEnter () {
    this.setState({
      bright: 'brightness(125%)'
    })
  }

  mouseExit () {
    this.setState({
      bright: 'brightness(100%)'
    })
  }

  render () {
    return (
      <div className = 'locationOptions' style = {{width: '100%'}}>
        <Grid>
         <Grid.Row centered columns={2}>
           <Grid.Column>
             <Modal size = {'mini'} trigger={<Image src='https://drscdn.500px.org/photo/119659039/m%3D900/v2?webp=true&sig=f0973f50f2fc640b2c6a13491efb40365c11c425b81b6dc05f7dbe9bf15c0d87' onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseExit} style={{marginLeft: '10px', marginBottom: '10px', filter: this.state.bright}}/>}>
               <Modal.Header style={{textAlign: 'center'}}>Set Your Preferences</Modal.Header>
               <Modal.Content>
               <div  style={{textAlign: 'center'}}>
                 <Input labelPosition='right' type='text' type='number' placeholder='Amount'>
                   <Label basic>$</Label>
                   <input />
                   <Label>.00</Label>
                 </Input><br/>
               </div>

               <div  style={{textAlign: 'center'}}>
                  <DateRange
                      onInit={this.handleSelect}
                      onChange={this.handleSelect}
                      calendars={1}
                  />
               </div>
                  <Modal.Description>
                  <div style={{float: 'right', display: 'inline-block'}}>
                    {"Food"}
                  </div>
                  <div style={{textAlign: 'left', display: 'inline-block'}}>
                    {"Activities"}
                  </div>
                    <Slider color="purple" inverted={false}
                      settings={{
                      start: 50,
                      min:0,
                      max:100,
                      step:1,
                    }}/>

                    <div style={{float: 'right', display: 'inline-block'}}>
                      {"Indoors"}
                    </div>
                    <div style={{textAlign: 'left', display: 'inline-block'}}>
                      {"Outdoors"}
                    </div>

                    <Slider color="pink" inverted={false}
                      settings={{
                      start: 50,
                      min:0,
                      max:100,
                      step:1,
                    }}/>

                    <div style={{float: 'right', display: 'inline-block'}}>
                      {"Touristy"}
                    </div>
                    <div style={{textAlign: 'left', display: 'inline-block'}}>
                      {"Local"}
                    </div>

                    <Slider color="green" inverted={false}
                      settings={{
                      start: 50,
                      min:0,
                      max:100,
                      step:1,
                    }}/> <br/>

                    <div style={{display: 'inline-block', marginRight: '95px'}}>
                      <Input icon='users' size='mini' iconPosition='left' type='number' placeholder='Party size' style={{width: '100px', textAlign: 'right'}}/>
                    </div>

                    <div style={{display: 'inline-block'}}>
                      <Checkbox label='Family Friendly'/>
                    </div>

                    <div  style={{textAlign: 'right'}}>
                      <br/><Button content='Next' icon='right arrow' labelPosition='right'/>
                    </div>
                  </Modal.Description>
               </Modal.Content>
             </Modal>
           </Grid.Column>
           <Grid.Column>
             <Image src='https://drscdn.500px.org/photo/92890847/m%3D900/v2?webp=true&sig=51138635394c2a7a8a38178eb09e2fb88cd0bebcbcd90ad84f1d3265b8b00e22' style={{marginBottom: '10px', marginLeft: '-10px', opacity: '0.8', filter: 'grayscale(100%)'}}/>
           </Grid.Column>
           <Grid.Column>
             <Image src='https://drscdn.500px.org/photo/3236342/m%3D900/v2?webp=true&sig=9c44f7758ff90da55d211411839b469f3d2e4652ade16897dbe76fd3a911411a' style={{marginLeft: '10px', opacity: '0.8', filter: 'grayscale(100%)'}}/>
           </Grid.Column>
           <Grid.Column>
             <Image src='https://drscdn.500px.org/photo/52784332/m=900/9831e3f3de4586bd113ab838ce2aaeb7' style={{marginLeft: '-10px', opacity: '0.8', filter: 'grayscale(100%)'}}/>
           </Grid.Column>
         </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default LocationModal
