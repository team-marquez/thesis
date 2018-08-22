import React from 'react'
import { Button, Header, Icon, Image, Menu, Segment, Sidebar, Rating } from 'semantic-ui-react'

class UserProfile extends React.Component {
  constructor(props) {
		super(props)
		this.state = {
			visible: false,
			trip: 'current'
		}
		this.handleButtonClick = this.handleButtonClick.bind(this)
		this.handleSidebarHide = this.handleSidebarHide.bind(this)
		this.changeToCurrent = this.changeToCurrent.bind(this)
		this.changeToPast = this.changeToPast.bind(this)
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
	
	changeToCurrent () {
		this.setState({
			trip: 'current'
		})
	}

	changeToPast () {
		this.setState({
			trip: 'past'
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
							animation='overlay'
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
							<Menu.Item as='a' onClick = {this.changeToCurrent}>
								<Icon name='paper plane' />
								Current Trip
							</Menu.Item>
							<Menu.Item as='a' onClick = {this.changeToPast}>
								<Icon name='camera' />
								Past Trips
							</Menu.Item>
						</Sidebar>

						{this.state.trip === 'current' ? (
						<Sidebar.Pusher dimmed={visible}>
							<Segment basic>
								<Header style={{textAlign: 'center'}} as='h3'>Current Trip</Header>
								<div style={{textAlign: 'center', border: '2px solid black', height: '500px', width: '100%'}}>
									<div>
									Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
									</div><br/>
									<Rating icon='heart' defaultRating={3} maxRating={5} size='large'/>
								</div>
							</Segment>
						</Sidebar.Pusher>
					) : (
						<Sidebar.Pusher dimmed={visible}>
							<Segment basic>
								<Header as='h3'>Application Content</Header>
								<Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
							</Segment>
						</Sidebar.Pusher>
					)
					}
						
					</Sidebar.Pushable>
				</div>

			</div>
		)
	}
}
	
export default UserProfile