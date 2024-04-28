import { gql } from "@apollo/client"

export const updateProviderInterviewStatusMutation = gql`
	mutation updateProviderInterviewStatus(
		$providerId: Long!
		$id: String!
		$startTime: String
		$endTime: String
		$status: InterviewStatus
	) {
		updateProviderInterviewStatus(
			providerId: $providerId
			updateInput: { id: $id, startTime: $startTime, endTime: $endTime, status: $status }
		) {
			message
			statusCode
		}
	}
`
