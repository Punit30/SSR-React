import * as Yup from "yup"

const validationSchema = Yup.object().shape({
	note: Yup.string().required("Please fill in this field."),
})

export default validationSchema
