import { Box, Checkbox, CssBaseline, FormHelperText, Skeleton, Typography, useMediaQuery } from "@mui/material"
import { useFormik } from "formik"
import React from "react"
import { ScrollToFormError } from "../../../../../helpers/FormErrorScroll"
import InputLabelContainer from "../../../../utilities/InputLabelContainer"
import {
	CONFIDENCE_LEVEL_OPTIONS,
	IS_LGBTQIA_OPTIONS,
	KNOWLEDGE_LEVEL_OPTIONS,
	NOTABLE_EEXPERIENCE_OPTIONS,
} from "../../../../../Constants/data-types/provider-formats"
import { IoCheckmarkCircle, IoEllipseOutline } from "react-icons/io5"
import _ from "lodash"
import CheckList from "../../ProfessionalInformation/widgets/CheckList"
import useAdditionalServices from "../../../../../helpers/hooks/useAdditionalServices"
import Button from "../../../../utilities/Button"
import HelpModalButton from "../../../../common/HelpModalButton"
import { useTheme } from "@emotion/react"
import { useSnackbar } from "notistack"
import { connect, useDispatch } from "react-redux"
import { FiArrowRight } from "react-icons/fi"
import validationSchema from "./validation/validation"
import { useMutation } from "@apollo/client"
import { addOrUpdateProviderBackgorundDetailMutation } from "../../../../../gql/mutations/Providers/ForProvider"
import { setProviderSignupStep } from "../../../../../app/GlobalObjects/store/reducers/Layout"
import { TrackForm } from "../../../../../app/GlobalObjects/store/actions/TrackForm"

function BackgroundAndExpForm({ id }) {
	const theme = useTheme()
	const isSM = useMediaQuery(theme.breakpoints.up("sm"))

	const { enqueueSnackbar } = useSnackbar()
	const dispatch = useDispatch()

	const { data: aSData, loading: aSLoading } = useAdditionalServices()
	const [BackgroundDetail] = useMutation(addOrUpdateProviderBackgorundDetailMutation)

	const formik = useFormik({
		initialValues: {
			isLGBTQIA: "",
			notableExperiences: [],
			confidenceLevel: "",
			knowledgeLevel: "",
			additionalServices: [],
			wantToLearnCRC: null,
			hasInfluencedBehaviour: null,
			topicsInterestedIn: "",
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				await BackgroundDetail({
					variables: {
						...values,
						providerId: id,
						isLGBTQIA: IS_LGBTQIA_OPTIONS[values.isLGBTQIA],
						knowledgeLevel: KNOWLEDGE_LEVEL_OPTIONS[values.knowledgeLevel],
						confidenceLevel: CONFIDENCE_LEVEL_OPTIONS[values.confidenceLevel],
						additionalServices: _.map(values.additionalServices, (item) => ({ serviceName: item })),
					},
				})
				TrackForm({ formId: "provider_signup_baseline_info_form_submit", variant: "success" })
				dispatch(setProviderSignupStep(5))
			} catch (e) {
				enqueueSnackbar("Submission failed. Please try again.", { variant: "mui-alert", color: "error" })
				TrackForm({ formId: "provider_signup_baseline_info_form_submit", variant: "danger" })
			}
		},
	})

	return (
		<>
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
						Background and experience
					</Typography>
					<Typography color="#717385" fontSize="16px" fontWeight="400" lineHeight="26px">
						Please provide your background and experience below.
					</Typography>
				</Box>
				<form
					className="f f-c"
					onSubmit={formik.handleSubmit}
					onReset={formik.handleReset}
					style={{ gap: "40px", maxWidth: "664px" }}
				>
					<ScrollToFormError formik={formik} />
					<InputLabelContainer label="Do you identify as LGBTQIA+" datafieldname="isLGBTQIA">
						<Box className="f f-c">
							<Box
								className="f align-center g36"
								onBlur={() => formik.setFieldTouched("isLGBTQIA", true)}
							>
								{Object.keys(IS_LGBTQIA_OPTIONS).map((option, index) => (
									<Box className="f align-center g8" key={index}>
										<Checkbox
											icon={<IoEllipseOutline size="26px" />}
											checkedIcon={<IoCheckmarkCircle size="26px" />}
											value={option}
											checked={formik.values.isLGBTQIA === option}
											onChange={(e) => formik.setFieldValue("isLGBTQIA", option)}
										/>
										<Typography color="#1B1C20" fontSize="14px" fontWeight="400" lineHeight="20px">
											{option}
										</Typography>
									</Box>
								))}
							</Box>
							{formik.touched.isLGBTQIA && Boolean(formik.errors.isLGBTQIA) ? (
								<FormHelperText>{formik.touched.isLGBTQIA && formik.errors.isLGBTQIA}</FormHelperText>
							) : null}
						</Box>
					</InputLabelContainer>
					<InputLabelContainer
						label="Notable expereince"
						labelHelper="(Please select all that apply)"
						datafieldname="notableExperiences"
					>
						<Box className="f f-c">
							<Box className="f f-c g8">
								{_.map(NOTABLE_EEXPERIENCE_OPTIONS, (option, index) => (
									<Box className="f align-center g8" key={index}>
										<Checkbox
											value={option}
											checked={formik.values.notableExperiences.includes(option)}
											onChange={(e) =>
												formik.setFieldValue(
													"notableExperiences",
													_.xor(formik.values.notableExperiences, [option])
												)
											}
										/>
										<Typography color="#1B1C20" fontSize="14px" fontWeight="400" lineHeight="20px">
											{option}
										</Typography>
									</Box>
								))}
							</Box>
							{formik.touched.notableExperiences && Boolean(formik.errors.notableExperiences) ? (
								<FormHelperText>
									{formik.touched.notableExperiences && formik.errors.notableExperiences}
								</FormHelperText>
							) : null}
						</Box>
					</InputLabelContainer>
					<InputLabelContainer
						label="Do you provide any of these services?"
						labelHelper="(Please select all that apply)"
						datafieldname="additionalServices"
					>
						<Box className="f f-c">
							{aSLoading ? (
								<Skeleton height="240px" />
							) : (
								<CheckList
									data={_.map(aSData, (ad) => ad.name)}
									state={formik.values.additionalServices}
									setState={(value) =>
										formik.setFieldValue(
											"additionalServices",
											_.xor(formik.values.additionalServices, [value])
										)
									}
								/>
							)}
							{formik.touched.additionalServices && Boolean(formik.errors.additionalServices) ? (
								<FormHelperText>
									{formik.touched.additionalServices && formik.errors.additionalServices}
								</FormHelperText>
							) : null}
						</Box>
					</InputLabelContainer>
					<InputLabelContainer
						label="How would you rate your level of confidence working with LGBTQIA+ patients?"
						datafieldname="confidenceLevel"
					>
						<Box className="f f-c">
							<Box className="f f-c g4">
								{Object.keys(CONFIDENCE_LEVEL_OPTIONS).map((option, index) => (
									<Box className="f align-center g8" key={index}>
										<Checkbox
											icon={<IoEllipseOutline size="26px" />}
											checkedIcon={<IoCheckmarkCircle size="26px" />}
											value={option}
											checked={formik.values.confidenceLevel === option}
											onChange={(e) => formik.setFieldValue("confidenceLevel", option)}
										/>
										<Typography color="#1B1C20" fontSize="14px" fontWeight="400" lineHeight="20px">
											{option}
										</Typography>
									</Box>
								))}
							</Box>
							{formik.touched.confidenceLevel && Boolean(formik.errors.confidenceLevel) ? (
								<FormHelperText>
									{formik.touched.confidenceLevel && formik.errors.confidenceLevel}
								</FormHelperText>
							) : null}
						</Box>
					</InputLabelContainer>
					<InputLabelContainer
						label="How would you rate your knowledge of LGBTQIA+ issues?"
						datafieldname="knowledgeLevel"
					>
						<Box className="f f-c">
							<Box className="f f-c g4">
								{Object.keys(KNOWLEDGE_LEVEL_OPTIONS).map((option, index) => (
									<Box className="f align-center g8" key={index}>
										<Checkbox
											icon={<IoEllipseOutline size="26px" />}
											checkedIcon={<IoCheckmarkCircle size="26px" />}
											value={option}
											checked={formik.values.knowledgeLevel === option}
											onChange={(e) => formik.setFieldValue("knowledgeLevel", option)}
										/>
										<Typography color="#1B1C20" fontSize="14px" fontWeight="400" lineHeight="20px">
											{option}
										</Typography>
									</Box>
								))}
							</Box>
							{formik.touched.knowledgeLevel && Boolean(formik.errors.knowledgeLevel) ? (
								<FormHelperText>
									{formik.touched.knowledgeLevel && formik.errors.knowledgeLevel}
								</FormHelperText>
							) : null}
						</Box>
					</InputLabelContainer>
					<InputLabelContainer
						label="In the past 6 months, have you examined your own biases related to sexual orientation and gender expression that may have influenced your behavior as a provider?"
						datafieldname="hasInfluencedBehaviour"
					>
						<Box className="f f-c">
							<Box className="f align-center g36">
								{["Yes", "No"].map((option, index) => (
									<Box className="f align-center g8" key={index}>
										<Checkbox
											icon={<IoEllipseOutline size="26px" />}
											checkedIcon={<IoCheckmarkCircle size="26px" />}
											value={option === "Yes"}
											checked={formik.values.hasInfluencedBehaviour === (option === "Yes")}
											onChange={(e) =>
												formik.setFieldValue("hasInfluencedBehaviour", option === "Yes")
											}
										/>
										<Typography color="#1B1C20" fontSize="14px" fontWeight="400" lineHeight="20px">
											{option}
										</Typography>
									</Box>
								))}
							</Box>
							{formik.touched.hasInfluencedBehaviour && Boolean(formik.errors.hasInfluencedBehaviour) ? (
								<FormHelperText>
									{formik.touched.hasInfluencedBehaviour && formik.errors.hasInfluencedBehaviour}
								</FormHelperText>
							) : null}
						</Box>
					</InputLabelContainer>
					<InputLabelContainer
						label="Would you like to learn more about providing culturally responsive care to LGBTQIA+ patients?"
						datafieldname="wantToLearnCRC"
					>
						<Box className="f f-c">
							<Box className="f align-center g36">
								{["Yes", "No"].map((option, index) => (
									<Box className="f align-center g8" key={index}>
										<Checkbox
											icon={<IoEllipseOutline size="26px" />}
											checkedIcon={<IoCheckmarkCircle size="26px" />}
											value={option === "Yes"}
											checked={formik.values.wantToLearnCRC === (option === "Yes")}
											onChange={(e) => formik.setFieldValue("wantToLearnCRC", option === "Yes")}
										/>
										<Typography color="#1B1C20" fontSize="14px" fontWeight="400" lineHeight="20px">
											{option}
										</Typography>
									</Box>
								))}
							</Box>
							{formik.touched.wantToLearnCRC && Boolean(formik.errors.wantToLearnCRC) ? (
								<FormHelperText>
									{formik.touched.wantToLearnCRC && formik.errors.wantToLearnCRC}
								</FormHelperText>
							) : null}
						</Box>
					</InputLabelContainer>
					<InputLabelContainer
						label="Are there any specific topics within LGBTQIA+ healthcare that you are interested in?"
						datafieldname="topicsInterestedIn"
					>
						<Box className="f f-c">
							<textarea
								id="topicsInterestedIn"
								name="topicsInterestedIn"
								className={`text-area w100 h100 font-s14 font-w400 line-h19 resize-vertical ${
									formik.touched.topicsInterestedIn && Boolean(formik.errors.topicsInterestedIn)
										? "text-area__error"
										: ""
								}`}
								style={{ height: "88px" }}
								placeholder="Type here"
								value={formik.values.topicsInterestedIn}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.topicsInterestedIn && Boolean(formik.errors.topicsInterestedIn) ? (
								<FormHelperText>
									{formik.touched.topicsInterestedIn && formik.errors.topicsInterestedIn}
								</FormHelperText>
							) : null}
						</Box>
					</InputLabelContainer>
					<Box className="f align-center justify-s-b g8" paddingBottom="32px">
						<Button
							id="provider-signup-background-exp-submit"
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

export default connect(mapStateToProps)(BackgroundAndExpForm)
