import * as Yup from "yup"

const validationSchema = Yup.object().shape({
	isLGBTQIA: Yup.string().required("Please select any one option."),
	// notableExperiences: Yup.array().min(1, "Please select at least one option."),
	// additionalService: Yup.array().min(
	//   1,
	//   "Please select at least one additional services."
	// ),
	confidenceLevel: Yup.string().required("Please select any one option."),
	knowledgeLevel: Yup.string().required("Please select any one option."),
	wantToLearnCRC: Yup.boolean().nullable().required("Please select any one option."),
	hasInfluencedBehaviour: Yup.boolean().nullable().required("Please select any one option."),
	// topicsInterestedIn: Yup.string().required("Please enter topics."),
})

export default validationSchema
