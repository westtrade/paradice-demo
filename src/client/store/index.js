import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducer'

import { subscribeToBets } from '../apolloClient'
import { betsAppendNew } from './actions'

const devTools =
	typeof window === 'object' &&
	typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
		? window.__REDUX_DEVTOOLS_EXTENSION__()
		: f => f

const defaultState = {
	bets: [],
	loaders: {},
	modalData: null,
}

const store = createStore(
	reducer,
	defaultState,
	compose(
		applyMiddleware(thunk),
		devTools,
	),
)

subscribeToBets(({ data }) => store.dispatch(betsAppendNew(data.allBets)))

export default store
