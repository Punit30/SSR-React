import * as Yup from "yup"
import { NORMAL_ALPHA_NUM_PATTERN } from "../../../../../../../../Constants/regex"

const validationSchema = Yup.object().shape({
	name: Yup.string().required("Please enter organization name."),
	code: Yup.string()
		.matches(NORMAL_ALPHA_NUM_PATTERN, `Organization code can only contain alphabetic or alphanumeric characters.`)
		.required(`Please enter organization code.`),
})

export default validationSchema
