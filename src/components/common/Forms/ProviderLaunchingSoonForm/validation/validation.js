import * as Yup from "yup"

const validationSchema = Yup.object().shape({
	email: Yup.string().email("Please enter a valid email.").required("Please enter your email."),
	firstName: Yup.string().max(50, "Too Long!").required("Please enter your first name."),
	lastName: Yup.string().max(50, "Too Long!").required("Please enter your last name."),
	state: Yup.array().min(1, "Please select at least one state."),
	licenseType: Yup.array().min(1, "Please select at least one license."),
	otherLicenseType: Yup.string().when("licenseType", {
		is: (licenseType) => licenseType.some((item) => item.value === "Other"),
		then: () => Yup.string().required("Please enter other license type."),
	}),
	message: Yup.string().max(1000, "The message may not be longer than 1000 characters."),
})

export default validationSchema
