"use client"
import { useMutation } from "@apollo/client"
import { Box, CssBaseline, FormHelperText, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import { useSnackbar } from "notistack"
import React, { useEffect } from "react"
import { IoWarningOutline } from "react-icons/io5"
import { connect, useDispatch } from "react-redux"
import validationSchema from "./validation/validation"
import { setHelpModal } from "@/app/GlobalObjects/store/reducers/Modal"
import { helpUsMutation } from "@/gql/mutations/Help"
import { TrackForm } from "@/app/GlobalObjects/store/actions/TrackForm"
import CustomDialog from "@/components/utilities/Dialog"
import IconFrame from "@/components/utilities/IconFrame"
import { ScrollToFormError } from "@/helpers/FormErrorScroll"
import InputLabelContainer from "@/components/utilities/InputLabelContainer"
import CustomSelect from "@/components/utilities/Select"
import { ISSUE_TYPES } from "@/Constants/data-types/types"
import Button from "@/components/utilities/Button"

function HelpModal(props) {
	const dispatch = useDispatch()
	const { enqueueSnackbar } = useSnackbar()
	const [HelpUs] = useMutation(helpUsMutation)

	const handleClose = () => {
		dispatch(setHelpModal(false))
	}

	const formik = useFormik({
		initialValues: {
			email: props.signupEmail || props.loggedInMail,
			issueType: "",
			comment: "",
		},
		validationSchema: validationSchema,
		onSubmit: async (values, { setSubmitting }) => {
			try {
				await HelpUs({ variables: values })

				enqueueSnackbar("Thank you. Your request has been submitted.", {
					variant: "mui-alert",
					color: "success",
				})
				TrackForm({ formId: "help_us_modal_submit", variant: "success" })

				handleClose()
			} catch (e) {
				enqueueSnackbar("Submission failed. Please try again.", {
					variant: "mui-alert",
					color: "error",
				})
				TrackForm({ formId: "help_us_modal_submit", variant: "danger" })
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
			customWidthOptions={{ xs: "initial", sm: "100%" }}
			width="550px"
		>
			<CssBaseline />
			<Box className="f f-c g32" padding="24px" overflow="auto">
				<Box className="f f-c g16">
					<IconFrame
						icon={<IoWarningOutline />}
						iconColor="#dc6803"
						iconSize="24px"
						backgroundColor="#fef0c7"
						boxSize="48px"
					/>
					<Box className="f f-c g8">
						<Typography color="#253010" fontSize="18px" fontWeight="600" lineHeight="26px">
							How can we help you?
						</Typography>
						<Typography color="#596088" fontSize="14px" fontWeight="400" lineHeight="20px">
							We are here to assist you. Please describe your issue & we will get back to you soon.
						</Typography>
					</Box>
				</Box>
				<form onSubmit={formik.handleSubmit} onReset={formik.handleReset} style={{ width: "100%" }}>
					<ScrollToFormError formik={formik} />
					<Box className="f f-c g32">
						<Box className="f f-c g20">
							{!props.sigupMail && !props.loggedInMail ? (
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
							) : null}
							<InputLabelContainer label="What do you need help with?">
								<CustomSelect
									options={ISSUE_TYPES}
									name="issueType"
									meta={{ error: formik.errors.issueType, touched: formik.touched.issueType }}
									placeholder="Select"
									onBlur={() => formik.setFieldTouched("issueType", true)}
									onChange={async (value) => {
										await formik.setFieldValue("issueType", value !== null ? value.value : "")
										formik.validateField("issueType")
									}}
								/>
							</InputLabelContainer>
							<InputLabelContainer label="Please leave a comment">
								<Box className="f f-c">
									<textarea
										id="comment"
										name="comment"
										className={`text-area w100 h100 font-s14 font-w400 line-h19 resize-vertical ${
											formik.touched.comment && Boolean(formik.errors.comment)
												? "text-area__error"
												: ""
										}`}
										placeholder="Type your comment here"
										value={formik.values.comment}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.comment && Boolean(formik.errors.comment) ? (
										<FormHelperText>
											{formik.touched.comment && formik.errors.comment}
										</FormHelperText>
									) : null}
								</Box>
							</InputLabelContainer>
						</Box>
						<Box className="w100 f g12 align-center justify-end">
							<Button
								id="help_modal_form_close"
								className="track_button"
								type="reset"
								variant="outlined"
								color="purple"
								onClick={handleClose}
							>
								Cancel
							</Button>
							<Button
								id="help_modal_form_submit"
								className="track_button"
								disabled={formik.isSubmitting || !formik.dirty}
								type="submit"
								variant="contained"
								color="purple"
							>
								{formik.isSubmitting ? "Please wait..." : "Submit"}
							</Button>
						</Box>
					</Box>
				</form>
			</Box>
		</CustomDialog>
	)
}

const mapStateToProps = (state) => ({
	signupMail: state.session.layoutReducer.providerSignUp.email,
	loggedInMail: state.local.userReducer.email,
	open: state.modalReducer.help,
})

export default connect(mapStateToProps)(HelpModal)
