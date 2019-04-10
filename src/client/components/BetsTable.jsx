import React, { Component } from 'react'
import { connect } from 'react-redux'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import Dice from './Dice'

import 'loaders.css'
import Loader from 'react-loaders'

import * as BetsActions from '../store/actions'

import './BetsTable'

class BetsTable extends Component {
	componentDidMount() {
		const { boostrapData } = this.props
		boostrapData && boostrapData()
	}

	render() {
		const { bets = [], onShow, isLoading = false } = this.props

		return (
			<React.Fragment>
				<div className="row">
					<div className="col-8">
						<h4 className="text-uppercase font-weight-bold">Bets list</h4>
					</div>
					<div className="col-4 text-right">
						<Dice />
					</div>
				</div>
				<hr />

				<table className="table table-hover table-bordered  table-striped">
					<thead className="thead-dark">
						<tr>
							<th>id</th>
							<th>user</th>
							<th>date</th>
							<th>amounts (bet/win)</th>
							<th>roll</th>
							<th>multiplier</th>
							<th>chance</th>
						</tr>
					</thead>

					<tbody>
						{bets.map(bet => (
							<tr key={bet.id} onClick={() => onShow && onShow(bet)}>
								<td>{bet.id}</td>
								<td>{bet.user}</td>
								<td>
									{distanceInWordsToNow(Date.parse(bet.date), {
										addSuffix: true,
										includeSeconds: true,
									})}
								</td>
								<td>
									{bet.betAmount} {bet.currency} / {bet.winAmount}{' '}
									{bet.currency}
								</td>
								<td>{bet.roll}</td>
								<td>{bet.multiplier}</td>
								<td>{bet.chance}</td>
							</tr>
						))}
						{isLoading && (
							<tr>
								<td colSpan="7" className="loader-cell">
									<Loader color="#007bff" type="ball-scale-multiple" active />
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</React.Fragment>
		)
	}
}

const mapState = ({ bets, loaders }) => ({
	bets,
	isLoading: !!loaders['fetchAllBets'],
})

const mapDispatch = dispatch => ({
	boostrapData: () => dispatch(BetsActions.fetchAllBets()),
	onShow: bet => dispatch(BetsActions.showBetInfo(bet.id)),
})

export default connect(
	mapState,
	mapDispatch,
)(BetsTable)
