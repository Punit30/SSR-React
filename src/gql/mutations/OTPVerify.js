import { gql } from "@apollo/client"

export const sendOTPMutation = gql`
	mutation sendOtp($email: String!) {
		sendOtp(otpInput: { email: $email }) {
			message
			statusCode
		}
	}
`
