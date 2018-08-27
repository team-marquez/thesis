import React from 'react'
import { Button, Header, Icon, Image, Menu, Segment, Sidebar, Rating } from 'semantic-ui-react'

class UserProfile extends React.Component {
  constructor(props) {
		super(props)
		this.state = {
			trip: 'current',
			pastTrips: [{img: 'https://i.imgur.com/SDrLtgc.jpg'}, {img: 'https://i.imgur.com/L9ov00i.jpg'}, {img: 'https://i.imgur.com/z6GNhq3.jpg'}]
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
		return (
			<div>
				<div>
						{this.state.trip === 'current' ? (
							<Segment basic>
								<Header style={{textAlign: 'center'}} as='h3'>Current Trip</Header>
								<div style={{textAlign: 'center', border: '2px solid black', height: '300px', width: '100%'}}>
									<div>
									Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
									</div><br/>
								</div>
							</Segment>
						) : (
						<div>
							<Segment basic>
								<Header style={{textAlign: 'center'}} as='h3'>Past Trips</Header>
							</Segment>

						{this.state.pastTrips.map((trip, index) => {
							return (
									<Segment basic>
										<div style={{textAlign: 'center', height: '500px', width: '100%'}}>
											<div>
												<Image style={{margin: '5px auto', height: '450px'}} src={trip.img}></Image>
											</div>
											<Rating icon='heart' defaultRating={3} maxRating={5} size='large'/>
											<hr/>
										</div>
									</Segment>
							)
						})}						
						</div>
					)}
				</div>

			</div>
		)
	}
}
	
export default UserProfile