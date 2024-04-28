import * as Yup from "yup"

const validationSchema = Yup.object().shape({
	email: Yup.string().email("Please enter a valid email.").required("Please enter your email."),
	password: Yup.string().required("Please enter your password."),
})

export default validationSchema
