import { gql } from "@apollo/client"

export const getOrganisationListQuery = gql`
	query {
		getOrganisationList {
			id
			name
			code
		}
	}
`

export const getOrganizationByCodeQuery = gql`
	query getOrganisationByCode($organisationCode: String!) {
		getOrganisationByCode(organisationCode: $organisationCode) {
			id
			name
			code
		}
	}
`
