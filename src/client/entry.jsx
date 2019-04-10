import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import store from './store'

import { Provider } from 'react-redux'

import './common.styl'

const main = () => {
	const rootElement = document.getElementById('app')
	if (rootElement) {
		render(
			<Provider store={store}>
				<App />
			</Provider>,
			rootElement,
		)
	}
}

main()
