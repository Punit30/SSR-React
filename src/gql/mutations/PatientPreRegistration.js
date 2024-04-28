import { gql } from "@apollo/client"

export const patientPreRegisterMutation = gql`
	mutation PatientPreRegister($email: String!, $zipCode: String) {
		preRegisterPatient(patientInput: { email: $email, zipCode: $zipCode }) {
			message
			statusCode
		}
	}
`
