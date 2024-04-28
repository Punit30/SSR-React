import { useMutation } from "@apollo/client"
import { Box, FormHelperText, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import _ from "lodash"
import { useSnackbar } from "notistack"
import React, { useState } from "react"
import { LICENCE_TYPE } from "../../../../Constants/data-types/licence-type"
import { STATES } from "../../../../Constants/data-types/states-types"
import { comingSoonMutation } from "../../../../gql/mutations/ProviderCommingSoon"
import { ScrollToFormError } from "../../../../helpers/FormErrorScroll"
import { TrackForm } from "../../../../app/GlobalObjects/store/actions/TrackForm"
import Button from "../../../utilities/Button"
import InputLabelContainer from "../../../utilities/InputLabelContainer"
import CustomSelect from "../../../utilities/Select"
import validationSchema from "./validation/validation"

function ProviderLaunchingSoonForm() {
	const { enqueueSnackbar } = useSnackbar()
	const [otherLicenseType, setOtherLicenseType] = useState(false)

	const [CommingSoon] = useMutation(comingSoonMutation)

	const formik = useFormik({
		initialValues: {
			email: "",
			firstName: "",
			lastName: "",
			state: [],
			licenseType: [],
			otherLicenseType: "",
			message: "",
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				await CommingSoon({
					variables: {
						...values,
						state: _.map(values.state, (state) => state.value),
						licenseType: _.map(values.licenseType, (licenseType) => {
							if (licenseType.value !== "Other") {
								return licenseType.value
							} else {
								return "Other - " + values.otherLicenseType
							}
						}),
					},
				})

				enqueueSnackbar("Thank you! You will be notified about updates.", {
					variant: "mui-alert",
					color: "success",
				})
				TrackForm({ formId: "provider_coming_soon_form_submit", variant: "success" })
			} catch (e) {
				enqueueSnackbar("Submission failed. Please try again.", { variant: "mui-alert", color: "error" })
				TrackForm({ formId: "provider_coming_soon_form_submit", variant: "danger" })
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
				<InputLabelContainer label="In which state(s) are you licensed (in person or telehealth)?">
					<CustomSelect
						isMulti
						datafieldname="state"
						options={STATES}
						name="state"
						meta={{ error: formik.errors.state, touched: formik.touched.state }}
						placeholder="Select all that apply"
						onBlur={() => formik.setFieldTouched("state", true)}
						onChange={async (value) => {
							await formik.setFieldValue("state", value !== null ? value.value : "")
							formik.validateField("state")
						}}
					/>
				</InputLabelContainer>
				<InputLabelContainer label="What type of license(s) do you have?">
					<CustomSelect
						isMulti
						datafieldname="licenseType"
						options={LICENCE_TYPE}
						name="licenseType"
						meta={{ error: formik.errors.licenseType, touched: formik.touched.licenseType }}
						placeholder="Select all that apply"
						onBlur={() => formik.setFieldTouched("licenseType", true)}
						onChange={async (value) => {
							value.some((item) => item.value === "Other")
								? setOtherLicenseType(true)
								: setOtherLicenseType(false)
							await formik.setFieldValue("licenseType", value)
							formik.validateField("licenseType")
						}}
					/>
				</InputLabelContainer>

				{otherLicenseType ? (
					<InputLabelContainer label="Other license type">
						<TextField
							datafieldname="otherLicenseType"
							fullWidth
							id="otherLicenseType"
							name="otherLicenseType"
							type="text"
							placeholder="Enter license type"
							variant="outlined"
							value={formik.values.otherLicenseType}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.otherLicenseType && Boolean(formik.errors.otherLicenseType)}
							helperText={formik.touched.otherLicenseType && formik.errors.otherLicenseType}
						/>
					</InputLabelContainer>
				) : null}

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
							The message may not be longer than 1000 characters.
						</Typography>
						<Typography color="#717385" fontSize="14px" fontWeight="400" lineHeight="20px">
							Let us know if you are interested in enrolling your entire practice, or if you have any
							questions or additional comments.
						</Typography>
					</>
				</InputLabelContainer>
				<Button
					id="launching_soon_submit"
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

export default ProviderLaunchingSoonForm
