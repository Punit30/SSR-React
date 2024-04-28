import { useLazyQuery } from "@apollo/client"
import { Box, CssBaseline, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import { jwtDecode } from "jwt-decode"
import { useSnackbar } from "notistack"
import React, { useState } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { PROFILE_EVENTS } from "../../../../Constants/data-types/types"
import { loginQuery } from "../../../../gql/queries/Auth"
import { ScrollToFormError } from "../../../../helpers/FormErrorScroll"
import { TrackForm } from "../../../../app/GlobalObjects/store/actions/TrackForm"
import { setAuth } from "../../../../app/GlobalObjects/store/reducers/Auth"
import { setProviderSignUp } from "../../../../app/GlobalObjects/store/reducers/Layout"
import { setUser, setUserEmail } from "../../../../app/GlobalObjects/store/reducers/User"
import { setForm } from "../../../../app/GlobalObjects/store/reducers/provider/ProfileStartForms"
import { setProvider } from "../../../../app/GlobalObjects/store/reducers/provider/Provider"
import Button from "../../../utilities/Button"
import InputLabelContainer from "../../../utilities/InputLabelContainer"
import validationSchema from "./validation/validation"

function LoginForm() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { enqueueSnackbar } = useSnackbar()

	const [showPassword, setShowPassword] = useState(false)

	const [Login] = useLazyQuery(loginQuery, { fetchPolicy: "network-only" })

	const formik = useFormik({
		initialValues: { email: "", password: "" },
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				const res = await Login({ variables: values })

				if (res.hasOwnProperty("error")) {
					if (res.error.message === "Bad credentials") {
						throw "Bad credentials"
					}
				}

				dispatch(setUserEmail({ email: values.email }))

				const { accessToken, refreshToken } = res.data.login
				const accessTokenData = jwtDecode(accessToken)
				const authority = accessTokenData?.role[0].authority
				console.log(accessTokenData)

				if (authority === "PROVIDER") {
					if (Object.keys(PROFILE_EVENTS).includes(accessTokenData?.latestEvent)) {
						dispatch(
							setProviderSignUp({
								providerId: accessTokenData?.sub,
								email: accessTokenData?.email,
								step: PROFILE_EVENTS[accessTokenData?.latestEvent],
							})
						)
						navigate("/signup/provider")
						enqueueSnackbar("Please complete your signup.", { variant: "mui-alert", color: "warning" })
						return
					}

					dispatch(
						setProvider({
							providerId: accessTokenData?.sub,
							hasCompletedSurvey: accessTokenData?.hasCompletedSurvey,
						})
					)

					if (!accessTokenData?.hasCompletedSurvey) {
						dispatch(setForm({ formNo: 0 }))
					}
				} else if (authority === "PATIENT") {
					//console.log("FOR Patient");
				} else {
					// for admin
					//console.log("FOR admin");
				}

				TrackForm({ formId: "login_form_submit", variant: "success" })

				dispatch(setAuth({ accessToken, refreshToken }))
				dispatch(
					setUser({
						authority,
						email: accessTokenData.email,
						firstName: accessTokenData.firstName,
						lastName: accessTokenData.lastName,
						profilePic: accessTokenData.profile,
					})
				)
				navigate(
					authority === "PATIENT"
						? "/dashboard"
						: authority === "PROVIDER"
						? "/dashboard/provider"
						: "/dashboard/admin"
				)
			} catch (e) {
				const isBadCredentials =
					(typeof e === "string" && e === "Bad credentials") || JSON.stringify(e).includes("Bad credentials")
				enqueueSnackbar(
					isBadCredentials ? "Email or password may be incorrect." : "Submission failed. Please try again.",
					{ variant: "mui-alert", color: "error" }
				)
				TrackForm({ formId: "login_form_submit", variant: "danger" })
			}
		},
	})

	return (
		<>
			<CssBaseline />
			<form onSubmit={formik.handleSubmit} onReset={formik.handleReset} style={{ width: "100%" }}>
				<ScrollToFormError formik={formik} />
				<Box
					className="f f-c"
					gap={{ xs: "12px", md: "48px" }}
					paddingBottom={{ xs: "16px", md: "48px" }}
					maxWidth="512px"
				>
					<Box className="f f-c g12">
						<Box className="f f-c g24">
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
							<InputLabelContainer label="Password">
								<TextField
									datafieldname="password"
									fullWidth
									id="password"
									name="password"
									type={showPassword ? "text" : "password"}
									placeholder="Enter your password"
									variant="outlined"
									value={formik.values.password}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.password && Boolean(formik.errors.password)}
									helperText={formik.touched.password && formik.errors.password}
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
							component={Link}
							aria-label="forget password"
							to="/forget-password"
							id="login_forget_password"
							className="track_button"
							variant="text"
							color="purple"
							sx={{
								textDecoration: "none",
								width: "fit-content",
								color: "#814CD6",
								textAlign: "center",
								fontSize: "14px",
								fontWeight: "600",
								lineHeight: "20px",
							}}
						>
							Forget password?
						</Button>
					</Box>
					<Box className="f f-c g16" paddingTop={{ xs: "36px", md: "0px" }}>
						<Button
							id="login_submit"
							className="track_button"
							disabled={formik.isSubmitting}
							fullWidth
							type="submit"
							variant="contained"
							color="purple"
						>
							{formik.isSubmitting ? "Please wait..." : "Log in"}
						</Button>
						<Typography
							color="#1B1C20"
							textAlign="center"
							fontSize="16px"
							fontWeight="500"
							lineHeight="26px"
						>
							or
						</Typography>
						<Button
							component={Link}
							to="/signup"
							id="sign_up"
							aria-label="sign-up"
							sx={{ textDecoration: "none" }}
							className="track_button"
							disabled={formik.isSubmitting}
							fullWidth
							type="reset"
							variant="outlined"
							color="gray"
						>
							Create a new account
						</Button>
					</Box>
				</Box>
			</form>
		</>
	)
}

export default LoginForm
