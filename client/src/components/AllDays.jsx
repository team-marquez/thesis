import React from 'react'

import Kamban from './Kamban.jsx'
import DayModal from './DayModal.jsx'

class AllDays extends React.Component {
	constructor (props) {
		super (props)
	}

	render () {
		return (
			<div>
				<Kamban/>
				<DayModal/>
			</div>
		)
	}
}

export default AllDays