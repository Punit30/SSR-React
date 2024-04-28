import * as Yup from "yup"
import { ONLY_DIGIT_PATTERN } from "../../../../../Constants/regex"

const validationSchema = Yup.object().shape({
	email: Yup.string().email("Please enter a valid email.").required("Please enter your email."),
	zipCode: Yup.string()
		.required("Please enter zip code.")
		.test("Digits only", "The field should have digits only", (value) => ONLY_DIGIT_PATTERN.test(value)),
})

export default validationSchema
