import React from 'react'
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

class UserProfile extends React.Component {
  constructor(props) {
		super(props)
		this.state = {
			visible: false
		}
		this.handleButtonClick = this.handleButtonClick.bind(this)
		this.handleSidebarHide = this.handleSidebarHide.bind(this)
	}

	handleButtonClick () {
		this.setState({ 
			visible: !this.state.visible
		})
	}

	handleSidebarHide () {
		this.setState({ 
			visible: false 
		})
	}
	
	render () {
		const { visible } = this.state
		return (
			<div>
				<div>
					<Segment clearing style={{backgroundImage: 'linear-gradient(lightCyan, white)'}}>
						<Header as='h2' icon='user circle' content={this.props.user} floated='right'/>
						<Button onClick={this.handleButtonClick} floated='left' style={{marginTop: '3px'}}>Settings</Button>
					</Segment>
				</div>

				<div>

					<Sidebar.Pushable as={Segment}>
						<Sidebar
							as={Menu}
							animation='slide along'
							icon='labeled'
							inverted
							onHide={this.handleSidebarHide}
							vertical
							visible={visible}
							width='thin'
						>
							<Menu.Item as='a' onClick = {this.props.home}>
								<Icon name='home' />
								Home
							</Menu.Item>
							<Menu.Item as='a'>
								<Icon name='paper plane' />
								Current Trip
							</Menu.Item>
							<Menu.Item as='a'>
								<Icon name='camera' />
								Past Trips
							</Menu.Item>
						</Sidebar>

						<Sidebar.Pusher dimmed={visible}>
							<Segment basic>
								<Header as='h3'>Application Content</Header>
								<Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
							</Segment>
						</Sidebar.Pusher>
					</Sidebar.Pushable>
				</div>

			</div>
		)
	}
}
	
export default UserProfile