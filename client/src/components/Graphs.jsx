import React from 'react'
import c3 from '../../dist/c3.min.js'

import { Button } from 'semantic-ui-react'

class Graphs extends React.Component {
  constructor (props) {
		super (props)
		this.state = {

		}
	}

	budgetGraph () {
		c3.generate({
			bindto: this.budget,
			data: {
				columns: [
					['data', 91.4]
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
						['data1', 30],
						['data2', 120],
									],
				type : 'donut',
				onclick: function (d, i) { console.log("onclick", d, i); },
				onmouseover: function (d, i) { console.log("onmouseover", d, i); },
				onmouseout: function (d, i) { console.log("onmouseout", d, i); }
			},
			donut: {
				title: "Iris Petal Width"
			}
		});
	}

	render () {
		return this.props.vis ? (
			<div>
				<div ref={ budget => this.budget = budget }></div>
				{this.budgetGraph()}
				<div ref={ walking => this.walking = walking }></div>
				{this.walkingGraph()}
			</div>
		) : (<div></div>)
	}
}

export default Graphs