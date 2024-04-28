import { useMutation } from "@apollo/client"
import { useTheme } from "@emotion/react"
import {
	Box,
	Checkbox,
	CssBaseline,
	FormHelperText,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
	useMediaQuery,
} from "@mui/material"
import { useFormik } from "formik"
import _ from "lodash"
import React, { useState } from "react"
import { FiArrowLeft, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { emailPasswordMutation, firstLastNameMutation } from "../../../../../gql/mutations/Providers/ForProvider"
import { TrackForm } from "../../../../../app/GlobalObjects/store/actions/TrackForm"
import { setProviderSignUp, setProviderSignupStep } from "../../../../../app/GlobalObjects/store/reducers/Layout"
import HelpModalButton from "../../../../common/HelpModalButton"
import Button from "../../../../utilities/Button"
import InputLabelContainer from "../../../../utilities/InputLabelContainer"
import CustomSelect from "../../../../utilities/Select"
import GetOrganizationCode from "./Modal/GetOrgranizationCode"
import validationSchema from "./validations/validation"

const STYLES = {
	terms: {
		display: "inline",
		color: "#1B1C20",
		fontSize: "14px",
		fontWeight: "500",
		lineHeight: "20px",
	},
	termLinks: {
		color: "#814CD6",
		textDecoration: "none",
		":hover": {
			textDecoration: "underline",
		},
	},
}

function AuthDetailsForm() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const theme = useTheme()
	const isSM = useMediaQuery(theme.breakpoints.up("sm"))

	const [showPassword, setShowPassword] = useState(false)
	const [termsAccepted, setTermsAccpeted] = useState(false)
	const [orgCodeModal, setOrgCodeModal] = useState(true)
	const [orgCode, setOrgCode] = useState("")

	const [EmailPassMutation] = useMutation(emailPasswordMutation)
	const [FirstLastNameMutation] = useMutation(firstLastNameMutation)

	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			countryCode: { value: "+1", label: "+1" },
			phoneNumber: "",
			password: "",
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				const res = await EmailPassMutation({
					variables: {
						email: values.email,
						password: values.password,
						roleName: "PROVIDER",
					},
				})

				const providerId = res.data.registerUser

				await FirstLastNameMutation({
					variables: {
						providerId,
						firstName: values.firstName,
						lastName: values.lastName,
						contactNumber: `${values.countryCode.value}${values.phoneNumber}`,
						organisationCode: orgCode,
					},
				})

				if (providerId) {
					dispatch(setProviderSignUp({ providerId, email: values.email }))
				}

				TrackForm({ formId: "provider_signup_step_1_form_submit", variant: "success" })
				dispatch(setProviderSignupStep(1))
			} catch (e) {
				_.forEach(_.get(e, "graphQLErrors", []), ({ message }) => {
					const errorMessage =
						message === "Email already in use."
							? "Email already registered. Please enter another email address or login to complete the signup process."
							: "Submission failed. Please try again."

					enqueueSnackbar(errorMessage, { variant: "mui-alert", color: "error" })
				})

				TrackForm({ formId: "provider_signup_step_1_form_submit", variant: "danger" })
			}
		},
	})

	return (
		<>
			<CssBaseline />
			<GetOrganizationCode
				open={orgCodeModal}
				handleClose={() => setOrgCodeModal(false)}
				setOrgCode={setOrgCode}
			/>
			<Box className="f f-c" gap={{ xs: "32px", md: "48px" }}>
				<Box className="f f-c g8">
					<Typography
						color="#1B1C20"
						fontFamily="Poppins"
						fontSize={{ xs: "24px", md: "32px" }}
						fontWeight="600"
						lineHeight={{ xs: "33px", md: "44px" }}
					>
						Create your account
					</Typography>
					<Typography color="#717385" fontSize="16px" fontWeight="400" lineHeight="26px">
						Please fill in your information below.
					</Typography>
				</Box>
				<form className="f f-c g24" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
					<Box className="f f-c g24 w100" maxWidth="512px">
						<Box className="f align-start" gap={{ xs: "8px", md: "24px" }}>
							<InputLabelContainer label="First name" datafieldname="firstName">
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
							</InputLabelContainer>
							<InputLabelContainer label="Last name" datafieldname="lastName">
								<TextField
									datafieldname="lastName"
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
							</InputLabelContainer>
						</Box>
						<InputLabelContainer label="Email" datafieldname="email">
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
							<Typography color="#717385" fontSize="14px" fontWeight="400" lineHeight="20px">
								Your email will not be shared with patients.
							</Typography>
						</InputLabelContainer>
						<InputLabelContainer label="Phone number" datafieldname="phoneNumber">
							<Box className="f f-c">
								<Box className="f g8">
									<CustomSelect
										width="108px"
										placeholder="+1 US"
										defaultValue={{ value: "+1", label: "+1" }}
										options={[{ value: "+1", label: "+1" }]}
										error={formik.errors.phoneNumber && formik.touched.phoneNumber}
										onChange={(value) => setFieldValue("countryCode", value)}
									/>
									<TextField
										datafieldname="phoneNumber"
										fullWidth
										id="phoneNumber"
										name="phoneNumber"
										type="text"
										placeholder="Enter phone number"
										variant="outlined"
										value={formik.values.phoneNumber}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
									/>
								</Box>
								{formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber) ? (
									<FormHelperText>
										{formik.touched.phoneNumber && formik.errors.phoneNumber}
									</FormHelperText>
								) : null}
							</Box>
							<Typography color="#717385" fontSize="14px" fontWeight="400" lineHeight="20px">
								Your phone number will not be shared with patients
							</Typography>
						</InputLabelContainer>
						<InputLabelContainer label="Password">
							<Box className="f f-c">
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
								{!(formik.touched.password && Boolean(formik.errors.password)) ? (
									<Typography color="#717385" fontSize="14px" fontWeight="400" lineHeight="20px">
										Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase
										letter, 1 number and 1 special character.
									</Typography>
								) : null}
							</Box>
						</InputLabelContainer>
					</Box>
					<Box className="f align-start g8">
						<Checkbox
							value={true}
							checked={termsAccepted}
							onChange={() => setTermsAccpeted(!termsAccepted)}
						/>
						<Box className="f h100 align-center g6 flex-wrap">
							<Typography sx={STYLES.terms}>I agree to the</Typography>
							<Typography
								component={Link}
								to="/privacy-policy"
								target="_blank"
								sx={{ ...STYLES.terms, ...STYLES.termLinks }}
							>
								Privacy Policy
							</Typography>
							<Typography sx={STYLES.terms}>and</Typography>
							<Typography
								component={Link}
								to="/terms-of-use"
								target="_blank"
								sx={{ ...STYLES.terms, ...STYLES.termLinks }}
							>
								Terms of use
							</Typography>
						</Box>
					</Box>
					<Box className="f align-center justify-s-b g8" paddingBottom="32px">
						<Box className="f align-center g16 w100">
							<Button
								id="provider_signup_step_first_back"
								className="track_button"
								variant="outlined"
								color="gray"
								type="reset"
								fullWidth={isSM ? false : true}
								onClick={() => navigate("/signup")}
							>
								<FiArrowLeft size="20px" /> Back
							</Button>
							<Button
								id="provider_signup_step_first_form_submit"
								className="track_button"
								variant="contained"
								color="purple"
								type="submit"
								fullWidth={isSM ? false : true}
								disabled={!termsAccepted || formik.isSubmitting || !formik.dirty}
							>
								{formik.isSubmitting ? (
									"Please wait..."
								) : (
									<>
										Continue <FiArrowRight size="20px" />
									</>
								)}
							</Button>
						</Box>
						<Box className="align-center" display={{ xs: "none", sm: "none", md: "flex" }}>
							<HelpModalButton />
						</Box>
					</Box>
				</form>
			</Box>
		</>
	)
}

export default AuthDetailsForm
