import { gql } from "@apollo/client"

export const getAllCourseGroupsQuery = gql`
	query {
		getAllCMECourseByGroup {
			id
			title
			description
			cmeCourses {
				id
				title
				topics
				specialities
				description
				cmeCourseType
				cmeCourseFormat
				tags
				credits
				creditType
				startDate
				expirationDate
				creationDate
				requiredStates
				feedbackUrl
				courseOverview
				jointProviderShip
				source
				sequenceNumber
				providerCourse {
					isStateRequired
					cmeCourseStatus
					completionDate
				}
			}
			sequenceNumber
		}
	}
`

export const getCMECourseBySuggestionQuery = gql`
	query getCMECourseSuggestions($providerId: Long!) {
		getCMECourseSuggestions(providerId: $providerId) {
			completed
			total
			suggestedCMECourses {
				id
				title
				topics
				specialities
				description
				cmeCourseType
				cmeCourseFormat
				tags
				credits
				creditType
				startDate
				expirationDate
				creationDate
				requiredStates
				feedbackUrl
				courseOverview
				jointProviderShip
				source
				sequenceNumber
				providerCourse {
					isStateRequired
					cmeCourseStatus
					completionDate
				}
				cmeCourseLink
				isActive
			}
		}
	}
`

export const getAllCoursesByCriteriaQuery = gql`
	query getAllCourseByCriteria(
		$providerId: Long!
		$cmeCourseName: String
		$cmeGroupName: String
		$creditHours: [Float!]
		$courseFormat: [CMECourseFormat!]
		$creditType: [String!]
		$states: [String!]
		$topics: [String!]
	) {
		getAllCourseByCriteria(
			providerId: $providerId
			searchInput: { cmeCourseName: $cmeCourseName, cmeGroupName: $cmeGroupName }
			filterInput: {
				creditHours: $creditHours
				courseFormat: $courseFormat
				creditType: $creditType
				states: $states
				topics: $topics
			}
		) {
			searchResult {
				id
				title
				description
				cmeCourses {
					id
					title
					topics
					specialities
					description
					cmeCourseType
					cmeCourseFormat
					tags
					credits
					creditType
					startDate
					expirationDate
					creationDate
					requiredStates
					feedbackUrl
					courseOverview
					jointProviderShip
					source
					sequenceNumber
					providerCourse {
						isStateRequired
						cmeCourseStatus
						completionDate
					}
					cmeCourseGroupId
					cmeCourseGroupTitle
					cmeCourseLink
					isActive
				}
				sequenceNumber
			}
		}
	}
`

export const getCourseTitleListQuery = gql`
	query {
		getCMECourseTitleList {
			id
			title
		}
	}
`

export const getCMECourseQuery = gql`
	query getCMECourse($courseId: String!) {
		getCMECourse(courseId: $courseId) {
			id
			title
			topics
			specialities
			description
			cmeCourseType
			cmeCourseFormat
			tags
			credits
			creditType
			startDate
			expirationDate
			creationDate
			requiredStates
			feedbackUrl
			courseOverview
			jointProviderShip
			source
			sequenceNumber
			providerCourse {
				isStateRequired
				cmeCourseStatus
				completionDate
			}
			cmeCourseLink
			isActive
		}
	}
`
