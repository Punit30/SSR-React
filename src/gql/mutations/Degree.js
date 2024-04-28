import { gql } from "@apollo/client"

export const addDegreeMutation = gql`
	mutation addDegree($name: String!) {
		addDegree(name: $name) {
			message
			statusCode
		}
	}
`

export const dltDegreeMutation = gql`
	mutation removeDegree($degreeId: Long!) {
		removeDegree(degreeId: $degreeId) {
			message
			statusCode
		}
	}
`

export const updateDegreeMutation = gql`
	mutation updateDegree($degreeId: ID, $degreeType: String!) {
		updateDegree(degreeUpdateInput: { degreeId: $degreeId, degreeType: $degreeType }) {
			message
			statusCode
		}
	}
`

export const addOtherDegreeMutation = gql`
	mutation addOtherDegree($email: String!, $name: String!) {
		addOtherDegree(email: $email, name: $name) {
			message
			statusCode
		}
	}
`
