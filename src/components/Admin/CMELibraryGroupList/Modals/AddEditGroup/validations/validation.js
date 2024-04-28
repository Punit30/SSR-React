import * as Yup from "yup"

const validationSchema = Yup.object().shape({
	title: Yup.string().required("Please enter resource group name."),
})

export default validationSchema
