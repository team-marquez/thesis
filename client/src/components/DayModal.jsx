import React from 'react'

import DayCard from './DayCard.jsx'

import { Modal, Icon, Button } from 'semantic-ui-react'

class DayModal extends React.Component {
	constructor (props) {
		super (props)
		this.state = {
			arr: [1, 2, 3, 4]
		}
	}

	render () {
		return (
			<div>
				{this.state.arr.map((item, index) => {
					return (
						<Modal size={'fullscreen'} trigger={<Button icon labelPosition='right' style={{marginLeft: '-35px', marginTop: '10px'}}>
								{`Display Day ${index + 1}`}
								<Icon name='expand arrows alternate' />
							</Button>}>
							<Modal.Header style={{textAlign: 'center'}}>{`Day ${index + 1}`}</Modal.Header>
							<Modal.Content>
								<DayCard/>
							</Modal.Content>
						</Modal>
					)
				})}
			</div>
		)
	}
}

export default DayModal

