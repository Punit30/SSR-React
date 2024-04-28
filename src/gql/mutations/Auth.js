import { gql } from "@apollo/client"

export const changePasswordMutation = gql`
	mutation changePassword($email: String!, $event: PasswordEvent!, $oldPassword: String, $newPassword: String!) {
		changePassword(
			passwordInput: { email: $email, event: $event, oldPassword: $oldPassword, newPassword: $newPassword }
		) {
			message
			statusCode
		}
	}
`

export const sendOTPMutation = gql`
	mutation sendOtp($email: String!) {
		sendOtp(otpInput: { email: $email }) {
			message
			statusCode
		}
	}
`

export const verifyOTPMutation = gql`
	mutation verifyOtp($email: String!, $value: String!) {
		verifyOtp(otpInput: { email: $email, value: $value }) {
			message
			statusCode
		}
	}
`

export const editEmailMutation = gql`
	mutation addOrUpdateUserEmail($userId: Long!, $emailInput: String!) {
		addOrUpdateUserEmail(userId: $userId, emailInput: $emailInput) {
			statusCode
			message
		}
	}
`
