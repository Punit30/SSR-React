import { useMutation } from "@apollo/client"
import {
	Box,
	CssBaseline,
	FormHelperText,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material"
import { useFormik } from "formik"
import _ from "lodash"
import { useSnackbar } from "notistack"
import React, { useState } from "react"
import { FiArrowRight, FiPlus, FiSearch, FiX } from "react-icons/fi"
import { connect, useDispatch } from "react-redux"
import { SHORT_LABEL_STATES } from "../../../../../Constants/data-types/states-types"
import { addOrUpdateProviderProfessionalDetailMutation } from "../../../../../gql/mutations/Providers/ForProvider"
import { ScrollToFormError } from "../../../../../helpers/FormErrorScroll"
import useDegree from "../../../../../helpers/hooks/useDegree"
import useSpecialty from "../../../../../helpers/hooks/useSpecialty"
import { TrackForm } from "../../../../../app/GlobalObjects/store/actions/TrackForm"
import { setProviderSignupStep } from "../../../../../app/GlobalObjects/store/reducers/Layout"
import HelpModalButton from "../../../../common/HelpModalButton"
import Button from "../../../../utilities/Button"
import InputLabelContainer from "../../../../utilities/InputLabelContainer"
import CustomSelect from "../../../../utilities/Select"
import AddOtherDegree from "./Modal/AddOtherDegree"
import Greeting from "./Modal/Greeting"
import validationSchema from "./validations/validation"

function LicenceDetailsForm({ id }) {
	const theme = useTheme()
	const isSM = useMediaQuery(theme.breakpoints.up("sm"))

	const dispatch = useDispatch()
	const { enqueueSnackbar } = useSnackbar()
	const [otrDegreeModal, setOtrDegreeModal] = useState(false)
	const [greetingModal, setGreetingModal] = useState(false)

	const formik = useFormik({
		initialValues: {
			degree: "",
			additionalDegrees: "",
			speciality: [],
			otherSpeciality: "",
			subSpeciality: "",
			licenseNumber: [{ state: null, number: "" }],
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				const licensePayload = values.licenseNumber.map((license) => ({
					state: license.state?.value,
					number: license.number,
				}))

				const specialityPayload = values.speciality
					.filter((item) => item.value !== "Other")
					.map((speciality) => ({ specialization: speciality.value }))

				if (values.otherSpeciality) {
					specialityPayload.push({ specialization: values.otherSpeciality })
				}

				await LicenseVerification({
					variables: {
						licences: licensePayload,
						providerId: id,
						degree: [{ degreeType: values.degree }],
						additionalDegrees: [{ degreeType: values.additionalDegrees }],
						speciality: specialityPayload,
						subSpeciality: [{ specialization: values.subSpeciality }],
					},
				})

				TrackForm({ formId: "provider_signup_step_3_form_submit", variant: "success" })
				dispatch(setProviderSignupStep(4))
			} catch (e) {
				enqueueSnackbar("Submission failed. Please try again.", { variant: "mui-alert", color: "error" })
				TrackForm({ formId: "provider_signup_step_3_form_submit", variant: "danger" })
			}
		},
	})

	const { data: degData, loading: degLoading } = useDegree()
	const { data: specData, loading: specLoading } = useSpecialty()
	const [LicenseVerification] = useMutation(addOrUpdateProviderProfessionalDetailMutation)

	return (
		<>
			<AddOtherDegree
				open={otrDegreeModal}
				handlePostSubmit={() => {
					setGreetingModal(true)
					setOtrDegreeModal(false)
				}}
				handleClose={() => setOtrDegreeModal(false)}
			/>
			<Greeting open={greetingModal} handleClose={() => setGreetingModal(false)} />
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
						License verification
					</Typography>
					<Typography color="#717385" fontSize="16px" fontWeight="400" lineHeight="26px">
						Please provide your medical qualifications below.
					</Typography>
				</Box>
				<form
					className="f f-c"
					onSubmit={formik.handleSubmit}
					onReset={formik.handleReset}
					style={{ gap: "48px" }}
				>
					<Box className="f f-c g24" maxWidth="512px">
						<ScrollToFormError formik={formik} />
						<InputLabelContainer label="Degree" datafieldname="degree">
							<CustomSelect
								isDisabled={degLoading}
								isLoading={degLoading}
								placeholder="Select your degree"
								options={[
									..._.map(degData, (deg) => ({ value: deg.name, label: deg.name })),
									{ value: "Other", label: "Other" },
								]}
								meta={{ error: formik.errors.degree, touched: formik.touched.degree }}
								name="degree"
								onBlur={() => formik.setFieldTouched("degree", true)}
								onChange={async (value) => {
									if (value.value === "Other") {
										setOtrDegreeModal(true)
										await formik.setFieldValue("degree", "")
									} else {
										await formik.setFieldValue("degree", value !== null ? value.value : "")
									}
									formik.validateField("degree")
								}}
							/>
						</InputLabelContainer>
						<InputLabelContainer label="Additional degree (optional)" datafieldname="additionalDegrees">
							<TextField
								fullWidth
								id="additionalDegrees"
								name="additionalDegrees"
								type="text"
								placeholder="e.g., MPH, MBA"
								variant="outlined"
								value={formik.values.additionalDegrees}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.additionalDegrees && Boolean(formik.errors.additionalDegrees)}
								helperText={formik.touched.additionalDegrees && formik.errors.additionalDegrees}
							/>
						</InputLabelContainer>
						<InputLabelContainer label="Specialty" datafieldname="speciality">
							<CustomSelect
								lefticon={<FiSearch />}
								isDisabled={specLoading}
								isLoading={specLoading}
								isMulti
								placeholder="Select your specialty"
								options={[
									..._.map(specData, (spec) => ({ value: spec.name, label: spec.name })),
									{ value: "Other", label: "Other" },
								]}
								meta={{ error: formik.errors.speciality, touched: formik.touched.speciality }}
								name="speciality"
								onBlur={() => formik.setFieldTouched("speciality", true)}
								onChange={async (value) => {
									await formik.setFieldValue("speciality", value)
									formik.validateField("speciality")
								}}
							/>
						</InputLabelContainer>
						{formik.values.speciality?.find((spec) => spec.value === "Other") ? (
							<InputLabelContainer label="Other specialty" datafieldname="otherSpeciality">
								<TextField
									fullWidth
									id="otherSpeciality"
									name="otherSpeciality"
									type="text"
									placeholder="Enter other specialty"
									variant="outlined"
									value={formik.values.otherSpeciality}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.otherSpeciality && Boolean(formik.errors.otherSpeciality)}
									helperText={formik.touched.otherSpeciality && formik.errors.otherSpeciality}
								/>
							</InputLabelContainer>
						) : null}
						<InputLabelContainer label="Sub-specialty (optional)" datafieldname="subSpeciality">
							<TextField
								fullWidth
								id="subSpeciality"
								name="subSpeciality"
								type="text"
								placeholder="Enter your sub-specialty"
								variant="outlined"
								value={formik.values.subSpeciality}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.subSpeciality && Boolean(formik.errors.subSpeciality)}
								helperText={formik.touched.subSpeciality && formik.errors.subSpeciality}
							/>
						</InputLabelContainer>
						<InputLabelContainer label="License number" datafieldname="licenseNumber">
							<Box className="f f-c g6">
								<Typography color="#717385" fontSize="14px" fontWeight="400" lineHeight="20px">
									Select the state and enter your license number.
								</Typography>
								<Box className="f f-c g8 p12 b-r8" sx={{ backgroundColor: "#F9F9FB" }}>
									{_.map(formik.values.licenseNumber, (license, index) => (
										<Box className="f f-c" key={index}>
											<Box
												className="f align-center g6"
												datafieldname={`licenseNumber.${index}`}
												onBlur={() => formik.setFieldTouched("licenseNumber", true)}
											>
												<CustomSelect
													width="108px"
													placeholder="State"
													options={SHORT_LABEL_STATES}
													value={license.state}
													error={
														Boolean(formik.errors.licenseNumber?.[index]) &&
														formik.touched.licenseNumber
													}
													onChange={(value) => {
														let newOptions = [...formik.values.licenseNumber]
														newOptions[index].state = value
														formik.setFieldValue("options", _.cloneDeep(newOptions))
													}}
												/>
												<TextField
													sx={{ backgroundColor: "#fff" }}
													fullWidth
													id={`licenseNumber.${index}`}
													name={`licenseNumber.${index}`}
													type="text"
													placeholder="Enter license number"
													variant="outlined"
													value={license.number}
													onChange={(e) => {
														let newOptions = [...formik.values.licenseNumber]
														newOptions[index].number = e.target.value
														formik.setFieldValue("licenseNumber", _.cloneDeep(newOptions))
													}}
													error={
														Boolean(formik.errors.licenseNumber?.[index]) &&
														formik.touched.licenseNumber
													}
													InputProps={{
														endAdornment:
															formik.values.licenseNumber.length > 1 ? (
																<InputAdornment position="end">
																	<IconButton
																		sx={{ padding: "4px" }}
																		aria-label="toggle licenseNumber[index] visibility"
																		onClick={() => {
																			let newLicenses = _.cloneDeep(
																				formik.values.licenseNumber
																			)
																			newLicenses.splice(index, 1)
																			formik.setFieldValue(
																				"licenseNumber",
																				_.cloneDeep(newLicenses)
																			)
																		}}
																		edge="end"
																	>
																		<FiX size="16px" />
																	</IconButton>
																</InputAdornment>
															) : null,
													}}
												/>
											</Box>
											{formik.touched.licenseNumber && formik.errors.licenseNumber?.[index] ? (
												<FormHelperText>
													{formik.errors.licenseNumber?.[index].state ||
														formik.errors.licenseNumber?.[index].number}
												</FormHelperText>
											) : null}
										</Box>
									))}
									{formik.values.licenseNumber.length < 7 ? (
										<Button
											id="provider_signup_step_third_add_licence"
											className="track_button"
											variant="text"
											color="purple"
											sx={{
												fontSize: "14px",
												lineHeight: "20px",
												width: "fit-content",
												gap: "4px",
											}}
											onClick={() => {
												let licenseNumber = formik.values.licenseNumber
												licenseNumber.push({ value: "", isCorrect: false })
												formik.setFieldValue("licenseNumber", _.cloneDeep(licenseNumber))
											}}
										>
											<FiPlus size="16px" /> Add another license
										</Button>
									) : null}
								</Box>
							</Box>
						</InputLabelContainer>
					</Box>
					<Box className="f align-center justify-s-b g8" paddingBottom="32px">
						<Button
							id="provider_signup_step_third_form_submit"
							className="track_button"
							variant="contained"
							color="purple"
							type="submit"
							fullWidth={isSM ? false : true}
							disabled={formik.isSubmitting || !formik.dirty}
						>
							{formik.isSubmitting ? (
								"Please wait..."
							) : (
								<>
									Continue <FiArrowRight size="20px" />
								</>
							)}
						</Button>

						<Box className="align-center" display={{ xs: "none", sm: "none", md: "flex" }}>
							<HelpModalButton />
						</Box>
					</Box>
				</form>
			</Box>
		</>
	)
}

const mapStateToProps = (state) => ({
	id: state.session.layoutReducer.providerSignUp.providerId,
})

export default connect(mapStateToProps)(LicenceDetailsForm)
