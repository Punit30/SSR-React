import * as Yup from "yup"

const validationSchema = Yup.lazy((values) => {
	return Yup.object().shape({
		degree: Yup.string().required("Please select a degree"),
		licenseNumber: Yup.array()
			.of(
				Yup.object({
					state: Yup.mixed().required("State is required"),
					number: Yup.string().required("License number is required"),
				})
			)
			.min(1, "Please enter at least one license number")
			.max(7, "Maximum 7 license numbers can be added"),
		speciality: Yup.array().min(1, "Please select at least one speciality"),
		otherSpeciality: Yup.string().when("speciality", {
			is: (speciality) => speciality && speciality.some((item) => item.value === "Other"),
			then: () => Yup.string().required("Other speciality is required"),
		}),
	})
})

export default validationSchema
