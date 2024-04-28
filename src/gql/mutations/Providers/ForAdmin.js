import { gql } from "@apollo/client"

export const addUpdateProviderAccountStatusMutation = gql`
	mutation addOrUpdateProviderStatus($providerId: Long, $accountStatus: AccountStatus) {
		addOrUpdateProviderStatus(providerId: $providerId, accountStatus: $accountStatus) {
			statusCode
			message
		}
	}
`

export const updateProviderVettingStatusMutation = gql`
	mutation updateProviderVettingStatus($providerId: String, $vettingStatus: Boolean) {
		updateProviderVettingStatus(providerId: $providerId, vettingStatus: $vettingStatus) {
			statusCode
			message
		}
	}
`

export const dltProviderMutation = gql`
	mutation deleteUser($id: Long!) {
		deleteUser(id: $id) {
			statusCode
			message
		}
	}
`
