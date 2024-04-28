import * as Yup from "yup"
import { PASSWORD_PATTERN } from "../../../../../../Constants/regex"


const validationSchema = Yup.object().shape({
	newPassword: Yup.string()
		.min(8, "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.")
		.matches(
			PASSWORD_PATTERN,
			"Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character."
		)
		.required("Please enter your new password."),
	confirmPassword: Yup.string()
		.required("Please re-enter your new password.")
		.oneOf([Yup.ref("newPassword")], "New and confirm password must be same."),
})

export default validationSchema
