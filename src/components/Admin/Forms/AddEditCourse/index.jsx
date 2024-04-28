import { useLazyQuery, useMutation } from "@apollo/client"
import { Box, CssBaseline, FormHelperText, IconButton, TextField, Typography } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import { useFormik } from "formik"
import _ from "lodash"
import moment from "moment"
import { useSnackbar } from "notistack"
import React, { useEffect, useRef, useState } from "react"
import { FiArrowLeft, FiFileText, FiSearch, FiTrash2, FiUploadCloud } from "react-icons/fi"
import ReactQuill from "react-quill"
import { connect } from "react-redux"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import {
	CREDIT_LIST,
	CREDIT_TYPES,
	FILE_TYPES,
	RESOURCE_FORMAT_TYPE,
} from "../../../../Constants/data-types/cme-formats"
import {
	addUpdateCMECourseMutation,
	getCourseUploadLinkMutation,
	updateCourseStatusMutation,
} from "../../../../gql/mutations/Course"
import { ScrollToFormError } from "../../../../helpers/FormErrorScroll"
import useSpecialty from "../../../../helpers/hooks/useSpecialty"
import useStates from "../../../../helpers/hooks/useState"
import useTopics from "../../../../helpers/hooks/useTopics"
import { TrackForm } from "../../../../app/GlobalObjects/store/actions/TrackForm"
import Button from "../../../utilities/Button"
import EditorToolbar, { formats, modules } from "../../../utilities/EditorToolbar"
import InputLabelContainer from "../../../utilities/InputLabelContainer"
import CustomSelect from "../../../utilities/Select"
import Switch from "../../../utilities/Switch"
import validationSchema from "./validations/validation"
import { getCMECourseQuery } from "../../../../gql/queries/Course"
import Loading from "./loading/Loading"
import useCreditType from "../../../../helpers/hooks/useCreditType"

const INITIAL_VALUES = {
	isJointProvider: false,
	title: "",
	description: "",
	credit: "",
	creditType: [],
	publishDate: "",
	expirationDate: "",
	courseFormat: "",
	courseType: "LINK",
	tags: [],
	specialty: [],
	topics: [],
	state: [],
	overview: "",
	feedbackLink: "",
	file: "",
	cmeCourseLink: "",
}

const COURSE_TYPE_LABEL = {
	LINK: { label: "Link", type: "string", formats: "string" },
	DOCUMENT: {
		label: "Upload document",
		type: "DOC, PDF, TXT",
		formats: "application/msword,text/plain,application/pdf",
	},
	VIDEO: { label: "Upload video", type: "MP4", formats: "video/mp4,video/mkv" },
	AUDIO: { label: "Upload audio", type: "MP3", formats: "audio/mp3,audio/mpeg" },
	SCORM: { label: "Upload scorm file", type: "ZIP", formats: "application/zip" },
}

function AddEditCourse() {
	const params = useParams()
	const { pathname } = useLocation()
	const fileRef = useRef(null)
	const navigate = useNavigate()
	const { enqueueSnackbar } = useSnackbar()

	const [initialValues, setInitialValues] = useState(_.cloneDeep(INITIAL_VALUES))
	const [isEdit, setIsEdit] = useState(false)
	const [loading, setLoading] = useState(false)
	const { data: specData, loading: specLoading } = useSpecialty()
	const { data: topicData, loading: topicLoading } = useTopics()
	const { data: stateData, loading: stateLoading } = useStates()
	const { data: cTData, loading: cTLoading } = useCreditType()

	const [GetCourse] = useLazyQuery(getCMECourseQuery, { fetchPolicy: "network-only" })

	const [AddUpdateCourse] = useMutation(addUpdateCMECourseMutation)
	const [GetUploadLink] = useMutation(getCourseUploadLinkMutation)
	const [UpdateCourseStatus] = useMutation(updateCourseStatusMutation)

	useEffect(() => {
		if (pathname.includes("/edit")) {
			setIsEdit(true)
			fetchData()
		}
	}, [])

	const fetchData = async () => {
		setLoading(true)
		try {
			const res = (await GetCourse({ variables: { courseId: params.id } })).data.getCMECourse
			setInitialValues({
				isJointProvider: res.jointProviderShip,
				title: res.title,
				description: res.description,
				credit: res.credits,
				creditType: res.creditType,
				publishDate: new Date(res.startDate),
				expirationDate: new Date(res.expirationDate),
				courseFormat: res.cmeCourseFormat,
				courseType: res.cmeCourseType,
				tags: res.tags,
				specialty: res.specialities,
				topics: res.topics,
				state: res.requiredStates,
				overview: res.courseOverview,
				feedbackLink: res.feedbackUrl,
				file:
					res.cmeCourseType !== "LINK"
						? {
								name: res.title,
								type: COURSE_TYPE_LABEL[res.cmeCourseType].formats.split(",")[0],
								change: false,
						  }
						: null,
				cmeCourseLink: res.cmeCourseLink,
			})
			formik.resetForm()
		} catch (e) {
			_.forEach(_.get(e, "graphQLErrors", []), ({ message }) =>
				enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
			)
		}
		setLoading(false)
	}

	const formik = useFormik({
		initialValues: initialValues,
		enableReinitialize: true,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				const res = (
					await AddUpdateCourse({
						variables: {
							id: params?.id ?? null,
							title: values.title,
							topics: values.topics,
							specialities: values.specialty,
							description: values.description,
							cmeCourseType: values.courseType,
							cmeCourseFormat: values.courseFormat,
							tags: values.tags,
							cmeCourseLink: values.courseType === "LINK" ? values.cmeCourseLink : "",
							credits: values.credit,
							creditType: values.creditType,
							cmeCourseGroupId: params.groupId,
							startDate: moment(values.publishDate, "DD/MM/YYYY").format("YYYY-MM-DDTHH:mm:ss"),
							expirationDate: moment(values.expirationDate, "DD/MM/YYYY").format("YYYY-MM-DDTHH:mm:ss"),
							requiredStates: values.state,
							feedbackUrl: values.feedbackLink,
							courseOverview: values.overview,
							jointProviderShip: Boolean(values.isJointProvider),
							source: values.isJointProvider ? "EXTERNAL" : "INTERNAL",
						},
					})
				).data.addOrUpdateCMECourse

				if (values.courseType !== "LINK" && values.file && !values.file.hasOwnProperty("change")) {
					const uploadLink = (
						await GetUploadLink({
							variables: {
								id: res.cmeId,
								source: values.isJointProvider ? "EXTERNAL" : "INTERNAL",
								version: res.version,
							},
						})
					).data.getCMEUploadLink

					let uploadError = false
					await fetch(uploadLink.url, {
						method: "PUT",
						body: values.file,
					})
						.then(async (response) => {
							await UpdateCourseStatus({
								variables: {
									id: uploadLink.id,
									source: uploadLink.source,
									version: uploadLink.version,
									status: true,
								},
							})
						})
						.catch((err) => {
							enqueueSnackbar(
								"File upload failed. All the details is saved and updated. Please upload the file again.",
								{ variant: "mui-alert", color: "error" }
							)
							uploadError = true
						})
					if (uploadError) {
						return
					}
				}

				TrackForm({ formId: "course_add_edit", variant: "success" })
				enqueueSnackbar("CME course added successfully.", { variant: "mui-alert", color: "success" })
				navigate("/dashboard/admin/cme-library")
			} catch (e) {
				TrackForm({ formId: "course_add_edit", variant: "danger" })
				_.forEach(
					_.get(e, "graphQLErrors", [{ message: "Something went wrong. Please try again." }]),
					({ message }) => enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
				)
			}
		},
	})

	const handleFileDrop = (e, setFieldValue) => {
		e.preventDefault()
		setFieldValue("file", e.dataTransfer.files[0])
	}

	return (
		<form className="f f-c g24" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
			<ScrollToFormError formik={formik} />
			<CssBaseline />
			<Box
				className="f align-center justify-s-b g12 flex-wrap"
				// padding="0px 0px 14px"
				borderBottom="1px solid #eaebf2"
				padding={{ xs: "0px 16px 14px", sm: "0px 24px 14px" }}
			>
				<Box className="f align-center g4">
					<IconButton sx={{ padding: "4px" }} component={Link} to="/dashboard/admin/cme-library">
						<FiArrowLeft color="#9A9CB0" size="24px" />
					</IconButton>
					<Typography color="#1B1C20" fontSize="18px" fontWeight="500" lineHeight="26px">
						{isEdit ? "Edit & update CME course" : "Create new CME course"}
					</Typography>
				</Box>
				<Box className="f g12">
					<Button variant="outlined" color="purple" type="reset">
						Discard
					</Button>
					<Button
						type="submit"
						variant="contained"
						color="purple"
						disabled={formik.isSubmitting || !formik.dirty || loading}
					>
						{formik.isSubmitting ? "Please wait..." : isEdit ? "Update course" : "Create course"}
					</Button>
				</Box>
			</Box>
			{loading ? (
				<Loading />
			) : (
				<Box
					className="f"
					flexDirection={{ xs: "column", md: "row" }}
					gap={{ xs: "24px", md: "48px" }}
					position="relative"
					height={{ xs: "auto", md: "calc(var(--window-height) - 178px)" }}
					sx={{ overflowY: "auto" }}
					padding={{ xs: "0px 16px 16px", sm: "0px 24px 32px" }}
				>
					<Box
						className="f f-c b-r16 g16 w100 h100"
						position={{ xs: "static", md: "sticky" }}
						top="0px"
						padding="16px 16px 24px 16px"
						maxWidth={{ xs: "none", md: "468px" }}
						sx={{ backgroundColor: "#F9F9FB" }}
						height="fit-content"
						minWidth="318px"
					>
						<Box className="f align-center g12 justify-s-b flex-wrap">
							<Typography color="#814CD6" fontSize="14px" fontWeight="500" lineHeight="20px">
								Is this a joint provider-ship course?
							</Typography>
							<Switch
								datafieldname="isMultiChoice"
								checked={formik.values.isJointProvider}
								onChange={(e) => {
									formik.setFieldValue("isJointProvider", !formik.values.isJointProvider)
									formik.setFieldValue("courseType", e.target.checked ? "SCORM" : "LINK")
									formik.setFieldValue("file", null)
								}}
							/>
						</Box>
						<InputLabelContainer label="CME title" datafieldname="title">
							<TextField
								fullWidth
								id="title"
								name="title"
								type="text"
								placeholder="Add title"
								variant="outlined"
								value={formik.values.title}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.title && Boolean(formik.errors.title)}
								helperText={formik.touched.title && formik.errors.title}
							/>
						</InputLabelContainer>
						<InputLabelContainer label="Source" datafieldname="description">
							<TextField
								fullWidth
								id="description"
								name="description"
								type="text"
								placeholder="Add source"
								variant="outlined"
								value={formik.values.description}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.description && Boolean(formik.errors.description)}
								helperText={formik.touched.description && formik.errors.description}
							/>
						</InputLabelContainer>
						<InputLabelContainer label="Credit" datafieldname="credit">
							<CustomSelect
								options={CREDIT_LIST}
								value={_.find(
									CREDIT_LIST,
									(item) => parseFloat(item.value) === parseFloat(formik.values.credit)
								)}
								name="credit"
								meta={{ error: formik.errors.credit, touched: formik.touched.credit }}
								placeholder="Select"
								onBlur={() => formik.setFieldTouched("credit", true)}
								onChange={async (value) => {
									await formik.setFieldValue("credit", value !== null ? value.value : "")
									formik.validateField("credit")
								}}
							/>
						</InputLabelContainer>
						<InputLabelContainer label="Credit type" datafieldname="creditType">
							<CustomSelect
								options={_.map(cTData, (creditType) => ({
									value: creditType.name,
									label: creditType.name,
								}))}
								value={formik.values.creditType.map((item) => ({
									value: item,
									label: item.charAt(0) + item.slice(1).toLowerCase(),
								}))}
								isMulti
								name="creditType"
								meta={{ error: formik.errors.creditType, touched: formik.touched.creditType }}
								placeholder="Select"
								onBlur={() => formik.setFieldTouched("creditType", true)}
								onChange={async (value) => {
									await formik.setFieldValue(
										"creditType",
										value.map((val) => val.value)
									)
									formik.validateField("creditType")
								}}
							/>
						</InputLabelContainer>
						<InputLabelContainer label="CME publish date" datafieldname="publishDate">
							<Box className="f f-c" sx={{ backgroundColor: "#FFF" }}>
								<LocalizationProvider dateAdapter={AdapterMoment}>
									<DatePicker
										disableFuture
										value={
											formik.values.publishDate
												? moment(formik.values.publishDate, "DD/MM/YYYY")
												: null
										}
										onOpen={() => formik.setFieldTouched("publishDate", true)}
										timezone="system"
										format="DD/MM/YYYY"
										onChange={async (e) => {
											await formik.setFieldValue("publishDate", e.format("DD/MM/YYYY"))
											formik.validateField("publishDate")
										}}
									/>
								</LocalizationProvider>
								{formik.touched.publishDate && Boolean(formik.errors.publishDate) ? (
									<FormHelperText sx={{ backgroundColor: "#F9F9FB" }}>
										{formik.touched.publishDate && formik.errors.publishDate}
									</FormHelperText>
								) : null}
							</Box>
						</InputLabelContainer>
						<InputLabelContainer label="CME expiration date" datafieldname="expirationDate">
							<Box className="f f-c" sx={{ backgroundColor: "#FFF" }}>
								<LocalizationProvider dateAdapter={AdapterMoment}>
									<DatePicker
										value={
											formik.values.expirationDate
												? moment(formik.values.expirationDate, "DD/MM/YYYY")
												: null
										}
										onOpen={() => formik.setFieldTouched("expirationDate", true)}
										timezone="system"
										format="DD/MM/YYYY"
										onChange={async (e) => {
											await formik.setFieldValue("expirationDate", e.format("DD/MM/YYYY"))
											formik.validateField("expirationDate")
										}}
									/>
								</LocalizationProvider>
								{formik.touched.expirationDate && Boolean(formik.errors.expirationDate) ? (
									<FormHelperText sx={{ backgroundColor: "#F9F9FB" }}>
										{formik.touched.expirationDate && formik.errors.expirationDate}
									</FormHelperText>
								) : null}
							</Box>
						</InputLabelContainer>
					</Box>
					<Box className="f f-c w100 g12" maxWidth={{ xs: "none", md: "468px" }}>
						<InputLabelContainer label="CME course format" datafieldname="courseFormat">
							<CustomSelect
								options={RESOURCE_FORMAT_TYPE}
								value={_.find(
									RESOURCE_FORMAT_TYPE,
									(item) => item.value === formik.values.courseFormat
								)}
								name="courseFormat"
								meta={{ error: formik.errors.courseFormat, touched: formik.touched.courseFormat }}
								placeholder="Select"
								onBlur={() => formik.setFieldTouched("courseFormat", true)}
								onChange={async (value) => {
									await formik.setFieldValue("courseFormat", value !== null ? value.value : "")
									formik.validateField("courseFormat")
								}}
							/>
						</InputLabelContainer>
						<InputLabelContainer label="CME course type" datafieldname="courseType">
							<CustomSelect
								options={[
									..._.map(_.cloneDeep(FILE_TYPES), (type) => ({
										...type,
										isDisabled: formik.values.isJointProvider,
									})),
									{ value: "SCORM", label: "Scorm", isDisabled: !formik.values.isJointProvider },
								]}
								value={{
									value: formik.values.courseType,
									label:
										formik.values.courseType.charAt(0) +
										formik.values.courseType.slice(1).toLowerCase(),
								}}
								name="courseType"
								meta={{ error: formik.errors.courseType, touched: formik.touched.courseType }}
								placeholder="Select"
								onBlur={() => formik.setFieldTouched("courseType", true)}
								onChange={async (value) => {
									await formik.setFieldValue("courseType", value !== null ? value.value : "")
									formik.validateField("courseType")
								}}
							/>
						</InputLabelContainer>
						<InputLabelContainer label="Tag(s)" datafieldname="tags">
							<CustomSelect
								value={formik.values.tags.map((item) => ({
									value: item,
									label: item.charAt(0) + item.slice(1).toLowerCase(),
								}))}
								leftIcon={<FiSearch />}
								isMulti
								placeholder="Select"
								options={[
									{ value: "CULTURAL", label: "Cultural" },
									{ value: "MEDICAL", label: "Medical" },
								]}
								meta={{
									error: formik.errors.tags,
									touched: formik.touched.tags,
								}}
								name="tags"
								onBlur={() => formik.setFieldTouched("tags", true)}
								onChange={async (value) => {
									if (!value.some((item) => item.value === "MEDICAL")) {
										formik.setFieldValue("specialty", [])
									}
									await formik.setFieldValue(
										"tags",
										value.map((item) => item.value)
									)
									formik.validateField("tags")
								}}
							/>
						</InputLabelContainer>
						{formik.values.tags.includes("MEDICAL") ? (
							<InputLabelContainer label="Specialty" datafieldname="specialty">
								<CustomSelect
									isMulti
									isDisabled={specLoading}
									isLoading={specLoading}
									leftIcon={<FiSearch />}
									placeholder="Select"
									value={_.map(formik.values.specialty, (item) => ({
										value: item,
										label: item,
									}))}
									options={_.map(specData, (spec) => ({ value: spec.name, label: spec.name }))}
									meta={{
										error: formik.errors.specialty,
										touched: formik.touched.specialty,
									}}
									name="specialty"
									onBlur={() => formik.setFieldTouched("specialty", true)}
									onChange={async (value) => {
										await formik.setFieldValue(
											"specialty",
											value.map((item) => item.value)
										)
										formik.validateField("specialty")
									}}
								/>
							</InputLabelContainer>
						) : null}
						<InputLabelContainer label="Topics" datafieldname="topics">
							<CustomSelect
								isMulti
								isDisabled={topicLoading}
								isLoading={topicLoading}
								leftIcon={<FiSearch />}
								placeholder="Select"
								value={_.map(formik.values.topics, (item) => ({
									value: item,
									label: item,
								}))}
								options={_.map(topicData, (topic) => ({ value: topic.name, label: topic.name }))}
								meta={{
									error: formik.errors.topics,
									touched: formik.touched.topics,
								}}
								name="topics"
								onBlur={() => formik.setFieldTouched("topics", true)}
								onChange={async (value) => {
									await formik.setFieldValue(
										"topics",
										value.map((item) => item.value)
									)
									formik.validateField("topics")
								}}
							/>
						</InputLabelContainer>
						<InputLabelContainer label="State" datafieldname="state">
							<CustomSelect
								isMulti
								isDisabled={stateLoading}
								isLoading={stateLoading}
								leftIcon={<FiSearch />}
								placeholder="Select"
								value={_.map(formik.values.state, (item) => ({
									value: item,
									label: item,
								}))}
								options={_.map(stateData, (state) => ({ value: state, label: state }))}
								meta={{
									error: formik.errors.state,
									touched: formik.touched.state,
								}}
								name="state"
								onBlur={() => formik.setFieldTouched("state", true)}
								onChange={async (value) => {
									await formik.setFieldValue(
										"state",
										value.map((item) => item.value)
									)
									formik.validateField("state")
								}}
							/>
						</InputLabelContainer>
						<InputLabelContainer label="Course overview" datafieldname="overview">
							<Box className="f f-c">
								<EditorToolbar toolbarId={"t2"} />
								<ReactQuill
									placeholder="Add overview here..."
									theme="snow"
									modules={modules("t2")}
									formats={formats}
									style={{ borderRadius: "12px" }}
									value={formik.values.overview}
									onChange={(value) => formik.setFieldValue("overview", value)}
								/>
							</Box>
						</InputLabelContainer>
						<InputLabelContainer label="Feedback link" datafieldname="feedbackLink">
							<TextField
								fullWidth
								id="feedbackLink"
								name="feedbackLink"
								type="text"
								placeholder="Add feedback link"
								variant="outlined"
								value={formik.values.feedbackLink}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.feedbackLink && Boolean(formik.errors.feedbackLink)}
								helperText={formik.touched.feedbackLink && formik.errors.feedbackLink}
							/>
						</InputLabelContainer>
						{/* <Editor /> */}
						<Box paddingBottom={{ xs: "0px", md: "24px" }}>
							<InputLabelContainer label={COURSE_TYPE_LABEL[formik.values.courseType].label}>
								{formik.values.courseType === "LINK" ? (
									<TextField
										datafieldname="cmeCourseLink"
										fullWidth
										id="cmeCourseLink"
										name="cmeCourseLink"
										type="text"
										placeholder="Enter link"
										variant="outlined"
										value={formik.values.cmeCourseLink}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										error={formik.touched.cmeCourseLink && Boolean(formik.errors.cmeCourseLink)}
										helperText={formik.touched.cmeCourseLink && formik.errors.cmeCourseLink}
									/>
								) : (
									<Box className="f f-c g8 w100" datafieldname="file">
										<input
											style={{ display: "none" }}
											id="file"
											name="file"
											accept={COURSE_TYPE_LABEL[formik.values.courseType].formats}
											type="file"
											ref={fileRef}
											onChange={(event) =>
												formik.setFieldValue("file", event.currentTarget.files[0])
											}
										/>
										<Box
											className="f f-c g8"
											onDragOver={(e) => e.preventDefault()}
											onDrop={(e) => handleFileDrop(e, formik.setFieldValue)}
										>
											{formik.values.file ? (
												<Box
													className="f align-center justify-s-b g12 b-r8"
													border="1px solid #D9DAE6"
													padding="12px 16px"
												>
													<Box className="f align-center g8">
														<FiFileText size="20px" color="#9A9CB0" />
														<Typography
															color="#717385"
															fontSize="14px"
															fontWeight="400"
															lineHeight="20px"
														>
															{formik.values.file.name}
														</Typography>
													</Box>
													<IconButton
														sx={{ padding: "4px" }}
														onClick={() => {
															fileRef.current.value = null
															formik.setFieldValue("file", null)
														}}
													>
														<FiTrash2 size="20px" color="#EF4444" />
													</IconButton>
												</Box>
											) : (
												<Box
													className="f f-c align-center justify-center g4 b-r8 cursor-pointer"
													padding="16px 24px"
													border="1px dashed #d9dae6"
													onClick={() => {
														fileRef.current.click()
														formik.setFieldTouched("file", true)
													}}
												>
													<Box
														className="f align-center justify-center p10 b-rhalf"
														border="6px solid #F9F5FF"
														sx={{ backgroundColor: "#F4EBFF" }}
													>
														<FiUploadCloud color="#814CD6" />
													</Box>
													<Box textAlign="center">
														<Typography
															color="#6941C6"
															display="inline"
															fontSize="14px"
															lineHeight="20px"
															fontWeight="500"
														>
															Click to upload
														</Typography>{" "}
														<Typography
															display="inline"
															color="#9A9CB0"
															fontSize="14px"
															fontWeight="400"
															lineHeight="20px"
														>
															or drag and drop
														</Typography>
													</Box>
													<Typography
														color="#717385"
														fontSize="12px"
														fontWeight="400"
														lineHeight="18px"
													>
														{COURSE_TYPE_LABEL[formik.values.courseType].type}
													</Typography>
												</Box>
											)}
											{formik.touched.file && Boolean(formik.errors.file) ? (
												<FormHelperText>
													{formik.touched.file && formik.errors.file}
												</FormHelperText>
											) : null}
										</Box>
									</Box>
								)}
							</InputLabelContainer>
						</Box>
					</Box>
				</Box>
			)}
		</form>
	)
}

export default AddEditCourse
