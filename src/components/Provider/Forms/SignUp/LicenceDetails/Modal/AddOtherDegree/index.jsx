import React from "react"
import CustomDialog from "../../../../../../utilities/Dialog"
import { Box, TextField, Typography } from "@mui/material"
import IconFrame from "../../../../../../utilities/IconFrame"
import { FiAlertTriangle } from "react-icons/fi"
import { useFormik } from "formik"
import InputLabelContainer from "../../../../../../utilities/InputLabelContainer"
import Button from "../../../../../../utilities/Button"
import validationSchema from "./validation/validation"
import { useMutation } from "@apollo/client"
import { addOtherDegreeMutation } from "../../../../../../../gql/mutations/Degree"
import { connect } from "react-redux"
import { TrackForm } from "../../../../../../../app/GlobalObjects/store/actions/TrackForm"
import { useSnackbar } from "notistack"

function AddOtherDegree({ open, handleClose = () => {}, handlePostSubmit = () => {}, id, email }) {
	const { enqueueSnackbar } = useSnackbar()
	const [AddOtherDegree] = useMutation(addOtherDegreeMutation)

	const formik = useFormik({
		initialValues: { degree: "" },
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				await AddOtherDegree({ variables: { email: email, name: values.degree } })
				handlePostSubmit()
				TrackForm({ formId: "provider_notify_for_speciality_form_submit", variant: "success" })
			} catch (e) {
				enqueueSnackbar("Submission failed. Please try again.", { variant: "mui-alert", color: "error" })
				TrackForm({ formId: "provider_notify_for_speciality_form_submit", variant: "danger" })
			}
		},
	})

	return (
		<CustomDialog
			open={open}
			close={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			width="432px"
		>
			<Box className="f f-c g24 p24">
				<Box className="f f-c g16 align-center">
					<IconFrame
						icon={<FiAlertTriangle />}
						iconColor="#DC6803"
						iconSize="24px"
						backgroundColor="#FEF0C7"
						boxSize="48px"
					/>
					<Box className="f f-c g8 align-center">
						<Typography
							color="#101828"
							textAlign="center"
							fontSize="18px"
							fontWeight="600"
							lineHeight="26px"
						>
							We are not currently onboarding providers with your qualifications.{" "}
						</Typography>
						<Typography
							color="#667085"
							textAlign="center"
							fontSize="14px"
							fontWeight="400"
							lineHeight="20px"
						>
							We will be expanding soon! Please enter your information to be notified when we do.
						</Typography>
					</Box>
				</Box>

				<form className="f f-c g32" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
					<InputLabelContainer label="Degree or qualification" datafieldname="degree">
						<TextField
							fullWidth
							id="degree"
							name="degree"
							type="text"
							placeholder="e.g., LCSW, home health aid"
							variant="outlined"
							value={formik.values.degree}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.degree && Boolean(formik.errors.degree)}
							helperText={formik.touched.degree && formik.errors.degree}
						/>
					</InputLabelContainer>
					<Box className="f align-center g12">
						<Button
							id="patient_sign_up_modal_cancel"
							className="track_button"
							fullWidth
							type="reset"
							variant="outlined"
							color="gray"
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
				</form>
			</Box>
		</CustomDialog>
	)
}

const mapStateToProps = (state) => ({
	id: state.session.layoutReducer.providerSignUp.providerId,
	email: state.session.layoutReducer.providerSignUp.email,
})

export default connect(mapStateToProps)(AddOtherDegree)
