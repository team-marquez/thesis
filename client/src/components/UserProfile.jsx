import React from 'react'
import { Button, Header, Icon, Image, Menu, Segment, Sidebar, Rating } from 'semantic-ui-react'

class UserProfile extends React.Component {
  constructor(props) {
		super(props)
		this.state = {
			trip: 'current',
			pastTrips: [{img: 'https://i.imgur.com/SDrLtgc.jpg', rating: 4}, {img: 'https://i.imgur.com/L9ov00i.jpg', rating: 3}, {img: 'https://i.imgur.com/z6GNhq3.jpg', rating: 5}]
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
		return (
			<div>
				<div>
				<div>
          <Segment
            clearing
            style={{ backgroundImage: "linear-gradient(lightCyan, white)" }}
          >
            <Header as="h2" icon="user circle" floated="right" />
          </Segment>
        </div>
						{this.props.trip === 'current' ? (
							<Segment basic>
								<Header className='centerUserPro' as='h3'>Current Trip</Header>
								<div className='userProBox'>
									<div>
									Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
									</div><br/>
								</div>
							</Segment>
						) : (
						<div>
							<Segment basic>
								<Header className='centerUserPro' as='h3'>Past Trips</Header>
							</Segment>

						{this.state.pastTrips.map((trip, index) => {
							return (
									<Segment basic>
										<div className='pastTripBox'>
											<div>
												<Image className='pastTripImage' src={trip.img}></Image>
											</div>
											<Rating icon='heart' defaultRating={trip.rating} maxRating={5} size='large'/>
										</div>
										<hr/>
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