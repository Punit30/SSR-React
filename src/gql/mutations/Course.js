import { gql } from "@apollo/client"

export const addUpdateCMECourseMutation = gql`
	mutation addOrUpdateCMECourse(
		$id: String
		$title: String
		$topics: [String!]
		$specialities: [String!]
		$description: String
		$cmeCourseType: CMECourseType!
		$cmeCourseFormat: CMECourseFormat
		$tags: [CMECourseTag!]
		$cmeCourseLink: String
		$credits: String
		$creditType: [String!]
		$cmeCourseGroupId: Long!
		$startDate: String
		$expirationDate: String
		$requiredStates: [String!]
		$feedbackUrl: String
		$courseOverview: String
		$jointProviderShip: Boolean!
		$source: Source!
	) {
		addOrUpdateCMECourse(
			cmeCourseInput: {
				id: $id
				title: $title
				topics: $topics
				specialities: $specialities
				description: $description
				cmeCourseType: $cmeCourseType
				cmeCourseFormat: $cmeCourseFormat
				tags: $tags
				cmeCourseLink: $cmeCourseLink
				credits: $credits
				creditType: $creditType
				cmeCourseGroupId: $cmeCourseGroupId
				startDate: $startDate
				expirationDate: $expirationDate
				requiredStates: $requiredStates
				feedbackUrl: $feedbackUrl
				courseOverview: $courseOverview
				jointProviderShip: $jointProviderShip
				source: $source
			}
		) {
			response {
				statusCode
				message
			}
			cmeId
			version
		}
	}
`

export const addEditCourseGroupMutation = gql`
	mutation addOrUpdateCMECourseGroup($id: Long, $title: String, $description: String) {
		addOrUpdateCMECourseGroup(cmeCourseGroupInput: { id: $id, title: $title, description: $description }) {
			statusCode
			message
		}
	}
`

export const reArrageCourseGroupsMutation = gql`
	mutation reOrderCMECourseGroups($orderList: [OrderInput!]) {
		reOrderCMECourseGroups(orderInput: { orderList: $orderList }) {
			statusCode
			message
		}
	}
`

export const reArrangeCoursesMutation = gql`
	mutation reOrderCMECourses($cmeCourseGroupId: Long!, $orderList: [OrderInput!]) {
		reOrderCMECourses(orderInput: { cmeCourseGroupId: $cmeCourseGroupId, orderList: $orderList }) {
			statusCode
			message
		}
	}
`

export const dltCourseGroupMutation = gql`
	mutation deleteCMECourseGroup($cmeCourseGroupId: Long!) {
		deleteCMECourseGroup(cmeCourseGroupId: $cmeCourseGroupId) {
			statusCode
			message
		}
	}
`

export const dltCourseMutation = gql`
	mutation deleteCMECourse($cmeCourseId: String!) {
		deleteCMECourse(cmeCourseId: $cmeCourseId) {
			statusCode
			message
		}
	}
`

export const getCourseUploadLinkMutation = gql`
	mutation getCMEUploadLink($id: String!, $source: Source!, $version: String) {
		getCMEUploadLink(uploadInput: { id: $id, source: $source, version: $version }) {
			id
			source
			version
			url
		}
	}
`

export const updateCourseStatusMutation = gql`
	mutation updateCMEStatus($id: String!, $source: Source!, $version: String, $status: Boolean!) {
		updateCMEStatus(cmeStatusInput: { id: $id, source: $source, version: $version, status: $status }) {
			statusCode
			message
		}
	}
`

export const launchCourseMutation = gql`
	mutation launchCMECourse($courseId: String, $providerId: Long) {
		launchCMECourse(courseId: $courseId, providerId: $providerId) {
			launchLink
			cmeCourse {
				title
				description
				cmeCourseGroupTitle
				credits
			}
		}
	}
`
