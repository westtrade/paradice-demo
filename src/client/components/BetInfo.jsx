import React, { Component } from 'react'
import classNames from 'classnames'
import format from 'date-fns/format'

import { connect } from 'react-redux'

import 'loaders.css'
import Loader from 'react-loaders'

const BetInfo = ({ isLoading = true, modalData = {}, className = '' }) => (
	<div className={classNames(className)}>
		{isLoading && (
			<div className="loader-wrapper">
				<Loader color="#007bff" type="ball-scale-multiple" active />
			</div>
		)}

		{!isLoading && (
			<table className="table">
				<tbody>
					<tr>
						<th scope="row">ID</th>
						<td>{modalData.id}</td>
					</tr>
					<tr>
						<th scope="row">User</th>
						<td>{modalData.user}</td>
					</tr>
					<tr>
						<th scope="row">Date</th>
						<td>{format(modalData.date, 'MM/DD/YYYY hh:mm:ss')}</td>
					</tr>
					<tr>
						<th scope="row">Amount (bet/win)</th>
						<td>
							{modalData.betAmount} {modalData.currency} / {modalData.winAmount}{' '}
							{modalData.currency}
						</td>
					</tr>
					<tr>
						<th scope="row">Number</th>
						<td>{modalData.number}</td>
					</tr>
					<tr>
						<th scope="row">Roll</th>
						<td>
							{modalData.roll} {modalData.rollSide}
						</td>
					</tr>
					<tr>
						<th scope="row">Result</th>
						<td>{modalData.win ? 'Win' : 'Loss'}</td>
					</tr>
				</tbody>
			</table>
		)}
	</div>
)

const mapProps = ({ modalData, loaders = {} }) => ({
	modalData,
	isLoading: !!loaders['showBetInfo'] && !!modalData,
})

export default connect(mapProps)(BetInfo)
