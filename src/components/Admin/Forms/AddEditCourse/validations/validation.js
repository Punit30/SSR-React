import * as Yup from "yup"
import { URL_PATTERN } from "../../../../../Constants/regex"

const validationSchema = Yup.object().shape({
	title: Yup.string().required("Please enter CME title."),
	description: Yup.string().required("Please enter source."),
	topics: Yup.array().min(1, "Please select at least one topic."),
	tags: Yup.array().min(1, "Please select at least one tag."),
	courseFormat: Yup.string().required("Please select at least one course format."),
	specialty: Yup.array().when("tags", {
		is: (tags) => tags.includes("MEDICAL"),
		then: (schema) => schema.min(1, "Please select at least one specialty."),
	}),
	credit: Yup.string().required("Please select a credit."),
    creditType: Yup.array().min(1,"Please select atleast credit type."),
    publishDate: Yup.string().required("Please enter publish date."),
    expirationDate: Yup.string().required("Please enter expiration date."),
	courseType: Yup.string().required("Please enter course type."),
	cmeCourseLink: Yup.string().when("courseType", {
		is: (courseType) => (courseType === "LINK"),
		then: (schema) => schema.required("Please enter a URL.").matches(URL_PATTERN, "Please enter a valid URL."),
	}),
	file: Yup.mixed()
		.when("courseType", {
			is: (courseType) => courseType === "DOCUMENT",
			then: () => Yup.mixed()
				.required("Please upload course.")
				.test("fileFormat", "File format must be pdf.", (value) => {
					return value && value.type === "application/pdf"
				}),
		})
		.when("courseType", {
			is: (courseType) => courseType === "VIDEO",
			then: () => Yup.mixed()
				.required("Please upload course.")
				.test("fileFormat", "File format must be mp4.", (value) => {
					return value && value.type === "video/mp4"
				}),
		})
		.when("courseType", {
			is: (courseType) => courseType === "AUDIO",
			then: () => Yup.mixed()
				.required("Please upload course.")
				.test("fileFormat", "File format must be mp3.", (value) => {
					return value && ["audio/mp3", "audio/mpeg"].includes(value.type)
				}),
		})
		.when("courseType", {
			is: (courseType) => courseType === "SCORM",
			then: () => Yup.mixed()
				.required("Please upload course.")
				.test("fileFormat", "File format must be zip.", (value) => {
					return value && ["application/zip"].includes(value.type)
				}),
		}),
})

function getFileFormatMessage(value) {
	switch (this.options.context.courseType) {
		case "DOCUMENT":
			return "File format must be pdf, doc or txt."
		case "VIDEO":
			return "File format must be mp4 or mkv."
		case "AUDIO":
			return "File format must be mp3."
		case "SCROM":
			return "File format must be zip."
		default:
			return "Invalid file format."
	}
}

function validateFileFormat(value) {
	switch (this.options.context.courseType) {
		case "DOCUMENT":
			return value && ["application/msword", "text/plain", "application/pdf"].includes(value.type)
		case "VIDEO":
			return value && ["video/mp4", "video/mkv"].includes(value.type)
		case "AUDIO":
			return value && ["audio/mp3", "audio/mpeg"].includes(value.type)
		case "SCROM":
			return value && value.type === "application/zip"
		default:
			return false
	}
}

export default validationSchema
