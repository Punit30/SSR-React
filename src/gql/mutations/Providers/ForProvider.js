import { gql } from "@apollo/client"

// Sign up mutations
export const emailPasswordMutation = gql`
	mutation SignUpEmailPassword($email: String!, $password: String!, $roleName: RoleName!) {
		registerUser(signUpInput: { email: $email, roleName: $roleName, password: $password })
	}
`

export const markSurveyCompletionMutation = gql`
	mutation {
		markSurveyCompletion {
			statusCode
			message
		}
	}
`

export const firstLastNameMutation = gql`
	mutation SignUpFirstLastName(
		$providerId: Long!
		$firstName: String!
		$lastName: String!
		$contactNumber: String!
		$organisationCode: String!
	) {
		addOrUpdateProviderTitle(
			providerId: $providerId
			providerTitle: {
				firstName: $firstName
				lastName: $lastName
				contactNumber: $contactNumber
				organisationCode: $organisationCode
			}
		) {
			message
			statusCode
		}
	}
`

export const addOrUpdateProviderPersonalDetailMutation = gql`
	mutation addOrUpdateProviderPersonalDetail(
		$firstName: String
		$lastName: String
		$pronouns: PronounInput
		$gender: GenderInput
		$isTransgender: Choice
		$isLGBTQIA: Choice
		$ethnicity: [Ethnicity]
		$languages: LanguageInput
		$isProfileDeleted: Boolean
		$ageGroup: AgeGroup
		$practiceYears: PracticeYears
	) {
		addOrUpdateProviderPersonalDetail(
			personalDetail: {
				firstName: $firstName
				lastName: $lastName
				pronouns: $pronouns
				gender: $gender
				isTransgender: $isTransgender
				isLGBTQIA: $isLGBTQIA
				ethnicity: $ethnicity
				languages: $languages
				isProfileDeleted: $isProfileDeleted
				ageGroup: $ageGroup
				practiceYears: $practiceYears
			}
		) {
			message
			statusCode
		}
	}
`

export const addOrUpdateProviderBackgorundDetailMutation = gql`
	mutation addOrUpdateProviderBackgroundDetail(
		$providerId: Long!
		$isLGBTQIA: Choice
		$hasInfluencedBehaviour: Boolean
		$wantToLearnCRC: Boolean
		$topicsInterestedIn: String
		$knowledgeLevel: KnowledgeLevel
		$confidenceLevel: ConfidenceLevel
		$additionalServices: [AdditionalServiceInput!]
		$notableExperiences: [String!]
	) {
		addOrUpdateProviderBackgroundDetail(
			backgroundDetail: {
				providerId: $providerId
				isLGBTQIA: $isLGBTQIA
				hasInfluencedBehaviour: $hasInfluencedBehaviour
				wantToLearnCRC: $wantToLearnCRC
				topicsInterestedIn: $topicsInterestedIn
				knowledgeLevel: $knowledgeLevel
				confidenceLevel: $confidenceLevel
				additionalServices: $additionalServices
				notableExperiences: $notableExperiences
			}
		) {
			statusCode
			message
		}
	}
`

export const addOrUpdateUserProfilePicMutation = gql`
	mutation addOrUpdateUserProfilePic($userId: Long!) {
		addOrUpdateUserProfilePic(userId: $userId) {
			id
			launchLink
		}
	}
`

export const addOrUpdateProviderProfessionalDetailMutation = gql`
	mutation addOrUpdateProviderProfessionalDetail(
		$providerId: Long!
		$degree: [DegreeInput]
		$additionalDegrees: [DegreeInput]
		$speciality: [SpecialityInput]
		$subSpeciality: [SubSpecialityInput]
		$licences: [LicenceInput]
		$additionalServices: [AdditionalServiceInput]
		$aboutYou: String
		$patientGroups: [PatientGroupInput]
		$isResumeDeleted: Boolean
	) {
		addOrUpdateProviderProfessionalDetail(
			providerId: $providerId
			professionalDetail: {
				primaryDegree: $degree
				additionalDegree: $additionalDegrees
				specialities: $speciality
				subSpecialities: $subSpeciality
				licences: $licences
				additionalServices: $additionalServices
				aboutYou: $aboutYou
				patientGroups: $patientGroups
				isResumeDeleted: $isResumeDeleted
			}
		) {
			message
			statusCode
		}
	}
`

export const addOrUpdateProviderResumeMutation = gql`
	mutation addOrUpdateProviderResume($userId: Long!) {
		addOrUpdateProviderResume(userId: $userId) {
			id
			launchLink
		}
	}
`

export const addOrUpdateProviderPracticeInformationMutation = gql`
	mutation addOrUpdateProviderPracticeInformation(
		$acceptsInPerson: Boolean!
		$acceptsInVirtual: Boolean!
		$practiceName: String
		$addressLine1: String
		$addressLine2: String
		$city: String
		$state: String!
		$country: String
		$zipCode: String
		$hideLocation: Boolean
		$states: [String!]
		$practiceUrl: String
		$preferenceInput: [ProviderPreferenceInput!]!
		$payment: PaymentOptionInput
	) {
		addOrUpdateProviderPracticeInformation(
			practiceInput: {
				acceptsInPerson: $acceptsInPerson
				acceptsInVirtual: $acceptsInVirtual
				inPersonInput: {
					practiceName: $practiceName
					addressLine1: $addressLine1
					addressLine2: $addressLine2
					city: $city
					state: $state
					country: $country
					zipCode: $zipCode
					hideLocation: $hideLocation
				}
				virtualInput: { states: $states }
				practiceUrl: $practiceUrl
				preferenceInput: $preferenceInput
				paymentOptionInput: $payment
			}
		) {
			statusCode
			message
		}
	}
`

export const deleteCMECertificateMutation = gql`
	mutation deleteCMECertificate($certificateId: Long!) {
		deleteCMECertificate(certificateId: $certificateId) {
			statusCode
			message
		}
	}
`

export const providerInterviewDetailMutation = gql`
	mutation addProviderInterviewDetail(
		$providerId: Long!
		$eventId: String!
		$startTime: String!
		$endTime: String!
		$inviteeId: String!
		$inviteeEmail: String!
	) {
		addProviderInterviewDetail(
			providerId: $providerId
			interviewDetailInput: {
				eventId: $eventId
				startTime: $startTime
				endTime: $endTime
				inviteeId: $inviteeId
				inviteeEmail: $inviteeEmail
			}
		) {
			statusCode
			message
		}
	}
`
