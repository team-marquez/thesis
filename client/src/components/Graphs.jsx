import React from 'react'

class Graphs extends React.Component {
  constructor (props) {
		super (props)
	}

	budgetGraph () {
		c3.generate({
			bindto: this.budget,
			data: {
				columns: [
					['Budget Spent Today', this.props.budget]
				],
				type: 'gauge',
			},
			color: {
				pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
					threshold: {
					values: [30, 60, 90, 100]
				}
			},
			size: {
				height: 180
			}
		});
	}

	walkingGraph () {
		c3.generate({
			bindto: this.walking,
			data: {
				columns: [
						['BreakFast', this.props.breakfast],
						['Lunch', this.props.lunch],
						['Dinner', this.props.dinner],
									],
				type : 'donut',
			},
			donut: {
				title: "Budget BreakDown"
			}
		});
		console.log(this.props.budget)
	}

	render () {
		return this.props.vis ? (
			<div>
				<div ref={ budget => this.budget = budget } style={{marginTop: '-10px'}}></div>
				{this.budgetGraph()}
				<div ref={ walking => this.walking = walking }></div>
				{this.walkingGraph()}
			</div>
		) : (<div></div>)
	}
}

export default Graphs