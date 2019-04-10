import React from 'react'
import { connect } from 'react-redux'
import { rollDice } from '../store/actions'

import 'loaders.css'
import Loader from 'react-loaders'

const Dice = ({ onDice, isLoading }) => {
	return !isLoading ? (
		<button onClick={onDice} type="button" className="btn btn-success">
			DICE!
		</button>
	) : (
		<div
			className="loader-wrapper"
			style={{
				height: '38px',
				width: '56px',
				float: 'right',
			}}
		>
			<Loader color="#007bff" type="ball-scale-multiple" active />
		</div>
	)
}

const mapDispatch = dispatch => ({
	onDice: () => dispatch(rollDice()),
})

const mapProps = ({ loaders = {} }) => ({
	isLoading: !!loaders['rollDice'],
})

export default connect(
	mapProps,
	mapDispatch,
)(Dice)
