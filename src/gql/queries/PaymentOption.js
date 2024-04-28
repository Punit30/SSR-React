import { gql } from "@apollo/client"

export const getPaymentOptionsListQuery = gql`
	query {
		getPaymentOptionList
	}
`
