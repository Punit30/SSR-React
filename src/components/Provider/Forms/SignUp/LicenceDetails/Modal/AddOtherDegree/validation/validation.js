import * as Yup from "yup"

const validationSchema = Yup.object().shape({
	degree: Yup.string().required("Please enter your degree."),
})

export default validationSchema
