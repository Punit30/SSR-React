import { gql } from "@apollo/client"

export const addSpecialtyMutation = gql`
	mutation addSpeciality($name: String!) {
		addSpeciality(name: $name) {
			message
			statusCode
		}
	}
`

export const updateSpecialtyMutation = gql`
	mutation updateSpecialization($specialityId: ID, $specialization: String, $otherSpecialization: String) {
		updateSpecialization(
			specialityUpdateInput: {
				specialityId: $specialityId
				specialization: $specialization
				otherSpecialization: $otherSpecialization
			}
		) {
			message
			statusCode
		}
	}
`

export const dltSpecialtyMutation = gql`
	mutation removeSpeciality($name: String!) {
		removeSpeciality(name: $name) {
			message
			statusCode
		}
	}
`
