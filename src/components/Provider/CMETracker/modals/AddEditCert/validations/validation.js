import * as Yup from "yup"

const validationSchema = Yup.object().shape({
	// certificate_name: Yup.string()
	//     .required("Please enter CME course title.")
	//     .matches(/^[^|\\\/-]*$/, {
	//         message: "Title must not conatin |, \\, /, -",
	//         excludeEmptyString: true,
	//     }),
	certName: Yup.string().required("Please select any one CME title."),
	file: Yup.mixed()
		.required("Please upload your CME certificate.")
		.test("fileFormat", "File format must be pdf.", (value) => {
			return value && value.type === "application/pdf"
		}),
	completionDate: Yup.string().required("Please enter CME certificate completion date."),
	rating: Yup.object().required("Please select any one option."),
	value: Yup.string().required("Please select credits earned."),
	// .matches(/^(?:0(?:\.\d{1,2})?|1(?:\.\d{1,2})?|2(?:\.00?)?)$/, {
	// 	message: "Please enter a credit value between 0 and 2, with a maximum of two decimal places.",
	// 	excludeEmptyString: true,
	// }),
	// .test('is-decimal', "Credit must be less than or equal to 2 and not more than 2 decimal places.", (value) => {
	// 	return parseFloat(value) <= 2
	// })
})

export default validationSchema
