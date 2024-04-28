import * as Yup from "yup"

// Custom Yup method to validate image file format
Yup.addMethod(Yup.mixed, "fileFormat", function (message) {
	return this.test("fileFormat", message, function (value) {
		if (!value) return true // Skip validation if no file is provided
		const supportedFormats = ["image/jpg", "image/png", "image/jpeg", "image/webp"]
		return value && supportedFormats.includes(value.type)
	})
})

const validationSchema = Yup.object().shape({
	firstName: Yup.string().required("Please enter your first name."),
	lastName: Yup.string().required("Please enter your last name."),
	file: Yup.mixed().nullable().fileFormat("File format must be png/jpeg/jpg."),
	pronouns: Yup.array().min(1, "Please select at least one pronoun."),
	additionalPronouns: Yup.string().when("pronouns", {
		is: (pronouns) => pronouns.includes("Additional"),
		then: () => Yup.string().required("Please enter additional pronouns."),
	}),
	gender: Yup.array().min(1, "Please select at least one gender."),
	additionalGender: Yup.string().when("gender", {
		is: (gender) => gender.includes("Additional"),
		then: () => Yup.string().required("Please enter additional gender."),
	}),
	race: Yup.array().min(1, "Please select at least one race."),
	language: Yup.array(),
	otherLanguage: Yup.string().when("language", {
		is: (language) => language.includes("Other"),
		then: () => Yup.string().required("Please enter other language."),
	}),
	LGBTQIA: Yup.string().required("Please select any one option."),
	transgender: Yup.string().required("Please select any one option."),
})

export default validationSchema
