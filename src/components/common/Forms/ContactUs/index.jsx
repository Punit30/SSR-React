"use client"
import { useMutation } from "@apollo/client"
import { Box, FormHelperText, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import { useSnackbar } from "notistack"
import React from "react"
import { USER_TYPES } from "@/Constants/data-types/types"
import { contactUsMutation } from "@/gql/mutations/ContactUs"
import { ScrollToFormError } from "@/helpers/FormErrorScroll"
import { TrackForm } from "@/app/GlobalObjects/store/actions/TrackForm"
import Button from "@/components/utilities/Button"
import InputLabelContainer from "@/components/utilities/InputLabelContainer"
import CustomSelect from "@/components/utilities/Select"
import validationSchema from "./validation/validation"

function ContactUsForm() {
	const { enqueueSnackbar } = useSnackbar()
	const [ContactUs] = useMutation(contactUsMutation)

	const formik = useFormik({
		initialValues: {
			email: "",
			firstName: "",
			lastName: "",
			userType: "",
			message: "",
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				await ContactUs({
					variables: values,
				})
				enqueueSnackbar("Thank you for your submission.", { variant: "mui-alert", color: "success" })
				TrackForm({ formId: "contact-us-form-submit", variant: "success" })
			} catch (e) {
				enqueueSnackbar("Submission failed. Please try again.", { variant: "mui-alert", color: "error" })
				TrackForm({ formId: "contact-us-form-submit", variant: "danger" })
			}
		},
	})

	return (
		<form onSubmit={formik.handleSubmit} onReset={formik.handleReset} style={{ maxWidth: "594px", width: "100%" }}>
			<ScrollToFormError formik={formik} />
			<Box className="f f-c w100" gap={{ xs: "16px", sm: "24px" }}>
				<InputLabelContainer label="Full Name">
					<Box
						className="f w100"
						flexDirection={{ xs: "column", sm: "row" }}
						gap={{ xs: "16px", sm: "24px" }}
					>
						<TextField
							datafieldname="firstName"
							fullWidth
							id="firstName"
							name="firstName"
							type="text"
							placeholder="Enter first name"
							variant="outlined"
							value={formik.values.firstName}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.firstName && Boolean(formik.errors.firstName)}
							helperText={formik.touched.firstName && formik.errors.firstName}
						/>
						<TextField
							fullWidth
							id="lastName"
							name="lastName"
							type="text"
							placeholder="Enter last name"
							variant="outlined"
							value={formik.values.lastName}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.lastName && Boolean(formik.errors.lastName)}
							helperText={formik.touched.lastName && formik.errors.lastName}
						/>
					</Box>
				</InputLabelContainer>
				<InputLabelContainer label="Email">
					<TextField
						datafieldname="email"
						fullWidth
						id="email"
						name="email"
						type="text"
						placeholder="Enter email address"
						variant="outlined"
						value={formik.values.email}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.email && Boolean(formik.errors.email)}
						helperText={formik.touched.email && formik.errors.email}
					/>
				</InputLabelContainer>
				<InputLabelContainer label="Which best describes you?">
					<CustomSelect
						datafieldname="userType"
						options={USER_TYPES}
						name="userType"
						meta={{ error: formik.errors.userType, touched: formik.touched.userType }}
						placeholder="Select"
						onBlur={() => formik.setFieldTouched("userType", true)}
						onChange={async (value) => {
							await formik.setFieldValue("userType", value !== null ? value.value : "")
							formik.validateField("userType")
						}}
					/>
				</InputLabelContainer>
				<InputLabelContainer label="Message">
					<>
						<Box className="f f-c">
							<textarea
								id="message"
								name="message"
								className={`text-area w100 h100 font-s14 font-w400 line-h19 ${
									formik.touched.message && Boolean(formik.errors.message) ? "text-area__error" : ""
								}`}
								placeholder="Type your message here"
								value={formik.values.message}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.message && Boolean(formik.errors.message) ? (
								<FormHelperText>{formik.touched.message && formik.errors.message}</FormHelperText>
							) : null}
						</Box>
						<Typography color="#717385" fontSize="14px" fontWeight="400" lineHeight="20px">
							If applicable, please mention your company name, company size, position & interest.
						</Typography>
					</>
				</InputLabelContainer>
				<Button
					id="contact_us_submit"
					className="track_button"
					variant="contained"
					color="purple"
					type="submit"
					disabled={formik.isSubmitting || !formik.dirty}
				>
					{formik.isSubmitting ? "Please wait..." : "Submit"}
				</Button>
			</Box>
		</form>
	)
}

export default ContactUsForm
