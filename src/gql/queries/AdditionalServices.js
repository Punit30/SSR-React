import { gql } from "@apollo/client"

export const getAdditionalServiceListQuery = gql`
	query {
		getAdditionalServiceList {
			id
			serviceName
		}
	}
`
