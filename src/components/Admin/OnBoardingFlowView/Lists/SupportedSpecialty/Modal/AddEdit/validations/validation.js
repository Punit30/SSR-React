import * as Yup from "yup"

const validationSchema = Yup.object().shape({
	name: Yup.string().required(`Please enter specialty name.`),
})

export default validationSchema
