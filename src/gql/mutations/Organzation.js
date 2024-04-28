import { gql } from "@apollo/client"

export const dltOrganisationMutation = gql`
	mutation deleteOrganisation($organisationId: Long!) {
		deleteOrganisation(organisationId: $organisationId) {
			message
			statusCode
		}
	}
`

export const addOrganisationMutation = gql`
	mutation registerOrganisation($code: String!, $name: String!) {
		registerOrganisation(organisationInput: { code: $code, name: $name }) {
			message
			statusCode
		}
	}
`

export const updateOrganisationMutation = gql`
	mutation updateOrganisation($id: ID!, $code: String, $name: String) {
		updateOrganisation(organisationUpdateInput: { id: $id, code: $code, name: $name }) {
			message
			statusCode
		}
	}
`