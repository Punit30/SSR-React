import { gql } from "@apollo/client"

export const getAllNotesByUserIdQuery = gql`
	query getAllNotesByUserId($userId: Long!) {
		getAllNotesByUserId(userId: $userId) {
			id
			remarks
			creationDate
			lastModifiedDate
			noteCreatedBy {
				id
				email
				firstName
				lastName
			}
		}
	}
`
