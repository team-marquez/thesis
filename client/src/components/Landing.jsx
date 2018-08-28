import React from 'react'
import { Breadcrumb } from 'semantic-ui-react'

import { images } from './helpers/splashImages.js'
import UserPreferences from './UserPreferences.jsx'
import Onboarding from './Onboarding.jsx'

class Landing extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      background: '',
      backgroundNY: '',
      openOnboarding: false,
      location: 'New York'
    }

    this.locationChange = this.locationChange.bind(this)
  }

  locationChange(e) {
    var location = e.target.text

    this.setState({ location })

    if (location === 'New York') {
      this.setState({
        background: this.state.backgroundNY
      })
    } else if (location === 'Paris') {
      this.setState({
        background:
          'https://images.unsplash.com/photo-1500313830540-7b6650a74fd0?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9&s=6e938f7571b1c14add60901d6b841307'
      })
    } else if (location === 'Tokyo') {
      this.setState({
        background:
          'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ebd34ddde3f2b4ea6dcdc9b7d329b774&auto=format&fit=crop&w=2850&q=80'
      })
    }
  }

  // Set random background image from our helper splashImage file.
  componentDidMount() {
    let img = images[Math.floor(Math.random() * images.length)]
    this.setState({ background: img, backgroundNY: img })
  }

  render() {
    return (
      <div className="splash">
        <img className="splashImage" src={this.state.background} />
        <div />
        <div className="cityName">
          {this.state.location === 'New York' ? (
            <div>
              <div className="newYork">New York</div>
              <div className="newYorkTrip">
                <UserPreferences able={false} />
              </div>
            </div>
          ) : this.state.location === 'Tokyo' ? (
            <div>
              <div className="tokyo">Tokyo</div>
              <div className="tokyoTrip">
                <UserPreferences able={true} />
              </div>
            </div>
          ) : (
            <div>
              <div className="paris">Paris</div>
              <div className="parisTrip">
                <UserPreferences able={true} />
              </div>
            </div>
          )}
        </div>

        <Onboarding
          open={this.state.openOnboarding}
          closer={this.closeFirstOnboard}
        />

        <div className="breadCrumbs">
          <Breadcrumb>
            <Breadcrumb.Section onClick={this.locationChange}>
              Tokyo
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon="map pin" />
            <Breadcrumb.Section onClick={this.locationChange}>
              Paris
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon="map pin" />
            <Breadcrumb.Section onClick={this.locationChange}>
              New York
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon="map pin" />
          </Breadcrumb>
        </div>
      </div>
    )
  }
}

export default Landing
