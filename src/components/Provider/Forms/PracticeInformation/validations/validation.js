import * as Yup from "yup"
import { ONLY_DIGIT_PATTERN, PHONE_NUMBER_PATTERN, URL_PATTERN } from "../../../../../Constants/regex"

const validationSchema = Yup.object().shape({
	provideCare: Yup.array().min(1, "Please select at least one."),
	// addressLine1: Yup.string().when("provideCare", {
	// 	is: (provideCare) => provideCare.includes("inPerson"),
	// 	then: Yup.string().required("Please enter address line 1."),
	// }),
	// addressLine2: Yup.string().when("provideCare", {
	//   is: (provideCare) => provideCare.includes("inPerson"),
	//   then: Yup.string().required("Please enter address line 2."),
	// }),
	state: Yup.string().when("provideCare", {
		is: (provideCare) => provideCare.includes("inPerson"),
		then: () => Yup.string().required("Please select state."),
	}),
	city: Yup.string().when("provideCare", {
		is: (provideCare) => provideCare.includes("inPerson"),
		then: () => Yup.string().required("Please enter city."),
	}),
	zipCode: Yup.string().when("provideCare", {
		is: (provideCare) => provideCare.includes("inPerson"),
		then: () =>
			Yup.string()
				.required("Please enter zip or postal.")
				.test("Digits only", "Zip code must contain digits only.", (value) => ONLY_DIGIT_PATTERN.test(value)),
	}),
	stateLicensed: Yup.array().when("provideCare", {
		is: (provideCare) => provideCare.includes("virtual"),
		then: () => Yup.array().min(1, "Please select at least one state."),
	}),
	practiceURL: Yup.string().when("contactYou", {
		is: (contactYou) => contactYou.includes("WEBSITE"),
		then: () =>
			Yup.string()
				.required("Please enter your practice website URL.")
				.matches(URL_PATTERN, "Please enter valid URL."),
	}),
	insurance: Yup.array().min(1, "Please select at least one."),
	otherInsurance: Yup.string().when("insurance", {
		is: (insurance) => insurance.includes("Other"),
		then: () => Yup.string().required("Please enter other payment type."),
	}),
	contactYou: Yup.array().min(1, "Please select at least one."),
	practiceEmail: Yup.string().when("contactYou", {
		is: (contactYou) => contactYou.includes("EMAIL"),
		then: () => Yup.string().email("Please enter a valid email.").required("Please enter your practice email."),
	}),
	practicePhone: Yup.string().when("contactYou", {
		is: (contactYou) => contactYou.includes("PHONE"),
		then: () =>
			Yup.string()
				.matches(PHONE_NUMBER_PATTERN, "Please enter a valid phone number.")
				.required("Please enter your practice phone."),
	}),
})

export default validationSchema
