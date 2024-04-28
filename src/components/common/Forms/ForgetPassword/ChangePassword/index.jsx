import { useMutation } from "@apollo/client"
import React, { useState } from "react"
import { changePasswordMutation } from "../../../../../gql/mutations/Auth"
import { useFormik } from "formik"
import { TrackForm } from "../../../../../app/GlobalObjects/store/actions/TrackForm"
import { useSnackbar } from "notistack"
import { Box, IconButton, InputAdornment, TextField } from "@mui/material"
import InputLabelContainer from "../../../../utilities/InputLabelContainer"
import Button from "../../../../utilities/Button"
import { FiEye, FiEyeOff } from "react-icons/fi"
import validationSchema from "./validations/validation"
import { connect, useDispatch } from "react-redux"
import _ from "lodash"
import { useNavigate } from "react-router-dom"
import { resetLayout } from "../../../../../app/GlobalObjects/store/reducers/Layout"
import { removeAuth } from "../../../../../app/GlobalObjects/store/reducers/Auth"
import { resetUser } from "../../../../../app/GlobalObjects/store/reducers/User"
import { resetData } from "../../../../../app/GlobalObjects/store/reducers/Data"

function FPChangePassword({ email }) {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { enqueueSnackbar } = useSnackbar()
	const [showPassword, setShowPassword] = useState(false)
	const [ChangePassword] = useMutation(changePasswordMutation)

	const formik = useFormik({
		initialValues: {
			newPassword: "",
			confirmPassword: "",
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				await ChangePassword({
					variables: {
						email: email,
						event: "RESET_PASSWORD",
						newPassword: values.confirmPassword,
					},
				})

				enqueueSnackbar("Password reset successfully. Please login again.", {
					variant: "mui-alert",
					color: "success",
				})
				TrackForm({ formId: "provider_reset_password_form_submit", variant: "success" })

				dispatch(removeAuth())
				dispatch(resetUser())
				dispatch(resetData())
				dispatch(resetLayout())
				navigate("/login")
			} catch (e) {
				_.forEach(
					_.get(e, "graphQLErrors", [{ message: "Something went wrong. Please try again." }]),
					({ message }) => enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
				)
				TrackForm({ formId: "provider_reset_password_form_submit", variant: "danger" })
			}
		},
	})

	return (
		<form
			onSubmit={formik.handleSubmit}
			onReset={formik.handleReset}
			className="f f-c w100"
			style={{ gap: "48px", maxWidth: "512px" }}
		>
			<Box className="f f-c g20 w100">
				<InputLabelContainer label="Current password">
					<TextField
						datafieldname="newPassword"
						fullWidth
						id="newPassword"
						name="newPassword"
						type={showPassword ? "text" : "password"}
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
										onClick={() => setShowPassword(!showPassword)}
										onMouseDown={(event) => event.preventDefault()}
										edge="end"
									>
										{showPassword ? <FiEye /> : <FiEyeOff />}
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
						type={showPassword ? "text" : "password"}
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
										onClick={() => setShowPassword(!showPassword)}
										onMouseDown={(event) => event.preventDefault()}
										edge="end"
									>
										{showPassword ? <FiEye /> : <FiEyeOff />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</InputLabelContainer>
			</Box>
			<Button
				id="forget_password_submit"
				className="track_button"
				fullWidth
				variant="contained"
				color="purple"
				type="submit"
				disabled={formik.isSubmitting || !formik.dirty}
			>
				{formik.isSubmitting ? "Please wait..." : "Reset password"}
			</Button>
		</form>
	)
}

const mapStateToProps = (state) => ({
	email: state.session.layoutReducer.forgetPass.email,
})

export default connect(mapStateToProps)(FPChangePassword)
