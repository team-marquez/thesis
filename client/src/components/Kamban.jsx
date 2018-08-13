import React from 'react'

import DayCard from './DayCard.jsx'
import { Grid } from 'semantic-ui-react'

class Kamban extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      arr: [1, 2, 3, 4, 5]
    }
  }

  render () {
    return (
      <div>
        <Grid style={{display: 'inline-block'}}>
          <Grid.Row columns={5}>

            {this.state.arr.map((day) => {
              return (

                <Grid.Column>
                  <DayCard/>
                </Grid.Column>

              )
            })}
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default Kamban
