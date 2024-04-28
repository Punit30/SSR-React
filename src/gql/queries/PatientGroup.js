import { gql } from "@apollo/client"

export const getPatientGroupListQuery = gql`
	query {
		getPatientGroupList {
			id
			groupName
		}
	}
`
