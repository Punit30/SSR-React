import { gql } from "@apollo/client"

export const getSpecialityListQuery = gql`
	query {
		getSpecialityList {
			id
			specialization
		}
	}
`
