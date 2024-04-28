import { gql } from "@apollo/client"

export const addNoteMutation = gql`
	mutation addNotes($remarks: String!, $assignedTo: Long!) {
		addNotes(notesInput: { remarks: $remarks, assignedTo: $assignedTo }) {
			statusCode
			message
		}
	}
`

export const editNoteMutation = gql`
	mutation updateNotes($id: Long!, $remarks: String!, $assignedTo: Long!) {
		updateNotes(noteUpdateInput: { id: $id, remarks: $remarks, assignedTo: $assignedTo }) {
			statusCode
			message
		}
	}
`

export const dltNoteMutation = gql`
	mutation deleteNotes($notesId: Long!) {
		deleteNotes(notesId: $notesId) {
			message
			statusCode
		}
	}
`
