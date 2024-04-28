import { useMutation } from "@apollo/client"
import { useSnackbar } from "notistack"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { sendOTPMutation } from "../../../../../gql/mutations/OTPVerify"
import { setUserEmail } from "../../../../../app/GlobalObjects/store/reducers/User"
import { Box, CssBaseline, TextField } from "@mui/material"
import { useFormik } from "formik"
import InputLabelContainer from "../../../../utilities/InputLabelContainer"
import validationSchema from "./validation/validation"
import { setForgetPass } from "../../../../../app/GlobalObjects/store/reducers/Layout"
import Button from "../../../../utilities/Button"
import { useNavigate } from "react-router-dom"

function GetIdForm() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { enqueueSnackbar } = useSnackbar()
	const [SendOTP] = useMutation(sendOTPMutation)

	const formik = useFormik({
		initialValues: { email: "" },
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				await SendOTP({
					variables: { email: values.email },
				})
				dispatch(setForgetPass({ email: values.email }))
				navigate("/forget-password/otp-verify")
			} catch (e) {
				e.graphQLErrors.forEach(({ message }) =>
					enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
				)
			}
		},
	})

	return (
		<form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
			<CssBaseline />
			<Box className="f f-c" gap="46px" maxWidth="512px">
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
				<Button
					id="forget_password_get_id"
					className="track_button"
					variant="contained"
					color="purple"
					type="submit"
					disabled={formik.isSubmitting}
				>
					{formik.isSubmitting ? "Please wait..." : "Send OTP"}
				</Button>
			</Box>
		</form>
	)
}

export default GetIdForm
