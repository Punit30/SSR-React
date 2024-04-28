import { useMutation } from "@apollo/client"
import { Box, CssBaseline, FormHelperText, IconButton, Tooltip, Typography } from "@mui/material"
import { useFormik } from "formik"
import { MuiOtpInput } from "mui-one-time-password-input"
import { useSnackbar } from "notistack"
import React, { useEffect, useRef, useState } from "react"
import { FiEdit3 } from "react-icons/fi"
import { connect, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { verifyOTPMutation } from "../../../../../gql/mutations/Auth"
import { sendOTPMutation } from "../../../../../gql/mutations/OTPVerify"
import { setForgetPass } from "../../../../../app/GlobalObjects/store/reducers/Layout"
import Button from "../../../../utilities/Button"
import InputLabelContainer from "../../../../utilities/InputLabelContainer"
import MailChange from "../../../Modals/MailChange"
import validationSchema from "./validations/validation"
import { TrackForm } from "../../../../../app/GlobalObjects/store/actions/TrackForm"

function FPOTPVerifyForm({ email }) {
	const Ref = useRef(null)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { enqueueSnackbar } = useSnackbar()
	const [timer, setTimer] = useState("00:30")
	const [resendDisable, setResendDisable] = useState(true)
	const [editMailModal, setEditMailModal] = useState(false)

	const [SendOtp] = useMutation(sendOTPMutation)
	const [VerfiyOtp] = useMutation(verifyOTPMutation)

	const getTimeRemaining = (e) => {
		const total = Date.parse(e) - Date.parse(new Date())
		const seconds = Math.floor((total / 1000) % 60)
		const minutes = Math.floor((total / 1000 / 60) % 60)
		return {
			total,
			minutes,
			seconds,
		}
	}

	const resetTimer = () => {
		clearTimer(getDeadTime())
	}

	const startTimer = (e) => {
		let { total, minutes, seconds } = getTimeRemaining(e)
		if (minutes === 0 && seconds === 0) {
			setResendDisable(false)
		}
		if (total >= 0) {
			setTimer((minutes > 9 ? minutes : "0" + minutes) + ":" + (seconds > 9 ? seconds : "0" + seconds))
		}
	}

	const clearTimer = (deadTime, time = "00:30") => {
		setTimer(time)

		if (Ref.current) clearInterval(Ref.current)
		const id = setInterval(() => {
			startTimer(deadTime)
		}, 1000)
		Ref.current = id
	}

	const getDeadTime = () => {
		let deadline = new Date()

		deadline.setSeconds(deadline.getSeconds() + 30)
		return deadline
	}

	useEffect(() => {
		resetTimer()
	}, [])

	const formik = useFormik({
		initialValues: { value: "" },
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				await VerfiyOtp({
					variables: { email: email, value: values.value },
				})
				dispatch(setForgetPass({ OTPVerified: true }))
				navigate("/forget-password/change-password")
				TrackForm({ formId: "forget_password_otp_verification", variant: "success" })
			} catch (e) {
				_.forEach(_.get(e, "graphQLErrors", []), ({ message }) =>
					enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
				)
				TrackForm({ formId: "forget_password_otp_verification", variant: "danger" })
			}
		},
	})

	const handleSendOTP = async (diffMail = null) => {
		try {
			await SendOtp({
				variables: { email: diffMail || email },
			})
			TrackForm({ formId: "send_otp_form_submit", variant: "success" })
			enqueueSnackbar("OTP sent successfully.", { variant: "mui-alert", color: "success" })
		} catch (e) {
			TrackForm({ formId: "send_otp_form_submit", variant: "danger" })
			e.graphQLErrors.forEach(({ message }) => enqueueSnackbar(message, { variant: "mui-alert", color: "error" }))
		}
	}

	const handleReSendOTP = (newMail = null) => {
		formik.resetForm()
		setResendDisable(true)
		resetTimer()
		handleSendOTP(newMail)
	}

	const handleEditMail = async (newMail) => {
		try {
			dispatch(setForgetPass({ email: newMail }))

			setEditMailModal(false)
			handleReSendOTP(newMail)

			TrackForm({ formId: "edit_email_modal_form", variant: "success" })
			enqueueSnackbar("Your email has been updated.", { variant: "mui-alert", color: "success" })
		} catch (e) {
			enqueueSnackbar("Email update failed. Please try again.", { variant: "mui-alert", color: "error" })
			TrackForm({ formId: "edit_email_modal_form", variant: "danger" })
		}
	}

	return (
		<>
			<MailChange
				open={editMailModal}
				preMail={email}
				handleSubmit={handleEditMail}
				handleClose={() => setEditMailModal(false)}
			/>
			<CssBaseline />
			<Box className="f f-c" gap={{ xs: "32px", md: "48px" }}>
				<Box className="f f-c g8">
					<Typography
						color="#1B1C20"
						fontFamily="Poppins"
						fontSize={{ xs: "24px", md: "32px" }}
						fontWeight="600"
						lineHeight={{ xs: "33px", md: "44px" }}
					>
						Account verification
					</Typography>
					<Box display="inline">
						<Typography display="inline" color="#717385" fontSize="16px" fontWeight="400" lineHeight="26px">
							Verification code has been sent to {email}
						</Typography>{" "}
						<Tooltip title="Edit mail">
							<IconButton
								id="forget_passwrod_change_mail"
								className="track_button"
								sx={{ padding: "4px" }}
								onClick={() => setEditMailModal(true)}
							>
								<FiEdit3 size="20px" color="#814CD6" />
							</IconButton>
						</Tooltip>
					</Box>
				</Box>
				<form
					className="f f-c"
					style={{ gap: "48px", maxWidth: "512px" }}
					onSubmit={formik.handleSubmit}
					onReset={formik.handleReset}
				>
					<Box className="f f-c g8">
						<InputLabelContainer label="Enter the verification code">
							<MuiOtpInput
								className="otp-input-container__otp-input"
								value={formik.values.value}
								type="numeric"
								length={6}
								onChange={(value) => formik.setFieldValue("value", value)}
								onBlur={() => formik.setFieldTouched("value", true)}
								TextFieldsProps={{
									placeholder: "-",
									sx: {
										"& .MuiOutlinedInput-input": {
											height: "48px",
										},
									},
									error: Boolean(formik.errors.value) && formik.touched.value,
								}}
							/>
							{Boolean(formik.errors.value) && formik.touched.value ? (
								<FormHelperText>{formik.errors.value}</FormHelperText>
							) : null}
						</InputLabelContainer>
						<Box display="inline">
							<Typography
								display="inline"
								color="#717385"
								fontSize="14px"
								fontWeight="400"
								lineHeight="20px"
							>
								Resend code in
							</Typography>{" "}
							<Typography
								display="inline"
								color="#14882F"
								fontSize="14px"
								fontWeight="600"
								lineHeight="20px"
							>
								{timer}
							</Typography>
						</Box>
					</Box>
					<Box className="f f-c g16 w100 align-center">
						<Box display="inline">
							<Typography
								display="inline"
								color="#717385"
								fontSize="14px"
								fontWeight="400"
								lineHeight="20px"
							>
								Didn't receive the code?
							</Typography>{" "}
							<Button
								id="otp_not_received"
								className="track_button"
								type="button"
								sx={{ display: "inline", fontSize: "14px", lineHeight: "20px" }}
								variant="text"
								color="purple"
								disableRipple
								disabled={resendDisable}
								onClick={handleReSendOTP}
							>
								Resend code
							</Button>
						</Box>
						<Button
							id="otp_verification_submit"
							className="track_button"
							fullWidth
							variant="contained"
							color="purple"
							type="submit"
							disabled={formik.isSubmitting || !formik.dirty}
						>
							{formik.isSubmitting ? "Please wait..." : "Verify"}
						</Button>
					</Box>
				</form>
			</Box>
		</>
	)
}

const mapStateToProps = (state) => ({
	email: state.session.layoutReducer.forgetPass.email,
})

export default connect(mapStateToProps)(FPOTPVerifyForm)
