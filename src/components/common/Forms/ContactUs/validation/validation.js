import * as Yup from "yup"

const validationSchema = Yup.object().shape({
	email: Yup.string().email("Please enter a valid email.").required("Please enter your email."),
	firstName: Yup.string().max(50, "Too Long!").required("Please enter your first name."),
	lastName: Yup.string().max(50, "Too Long!"),
	userType: Yup.string().required("Please select at least one option."),
	message: Yup.string().required("Please enter your message."),
})

export default validationSchema
