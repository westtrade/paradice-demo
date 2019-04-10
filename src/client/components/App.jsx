import React, { useState } from 'react'
import BetsTable from './BetsTable'
import BetInfo from './BetInfo'
import Modal from './Modal'

import * as BetsActions from '../store/actions'
import { connect } from 'react-redux'

const App = ({ modalIsVisible = false, hideModal }) => {
	return (
		<React.Fragment>
			<nav className="navbar navbar-dark bg-primary mb-4">
				<div className="container">
					<a href="/" className="navbar-brand mb-0 font-weight-bold h1 mx-auto">
						PARADICE DEMO
					</a>
				</div>
			</nav>
			<div className="container">
				<BetsTable />
			</div>
			<Modal title="BET INFO" isVisible={modalIsVisible} onToggle={hideModal}>
				<BetInfo />
			</Modal>
		</React.Fragment>
	)
}

const mapState = ({ modalData }) => ({
	modalIsVisible: modalData !== null,
})

const mapDispatch = dispatch => ({
	hideModal: () => dispatch(BetsActions.showBetInfo(null)),
})

export default connect(
	mapState,
	mapDispatch,
)(App)
