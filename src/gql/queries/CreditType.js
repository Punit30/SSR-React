import { gql } from "@apollo/client"

export const getCreditTypeListQuery = gql`
	query {
		getCreditTypeList {
			id
			name
		}
	}
`
