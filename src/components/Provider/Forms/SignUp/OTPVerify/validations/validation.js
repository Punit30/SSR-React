import * as Yup from "yup"

const validationSchema = Yup.object().shape({
	value: Yup.string().required("Please enter verification code."),
})

export default validationSchema
