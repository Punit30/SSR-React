import { gql } from "@apollo/client";

export const getPreRegisteredPatientsQuery = gql`
	query {
		getPreRegisteredPatients {
			id
			email
			creationDate
			zipCode
		}
	}
`