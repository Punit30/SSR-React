import * as Yup from "yup"

const validationSchema = Yup.object().shape({
	email: Yup.string().email("Please enter a valid email.").required("Please enter your email."),
	issueType: Yup.string().required("Please select an option."),
	comment: Yup.string().required("Please enter comment."),
})

export default validationSchema
