import React from 'react'

import DayCard from './DayCard.jsx'

import { Modal, Icon, Button } from 'semantic-ui-react'



class DayModal extends React.Component {
	constructor (props) {
		super (props)
		this.state = {
		}
	}

	render () {
		return (
			<div>
				{this.props.days.map((day, index) => {
					return (
						<Modal size={'fullscreen'} key={index} trigger={<Button icon labelPosition='right' style={{marginLeft: '-35px', marginTop: '10px'}}>
								{`Display Day ${index + 1}`}
								<Icon name='expand arrows alternate' />
							</Button>}>
							<Modal.Header style={{textAlign: 'center'}}>{`Day ${index + 1}`}</Modal.Header>
							<Modal.Content>
								<DayCard day={day}/>
							</Modal.Content>
						</Modal>
					)
				})}
			</div>
		)
	}
}

export default DayModal

