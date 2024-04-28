import * as Yup from "yup"

const validationSchema = Yup.object().shape({
	degree: Yup.string().required("Please select any one degree."),
	specialty: Yup.array().min(1, "Please select at least one specialty."),
	// additionalService: Yup.array().min(
	//   1,
	//   "Please select at least one additional services."
	// ),
	// experience: Yup.array().min(1, "Please select at least one."),
	otherExperience: Yup.string().when("experience", {
		is: (experience) => experience.includes("Other"),
		then: () => Yup.string().required("Please enter a patient group."),
	}),
	resumeFile: Yup.mixed()
		.notRequired()
		.test("fileFormat", "File format must be pdf.", (value) => {
			if (value !== null) {
				return value.type === "application/pdf"
			} else {
				return true
			}
		}),
})

export default validationSchema
