import { gql } from "@apollo/client"

export const loginQuery = gql`
	query login($email: String!, $password: String!) {
		login(loginRequest: { email: $email, password: $password }) {
			accessToken
			expiration
			refreshToken
		}
	}
`

export const refreshTokenQuery = gql`
	query RefreshToken($refreshToken: String!) {
		refreshToken(tokenRequest: { refreshToken: $refreshToken }) {
			accessToken
			expiration
			refreshToken
		}
	}
`
