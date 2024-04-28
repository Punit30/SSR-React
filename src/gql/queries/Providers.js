import { gql } from "@apollo/client"

export const getAllProviderQuery = gql`
	query {
		getAllProvider {
			id
			email
			firstName
			lastName
			status
			organisation {
				id
				name
			}
			primaryDegree {
				degreeType
			}
			isVetted
			hasCompletedSurvey
			suggestedResourceDetail {
				completed
				total
			}
		}
	}
`

export const getPreRegisteredProvidersQuery = gql`
	query {
		getPreRegisteredProviders {
			id
			firstName
			lastName
			email
			message
			state
			licenseType
			creationDate
		}
	}
`

export const getProviderByIdQuery = gql`
	query getProvider($providerId: Long!) {
		getProvider(providerId: $providerId) {
			email
			firstName
			lastName
			status
			isVetted
			licences {
				id
				state
				number
				status
			}
		}
	}
`

export const getProviderInfoQuery = gql`
	query getProvider($providerId: Long!) {
		getProvider(providerId: $providerId) {
			id
			firstName
			lastName
			email
			ethnicities
			isTransgender
			isLGBTQIA
			acceptsInPerson
			acceptsInVirtual
			contactNumber
			practiceURL
			profilePicUrl
			aboutYou
			isVetted
			primaryDegree {
				id
				degreeType
			}
			additionalDegree {
				id
				degreeType
			}
			licences {
				id
				state
				number
				status
			}
			genders {
				id
				name
			}
			pronouns {
				id
				name
			}
			virtualPractices {
				id
				states {
					name
				}
			}
			inPersonPractices {
				id
				practiceName
				addressLine1
				addressLine2
				city
				state
				country
				zipCode
				hideLocation
				isActive
			}
			preferences {
				id
				preferenceType
				value
			}
			languages {
				id
				name
			}
			specialities {
				id
				specialization
			}
			subSpecialities {
				id
				specialization
			}
			additionalServices {
				id
				serviceName
			}
			patientGroups {
				id
				groupName
				isVerified
			}
			paymentOptions {
				names
			}
		}
	}
`

export const getProviderPersonalDetailQuery = gql`
	query getProviderPersonalDetail($providerId: String!) {
		getProviderPersonalDetail(providerId: $providerId) {
			firstName
			lastName
			profilePicUrl
			isTransgender
			isLGBTQIA
			ethnicity
			languages
			otherLanguages
			genders
			otherGenders
			pronouns
			otherPronouns
			ageGroup
			practiceYears
		}
	}
`

export const getProviderProfessionalDetailQuery = gql`
	query getProviderProfessionalDetail($providerId: String!) {
		getProviderProfessionalDetail(providerId: $providerId) {
			primaryDegree {
				id
				degreeType
			}
			additionalDegree {
				id
				degreeType
			}
			specialities {
				id
				specialization
			}
			otherSpecialities {
				id
				specialization
			}
			subSpecialities {
				id
				specialization
			}
			licences {
				id
				state
				number
				status
			}
			additionalServices {
				id
				serviceName
			}
			aboutYou
			patientGroups {
				id
				groupName
			}
			otherPatientGroups {
				id
				groupName
			}
		}
	}
`

export const getResumeByIdQuery = gql`
	query getResumeById($userId: Long!) {
		getResumeById(userId: $userId) {
			id
			launchLink
		}
	}
`

export const getProviderPracticeDetailQuery = gql`
	query getProviderPracticeDetail($providerId: String!) {
		getProviderPracticeDetail(providerId: $providerId) {
			acceptsInPerson
			acceptsInVirtual
			inPersonDetail {
				id
				practiceName
				addressLine1
				addressLine2
				city
				state
				country
				zipCode
				hideLocation
				isActive
			}
			virtualPracticeDetail {
				id
				states {
					name
				}
			}
			practiceUrl
			preferenceDetail {
				id
				preferenceType
				value
				isActive
			}
			paymentOption
			otherPaymentOption
		}
	}
`

export const getAllCertificatesByProviderIdQuery = gql`
	query getAllCertificatesByProviderId($providerId: Long!) {
		getAllCertificatesByProviderId(providerId: $providerId) {
			certificateId
			certificateName
			certificateURL
			completionDate
			status
			points
			rating
		}
	}
`

export const getCMECertificateByIdQuery = gql`
	query getCMECertificateById($certificateId: Long!) {
		getCMECertificateById(certificateId: $certificateId) {
			launchLink
			id
		}
	}
`
