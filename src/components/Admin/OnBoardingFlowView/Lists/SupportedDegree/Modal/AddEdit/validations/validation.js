import * as Yup from "yup"
import { NORMAL_ALPHA_NUM_PATTERN } from "../../../../../../../../Constants/regex"

const validationSchema = Yup.object().shape({
	name: Yup.string()
		.matches(NORMAL_ALPHA_NUM_PATTERN, `Degree name can only contain alphabetic or alphanumeric characters.`)
		.required(`Please enter degree name.`),
})

export default validationSchema
