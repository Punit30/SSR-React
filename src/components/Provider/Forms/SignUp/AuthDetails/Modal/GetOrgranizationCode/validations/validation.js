import * as Yup from "yup"

const validationSchema = Yup.object().shape({
	orgCode: Yup.string().required("Please enter organization code."),
})

export default validationSchema