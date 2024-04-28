import { gql } from "@apollo/client"

export const findAProviderQuery = gql`
	query getAllProviderByCriteria(
		$specialty: String
		$zipcode: String
		$specialityFilter: [String!]
		$gender: [String!]
		$ethnicity: [Ethnicity!]
		$isTransgender: Choice
		$isLGBTQIA: Choice
		$patientGroup: [String!]
		$additionalServices: [String!]
		$paymentOptions: [String!]
		$language: [String!]
		$acceptsClient: AcceptClientInput
	) {
		getAllProviderByCriteria(
			searchInput: { zipcode: $zipcode, specialty: $specialty }
			filterInput: {
				speciality: $specialityFilter
				gender: $gender
				ethnicity: $ethnicity
				isTransgender: $isTransgender
				isLGBTQIA: $isLGBTQIA
				patientGroup: $patientGroup
				additionalServices: $additionalServices
				paymentOptions: $paymentOptions
				language: $language
				acceptsClient: $acceptsClient
			}
		) {
			searchResult {
				id
				firstName
				lastName
				email
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
				subSpecialities {
					id
					specialization
				}
				additionalServices {
					id
					serviceName
				}
				status
				isVetted
				profilePicUrl
				acceptsInPerson
				acceptsInVirtual
				inPersonPractices {
					city
					state
					hideLocation
				}
				virtualPractices {
					states {
						name
					}
				}
			}
		}
	}
`
