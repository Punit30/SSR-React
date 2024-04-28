import { useMutation } from "@apollo/client"
import { useFormik } from "formik"
import React, { useState } from "react"
import { connect, useDispatch } from "react-redux"
import validationSchema from "./validations/validation"
import { resetUser } from "../../../../app/GlobalObjects/store/reducers/User"
import { removeAuth } from "../../../../app/GlobalObjects/store/reducers/Auth"
import { resetData } from "../../../../app/GlobalObjects/store/reducers/Data"
import { changePasswordMutation } from "../../../../gql/mutations/Auth"
import { Box, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import Button from "../../../utilities/Button"
import InputLabelContainer from "../../../utilities/InputLabelContainer"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { TrackForm } from "../../../../app/GlobalObjects/store/actions/TrackForm"
import { useSnackbar } from "notistack"
import { useNavigate } from "react-router-dom"
import _ from "lodash"

function ChangePasswordForm({ email }) {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { enqueueSnackbar } = useSnackbar()
	const [ChangePassword] = useMutation(changePasswordMutation)
	const [showCurrentPassword, setShowCurrentPassword] = useState(false)
	const [showNewPassword, setShowNewPassword] = useState(false)

	const formik = useFormik({
		initialValues: {
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				await ChangePassword({
					variables: {
						email: email,
						event: "UPDATE_PASSWORD",
						oldPassword: values.currentPassword,
						newPassword: values.confirmPassword,
					},
				})

				enqueueSnackbar("Password reset successfully. Please login again.", {
					variant: "mui-alert",
					color: "success",
				})
				TrackForm({ formId: "provider_setting_change_password_form_submit", variant: "success" })

				dispatch(removeAuth())
				dispatch(resetUser())
				dispatch(resetData())
				navigate("/login")
			} catch (e) {
				_.forEach(
					_.get(e, "graphQLErrors", [{ message: "Something went wrong. Please try again." }]),
					({ message }) => enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
				)
				TrackForm({ formId: "provider_setting_change_password_form_submit", variant: "danger" })
			}
		},
	})

	return (
		<form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
			<Box className="f f-c g24">
				<Box
					className="f align-center justify-s-b g12 flex-wrap"
					paddingBottom="16px"
					borderBottom="1px solid #EAEBF2"
				>
					<Box className="f f-c g4">
						<Typography color="#1B1C20" fontSize="18px" fontWeight="500" lineHeight="26px">
							Change password
						</Typography>
						<Typography color="#717385" fontSize="14px" fontWeight="400" lineHeight="20px">
							Enter your current password to change your password.
						</Typography>
					</Box>
					<Button
						id="update_password"
						className="track_button"
						type="submit"
						variant="contained"
						color="purple"
						sx={{ padding: "10px 16px", fontSize: "14px", lineHeight: "20px" }}
						disabled={formik.isSubmitting}
					>
						{formik.isSubmitting ? "Please wait..." : "Update password"}
					</Button>
				</Box>
				<Box className="f f-c g20 w100" maxWidth="512px">
					<InputLabelContainer label="Current password">
						<TextField
							datafieldname="currentPassword"
							fullWidth
							id="currentPassword"
							name="currentPassword"
							type={showCurrentPassword ? "text" : "password"}
							placeholder="Enter your current password"
							variant="outlined"
							value={formik.values.currentPassword}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
							helperText={formik.touched.currentPassword && formik.errors.currentPassword}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={() => setShowCurrentPassword(!showCurrentPassword)}
											onMouseDown={(event) => event.preventDefault()}
											edge="end"
										>
											{showCurrentPassword ? <FiEye /> : <FiEyeOff />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</InputLabelContainer>
					<InputLabelContainer label="Current password">
						<TextField
							datafieldname="newPassword"
							fullWidth
							id="newPassword"
							name="newPassword"
							type={showNewPassword ? "text" : "password"}
							placeholder="Enter your new password"
							variant="outlined"
							value={formik.values.newPassword}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
							helperText={formik.touched.newPassword && formik.errors.newPassword}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={() => setShowNewPassword(!showNewPassword)}
											onMouseDown={(event) => event.preventDefault()}
											edge="end"
										>
											{showNewPassword ? <FiEye /> : <FiEyeOff />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</InputLabelContainer>
					<InputLabelContainer label="Confirm password">
						<TextField
							datafieldname="confirmPassword"
							fullWidth
							id="confirmPassword"
							name="confirmPassword"
							type={showNewPassword ? "text" : "password"}
							placeholder="Re-enter new password"
							variant="outlined"
							value={formik.values.confirmPassword}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
							helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={() => setShowNewPassword(!showNewPassword)}
											onMouseDown={(event) => event.preventDefault()}
											edge="end"
										>
											{showNewPassword ? <FiEye /> : <FiEyeOff />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</InputLabelContainer>
				</Box>
			</Box>
		</form>
	)
}

const mapStateToProps = (state) => ({
	email: state.local.userReducer.email,
})

export default connect(mapStateToProps)(ChangePasswordForm)
