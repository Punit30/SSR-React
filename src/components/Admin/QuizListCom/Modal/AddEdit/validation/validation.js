import * as Yup from "yup"
import { ONLY_DIGIT_PATTERN } from "../../../../../../Constants/regex"

const validationSchema = Yup.object().shape({
	question: Yup.string().required("Please enter the question."),
	marks: Yup.string()
		.required("Please enter marks.")
		.matches(ONLY_DIGIT_PATTERN, "The field should have digits only."),
	tags: Yup.array().min(1, "Please select at least one tag."),
	topics: Yup.array().min(1, "Please select at least one topic."),
	specialities: Yup.array().when("tags", {
		is: (tags) => tags.some((item) => item.value === "MEDICAL"),
		then: () => Yup.array().min(1, "Please select at least one specialty."),
		otherwise:() => Yup.array(),
	}),
	options: Yup.array().of(
		Yup.object().shape({
			value: Yup.string().required("Option should not be empty."),
			isCorrect: Yup.boolean(),
		})
	).min(2, "At least 2 options are required")
	.test("at-least-one-correct", "At least one option must be correct.", (value) => {
		return value && value.some((option) => option.isCorrect === true);
	}),
})

export default validationSchema
