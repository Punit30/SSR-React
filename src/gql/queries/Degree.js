import { gql } from "@apollo/client"

export const getDegreeListQuery = gql`
	query {
		getDegreeList {
			id
			degreeType
		}
	}
`
