import * as api from '../apolloClient'
import {
	REQUEST_START,
	REQUEST_COMPLETE,
	REQUEST_ERROR,
	BETS_SET_LIST,
	MODAL_SET_BET_DATA,
	BETS_APPEND_NEW,
} from './constants/bets.constants'

export const betsAppendNew = (newBetsList = []) => ({
	type: BETS_APPEND_NEW,
	payload: newBetsList,
})

export const fetchAllBets = () => async dispatch => {
	const name = 'fetchAllBets'
	dispatch({
		type: REQUEST_START,
		payload: {
			name,
		},
	})

	try {
		dispatch({
			type: BETS_SET_LIST,
			payload: await api.fetchAllBets(),
		})

		dispatch({
			type: REQUEST_COMPLETE,
			payload: {
				name,
			},
		})
	} catch (error) {
		console.error(error)
		dispatch({
			type: REQUEST_ERROR,
			payload: {
				name,
				error: {
					messag: error.message,
				},
			},
		})
	}
}

export const showBetInfo = (id = null) => async dispatch => {
	const name = 'showBetInfo'
	dispatch({
		type: MODAL_SET_BET_DATA,
		payload: id,
	})

	if (id === null) {
		return
	}

	dispatch({
		type: REQUEST_START,
		payload: {
			name,
			id,
		},
	})

	try {
		dispatch({
			type: MODAL_SET_BET_DATA,
			payload: await api.fetchBetInfo(id),
		})

		dispatch({
			type: REQUEST_COMPLETE,
			payload: {
				name,
				id,
			},
		})
	} catch (error) {
		console.error(error)
		dispatch({
			type: REQUEST_ERROR,
			payload: {
				name,
				id,
				error: {
					messag: error.message,
				},
			},
		})
	}
}

export const rollDice = () => async dispatch => {
	const name = 'rollDice'

	dispatch({
		type: REQUEST_START,
		payload: {
			name,
		},
	})

	try {
		await api.rollDice({
			number: 3,
			betAmount: 0,
			side: 'ABOVE',
			currency: 'BTC',
		})

		dispatch({
			type: REQUEST_COMPLETE,
			payload: {
				name,
			},
		})
	} catch (error) {
		console.error(error)
		dispatch({
			type: REQUEST_ERROR,
			payload: {
				name,
				error: {
					messag: error.message,
				},
			},
		})
	}
}
