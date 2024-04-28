import * as Yup from "yup"
import {
	ALPHA_NUMERIC_PATTERN,
	PASSWORD_PATTERN,
	PHONE_NUMBER_PATTERN,
	SPACE_CONTAINS_PATTERN,
} from "../../../../../../Constants/regex"

const validationSchema = Yup.object().shape({
	email: Yup.string().email("Please enter a valid email").required("Please enter your email."),
	firstName: Yup.string()
		.max(30, "Too Long!")
		.matches(ALPHA_NUMERIC_PATTERN, "Please enter valid first name.")
		.matches(SPACE_CONTAINS_PATTERN, "First name cannot contain spaces.")
		// .matches(/[^\s*].*[^\s*]/g, "This field cannot contain only blankspaces")
		.required("Please enter your first name."),
	lastName: Yup.string()
		.max(30, "Too Long!")
		.matches(ALPHA_NUMERIC_PATTERN, "Please enter valid last name.")
		.matches(SPACE_CONTAINS_PATTERN, "Last name cannot contain spaces.")
		// .matches(/[^\s*].*[^\s*]/g, "This field cannot contain only blankspaces")
		.required("Please enter your last name."),
	phoneNumber: Yup.string()
		.matches(PHONE_NUMBER_PATTERN, "Please enter a valid phone number.")
		.required("Please enter your phone number."),
	password: Yup.string()
		.min(
			8,
			"Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character."
		)
		.matches(
			PASSWORD_PATTERN,
			"Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character."
		)
		.required(
			"Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character."
		),
})

export default validationSchema
