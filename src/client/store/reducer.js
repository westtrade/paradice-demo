import {
	REQUEST_START,
	REQUEST_COMPLETE,
	REQUEST_ERROR,
	BETS_SET_LIST,
	MODAL_SET_BET_DATA,
	BETS_APPEND_NEW,
} from './constants/bets.constants'

const reducer = (state, { type, payload }) => {
	const payloadData =
		payload && typeof payload === 'object' ? payload.data || {} : payload

	if (type === BETS_SET_LIST) {
		return {
			...state,
			bets: [...payloadData.allBets],
		}
	}

	if (type === BETS_APPEND_NEW) {
		return {
			...state,
			bets: [...payload, ...state.bets],
		}
	}

	if (type === MODAL_SET_BET_DATA) {
		const modalData =
			payloadData && typeof payloadData === 'object'
				? payloadData.betInfo
				: payloadData

		if (
			modalData &&
			typeof modalData === 'object' &&
			modalData.id !== state.modalData
		) {
			return state
		}

		return {
			...state,
			modalData,
		}
	}

	if (type === REQUEST_START) {
		const { name } = payload || {}
		return {
			...state,
			loaders: {
				[name]: state.loaders[name] || 0 + 1,
			},
		}
	}

	if ([REQUEST_COMPLETE, REQUEST_ERROR].includes(type)) {
		const { name, error } = payload || {}
		const { [name]: currentLoaderCount, ...loaders } = state.loaders

		if (currentLoaderCount > 1) {
			loaders[name] = currentLoaderCount - 1
		}

		return {
			...state,
			loaders,
		}
	}

	return state
}

export default reducer
