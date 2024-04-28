"use client"
import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache, fromPromise } from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import store from "@/app/GlobalObjects/store/store"
import { setAuth } from "@/app/GlobalObjects/store/reducers/Auth"
import { BACKENDAPI } from "@/Constants/contants"

export const getAccessToken = () => {
	const state = store.getState()
	return state.local.authReducer.accessToken ?? ""
}

export const getRefreshToken = () => {
	const state = store.getState()
	return state.local.authReducer.refreshToken ?? ""
}

export const setTokens = (accessToken, refreshToken) => {
	store.dispatch(
		setAuth({
			accessToken: accessToken,
			refreshToken: refreshToken,
		})
	)
}

const getNewToken = async () => {
	try {
		const refreshToken = getRefreshToken()
		// const refreshToken = localStorage.getItem("refreshToken");
		const getRefreshTokenQuery = (refreshToken) => {
			return JSON.stringify({
				query: `
						{
						refreshToken(
							tokenRequest:{
								token: "${refreshToken}"
								}
							){
								refreshToken
								accessToken
							}
						}
					`,
			})
		}
		const performQuery = async (query) => {
			const res = await fetch(BACKENDAPI, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: query,
			})

			return res.json()
		}
		const refreshTokenQueryBody = getRefreshTokenQuery(refreshToken)
		const res = await performQuery(refreshTokenQueryBody)

		setTokens(res.data.refreshToken.accessToken, res.data.refreshToken.refreshToken)
		return res.data.refreshToken.accessToken
	} catch (error) {
		setTokens(null, null)
		throw error
	}
}

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
	if (networkError) {
		// toast("danger", "Please check your network connection as it seems you are not connected to the internet.")
		return
	}

	if (graphQLErrors) {
		for (let err of graphQLErrors) {
			if (err.message.includes("Access is denied") || err.message.includes("Invalid Token")) {
				return fromPromise(
					getNewToken().catch((error) => {
						return
					})
				)
					.filter((value) => Boolean(value))
					.flatMap((accessToken) => {
						const oldHeaders = operation.getContext().headers
						// modify the operation context with a new token
						operation.setContext({
							headers: {
								...oldHeaders,
								authorization: `Bearer ${accessToken}`,
							},
						})

						// retry the request, returning the new observable
						return forward(operation)
					})
			}
		}
	}
})

const httpLink = new createHttpLink({ uri: BACKENDAPI })

const authLink = new ApolloLink((operation, forward) => {
	const accessToken = getAccessToken()
	operation.setContext(({ headers }) => ({
		headers: {
			...headers,
			authorization: accessToken ? `Bearer ${accessToken}` : "",
		},
	}))
	return forward(operation)
})

export default new ApolloClient({
	link: errorLink.concat(authLink.concat(httpLink)),
	cache: new InMemoryCache(),
	headers: {
		"Content-Type": "application/json",
	},
})
