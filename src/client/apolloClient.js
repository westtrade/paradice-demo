import { ApolloClient } from 'apollo-client'
import { gql } from 'apollo-boost'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { InMemoryCache } from 'apollo-cache-inmemory'

const ENDPOINT = location.host
const IS_SECURE = location.protocol === 'https'

const httpLink = new HttpLink({
	uri: `http${IS_SECURE ? 's' : ''}://${ENDPOINT}/api/api.php`,
})

const wsLink = new WebSocketLink({
	uri: `ws${IS_SECURE ? 's' : ''}:///${ENDPOINT}/api/subscriptions`,
	options: {
		reconnect: true,
	},
})

const link = split(
	({ query }) => {
		const { kind, operation } = getMainDefinition(query)
		return kind === 'OperationDefinition' && operation === 'subscription'
	},
	wsLink,
	httpLink,
)

const ACCESS_TOKEN =
	'gHteOx2jzWyjbFcmAar74tgx8iQuDK5xMtktgk6ZfjVWb6geGuV8cVTWR3u9wyQk'

const client = new ApolloClient({
	link,
	cache: new InMemoryCache(),
})

export default client

export const ALL_BETS = gql`
	query {
		allBets {
			id
			date
			user
			betAmount
			winAmount
			number
			rollSide
			currency
			roll
			win
			multiplier
			chance
		}
	}
`
export const fetchAllBets = () =>
	client.query({
		query: ALL_BETS,
	})

export const BET_INFO = gql`
	query Bet($id: Int!) {
		betInfo(id: $id) {
			id
			date
			user
			betAmount
			winAmount
			number
			rollSide
			currency
			roll
			win
			multiplier
			chance
		}
	}
`
export const fetchBetInfo = id =>
	client.query({
		query: BET_INFO,
		variables: {
			id: parseInt(id),
		},
	})

export const ROLL_DICE = gql`
	mutation(
		$number: Float!
		$betAmount: Float!
		$side: RollSideEnum!
		$currency: CurrencyEnum!
	) {
		rollDice(
			number: $number
			betAmount: $betAmount
			side: $side
			currency: $currency
		) {
			id
		}
	}
`
export const rollDice = (variables = {}) =>
	client.mutate({
		mutation: ROLL_DICE,
		variables,
		context: {
			headers: {
				'x-access-token': ACCESS_TOKEN,
			},
		},
	})

export const subscribeToBets = next =>
	client
		.subscribe({
			query: gql`
				subscription {
					allBets {
						id
						date
						user
						betAmount
						winAmount
						number
						rollSide
						currency
						roll
						win
						multiplier
						chance
					}
				}
			`,
		})
		.subscribe({
			next: next,
		})
