"use client"
import { useMutation } from "@apollo/client"
import { Box, CssBaseline, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import React, { useEffect } from "react"
import { connect, useDispatch } from "react-redux"
import { patientPreRegisterMutation } from "../../../../gql/mutations/PatientPreRegistration"
import { ScrollToFormError } from "../../../../helpers/FormErrorScroll"
import { setPrePatientRegisterModal } from "../../../../app/GlobalObjects/store/reducers/Modal"
import Button from "../../../utilities/Button"
import CustomDialog from "../../../utilities/Dialog"
import InputLabelContainer from "../../../utilities/InputLabelContainer"
import validationSchema from "./validation/validation"

function PrePatientRegisterModal(props) {
	const dispatch = useDispatch()
	const [PreRegisterPaitent] = useMutation(patientPreRegisterMutation)

	const handleClose = () => {
		dispatch(setPrePatientRegisterModal(false))
	}

	const formik = useFormik({
		initialValues: {
			email: "",
			zipCode: "",
		},
		validationSchema: validationSchema,
		onSubmit: async (values, { setSubmitting }) => {
			try {
				await PreRegisterPaitent({ variables: values })

				enqueueSnackbar("Thank you! You will be notified about updates.", {
					variant: "mui-alert",
					color: "success",
				})
				TrackForm({ formId: "patient_signup_modal_form_submit", variant: "success" })

				handleClose()
			} catch (e) {
				enqueueSnackbar("Submission failed. Please try again.", {
					variant: "mui-alert",
					color: "error",
				})
				TrackForm({ formId: "patient_signup_modal_form_submit", variant: "danger" })
			}
		},
	})

	useEffect(() => {
		formik.resetForm()
	}, [props.open])

	return (
		<CustomDialog
			open={props.open}
			close={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			width="432px"
		>
			<CssBaseline />
			<Box className="f f-c g32 align-center" padding="24px">
				<Box className="f f-c align-center g8">
					<Typography color="#253010" fontSize="18px" fontWeight="600" lineHeight="26px">
						Coming soon
					</Typography>
					<Typography color="#596088" textAlign="center" fontSize="14px" fontWeight="400" lineHeight="20px">
						Please enter your information to be notified when providers are available in your area.
					</Typography>
				</Box>
				<form onSubmit={formik.handleSubmit} onReset={formik.handleReset} style={{ width: "100%" }}>
					<ScrollToFormError formik={formik} />
					<Box className="f f-c g32">
						<Box className="f f-c g20">
							<InputLabelContainer label="Email">
								<TextField
									datafieldname="email"
									fullWidth
									id="email"
									name="email"
									type="text"
									placeholder="Enter your email"
									variant="outlined"
									value={formik.values.email}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.email && Boolean(formik.errors.email)}
									helperText={formik.touched.email && formik.errors.email}
								/>
							</InputLabelContainer>
							<InputLabelContainer label="Zip code">
								<TextField
									datafieldname="zipCode"
									fullWidth
									id="zipCode"
									name="zipCode"
									type="text"
									placeholder="Enter your zip code"
									variant="outlined"
									value={formik.values.zipCode}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
									helperText={formik.touched.zipCode && formik.errors.zipCode}
								/>
							</InputLabelContainer>
						</Box>
						<Box className="w100 f g12 align-center justify-s-b">
							<Button
								id="patient_sign_up_modal_cancel"
								className="track_button"
								fullWidth
								type="reset"
								variant="outlined"
								color="purple"
								onClick={handleClose}
							>
								Cancel
							</Button>
							<Button
								id="patient_signup_modal_submit"
								className="track_button"
								fullWidth
								type="submit"
								variant="contained"
								color="purple"
								disabled={formik.isSubmitting || !formik.dirty}
							>
								{formik.isSubmitting ? "Please wait..." : "Notify me"}
							</Button>
						</Box>
					</Box>
				</form>
			</Box>
		</CustomDialog>
	)
}

const mapStateToProps = (state) => ({
	open: state.modalReducer.prePatientRegister,
})

export default connect(mapStateToProps)(PrePatientRegisterModal)
