import { useMutation } from "@apollo/client"
import { Box, FormHelperText, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import _ from "lodash"
import React, { useEffect, useState } from "react"
import { FiPlus, FiSearch, FiTrash2, FiX } from "react-icons/fi"
import { TAG_FORMAT } from "../../../../../Constants/data-types/quiz-types"
import {
	addOptionsMutation,
	addQuestionMutation,
	dltOptionMutation,
	updateOptionsMutation,
	updateQuestionMutation,
} from "../../../../../gql/mutations/Quiz"
import { ScrollToFormError } from "../../../../../helpers/FormErrorScroll"
import useSpecialty from "../../../../../helpers/hooks/useSpecialty"
import useTopics from "../../../../../helpers/hooks/useTopics"
import { TrackForm } from "../../../../../app/GlobalObjects/store/actions/TrackForm"
import Button from "../../../../utilities/Button"
import CustomDialog from "../../../../utilities/Dialog"
import InputLabelContainer from "../../../../utilities/InputLabelContainer"
import CustomSelect from "../../../../utilities/Select"
import Switch from "../../../../utilities/Switch"
import validationSchema from "./validation/validation"

const INITIAL_VALUES = {
	id: "",
	question: "",
	options: [
		{ value: "", isCorrect: false },
		{ value: "", isCorrect: false },
	],
	tags: [],
	topics: [],
	specialities: [],
	marks: "",
	isMultiChoice: false,
}

function AddEdit({ open, selectedQues, isEdit = false, handleClose = () => {}, refreshData = () => {} }) {
	const [initialValues, setInitialValues] = useState(_.cloneDeep(INITIAL_VALUES))
	const [dltOptionList, setDltOptionList] = useState([])

	const { data: specialtyData, loading: specialtyLoading } = useSpecialty()
	const { data: topicsData, loading: topicsLoading } = useTopics()

	const [AddQuestion] = useMutation(addQuestionMutation)
	const [UpdateQuestion] = useMutation(updateQuestionMutation)
	const [UpdateOptions] = useMutation(updateOptionsMutation)
	const [AddOptions] = useMutation(addOptionsMutation)
	const [DeleteOption] = useMutation(dltOptionMutation)

	const formik = useFormik({
		initialValues: initialValues,
		enableReinitialize: true,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			if (!isEdit) {
				await handleAddQues(values)
			} else {
				await handleEditQues(values)
			}
		},
	})

	useEffect(() => {
		if (isEdit) {
			setInitialValues(
				_.cloneDeep({
					id: selectedQues.id,
					question: selectedQues.question,
					options: selectedQues.options,
					tags: _.map(selectedQues.tags, (tag) => ({
						value: tag,
						label: tag[0] + tag.slice(1).toLowerCase(),
					})),
					specialities: _.map(selectedQues.specialities, (speciality) => ({
						value: speciality,
						label: speciality,
					})),
					topics: _.map(selectedQues.topics, (item) => ({ value: item, label: item })),
					marks: selectedQues.marks,
					isMultiChoice: selectedQues.isMultiChoice,
				})
			)
		} else {
			setInitialValues(_.cloneDeep(INITIAL_VALUES))
		}
		formik.resetForm()
	}, [open])

	const handleAddQues = async (values) => {
		try {
			const questionData = {
				question: values.question,
				speciality: _.map(values.specialities, "value"),
				topics: _.map(values.topics, "value"),
				tag: _.map(values.tags, "value"),
				marks: Number(values.marks),
				isMultiChoice: values.isMultiChoice,
				allowPartialScores: false,
				options: values.options,
			}

			await AddQuestion({ variables: questionData })

			refreshData()
			handleClose()
			enqueueSnackbar("Question added successfully.", { variant: "mui-alert", color: "success" })
			TrackForm({ formId: "quiz_question_form_submit", variant: "success" })
		} catch (e) {
			TrackForm({ formId: "quiz_question_form_submit", variant: "danger" })
			_.get(e, "graphQLErrors", []).forEach(({ message }) =>
				enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
			)
		}
	}

	const handleEditQues = async (values) => {
		try {
			await UpdateQuestion({
				variables: {
					id: values.id,
					question: values.question,
					speciality: _.map(values.specialities, "value"),
					topics: _.map(values.topics, "value"),
					isMultiChoice: values.isMultiChoice,
					allowPartialScores: false,
					tag: _.map(values.tags, "value"),
					marks: Number(values.marks),
				},
			})

			const updateOptionsPromises = _.map(values.options, async (option) => {
				if (_.has(option, "id")) {
					await UpdateOptions({
						variables: {
							id: option.id,
							value: option.value,
							isCorrect: option.isCorrect,
						},
					})
				} else {
					await AddOptions({
						variables: {
							questionId: values.id,
							value: option.value,
							isCorrect: option.isCorrect,
						},
					})
				}
			})

			const deleteOptionPromises = _.map(dltOptionList, (option) =>
				DeleteOption({ variables: { optionId: option.id } })
			)

			await Promise.all([...updateOptionsPromises, ...deleteOptionPromises])

			refreshData()
			handleClose()

			enqueueSnackbar("Question updated successfully.", { variant: "mui-alert", color: "success" })
			TrackForm({ formId: "quiz_question_form_edit", variant: "success" })
		} catch (e) {
			TrackForm({ formId: "quiz_question_form_edit", variant: "danger" })
			_.get(e, "graphQLErrors", []).forEach(({ message }) => toast("danger", message))
		}
	}

	return (
		<CustomDialog
			open={open}
			close={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			width="954px"
		>
			<Box className="f f-c">
				<Box className="f g12 align-center justify-s-b" padding="16px 24px" borderBottom="1px solid #E0E0E0">
					<Typography color="#343A40" fontSize="16px" fontWeight="500" lineHeight="24px">
						{isEdit ? "Edit" : "Add"} question
					</Typography>
					<IconButton onClick={handleClose} sx={{ padding: "4px" }}>
						<FiX size="24px" color="#6C757D" />
					</IconButton>
				</Box>
				<form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
					<ScrollToFormError formik={formik} />
					<Box className="f f-c">
						<Box
							className="f f-c g16"
							sx={{ overflowY: "auto" }}
							height="calc(var(--window-height) - 280px)"
							padding="16px 24px"
						>
							<InputLabelContainer label="Question">
								<Box className="f f-c">
									<textarea
										datafieldname="question"
										id="question"
										name="question"
										className={`text-area w100 h100 font-s14 font-w400 line-h19 resize-vertical ${
											formik.touched.question && Boolean(formik.errors.question)
												? "text-area__error"
												: ""
										}`}
										placeholder="Add question here"
										value={formik.values.question}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.question && Boolean(formik.errors.question) ? (
										<FormHelperText>
											{formik.touched.question && formik.errors.question}
										</FormHelperText>
									) : null}
								</Box>
							</InputLabelContainer>
							<InputLabelContainer label="Question is multiple choice:" direction="row">
								<Switch
									datafieldname="isMultiChoice"
									checked={formik.values.isMultiChoice}
									onChange={() => {
										formik.setFieldValue("isMultiChoice", !formik.values.isMultiChoice)
										formik.setFieldValue(
											"options",
											_.cloneDeep(
												formik.values.options.map((opt) => {
													return { ...opt, isCorrect: false }
												})
											)
										)
									}}
								/>
							</InputLabelContainer>
							<InputLabelContainer label="Options">
								<Box className="f f-c g8">
									{formik.touched.options &&
									formik.errors.options &&
									typeof formik.errors.options === "string" ? (
										<FormHelperText>
											{formik.touched.options && formik.errors.options}
										</FormHelperText>
									) : null}
									{_.map(formik.values.options, (option, index) => (
										<Box key={index} className="f g8 align-start" maxWidth="682px">
											<TextField
												datafieldname={`options.${index}`}
												key={index}
												fullWidth
												id={`options.${index}`}
												name={`options.${index}`}
												type="text"
												placeholder="Enter option"
												variant="outlined"
												value={option.value}
												onChange={(e) => {
													let newOptions = [...formik.values.options]
													newOptions[index].value = e.target.value
													formik.setFieldValue("options", _.cloneDeep(newOptions))
												}}
												onBlur={formik.handleBlur}
												error={
													formik.touched.options &&
													Boolean(formik.errors.options?.[index]?.value)
												}
												helperText={
													formik.touched.options && formik.errors.options?.[index]?.value
												}
												InputProps={{
													endAdornment:
														formik.values.options.length > 2 ? (
															<InputAdornment position="end">
																<IconButton
																	aria-label="toggle options[index] visibility"
																	onClick={() => {
																		let newOptions = [...formik.values.options]
																		newOptions.splice(index, 1)
																		formik.setFieldValue(
																			"options",
																			_.cloneDeep(newOptions)
																		)

																		if (option.hasOwnProperty("id")) {
																			setDltOptionList([...dltOptionList, option])
																		}
																	}}
																	edge="end"
																>
																	<FiTrash2 />
																</IconButton>
															</InputAdornment>
														) : null,
												}}
											/>
											<Box paddingTop="10px">
												<Switch
													checked={formik.values.options[index].isCorrect}
													onChange={() => {
														let newOptions = [...formik.values.options]
														newOptions[index].isCorrect = !newOptions[index].isCorrect
														formik.setFieldValue("options", _.cloneDeep(newOptions))
													}}
												/>
											</Box>
										</Box>
									))}
									<Button
										variant="text"
										color="purple"
										sx={{ width: "fit-content", gap: "4px", fontSize: "14px", lineHeight: "20px" }}
										onClick={() => {
											let options = formik.values.options
											options.push({ value: "", isCorrect: false })
											formik.setFieldValue("options", _.cloneDeep(options))
										}}
									>
										<FiPlus /> Add option
									</Button>
								</Box>
							</InputLabelContainer>
							<Box className="f f-c g16" maxWidth="638px">
								<InputLabelContainer label="Marks">
									<TextField
										datafieldname="marks"
										fullWidth
										id="marks"
										name="marks"
										type="text"
										placeholder="Add marks"
										variant="outlined"
										value={formik.values.marks}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										error={formik.touched.marks && Boolean(formik.errors.marks)}
										helperText={formik.touched.marks && formik.errors.marks}
									/>
								</InputLabelContainer>
								<InputLabelContainer label="Tags" datafieldname="tags">
									<CustomSelect
										value={formik.values.tags}
										isMulti
										options={TAG_FORMAT}
										name="tags"
										meta={{ error: formik.errors.tags, touched: formik.touched.tags }}
										placeholder="Select"
										onBlur={() => formik.setFieldTouched("tags", true)}
										onChange={async (value) => {
											if (
												!value.some((item) => {
													return item.value === "MEDICAL"
												})
											) {
												formik.setFieldValue("specialities", [])
											}
											await formik.setFieldValue("tags", value)
											formik.validateField("tags")
										}}
									/>
								</InputLabelContainer>
								{formik.values.tags.some((item) => item.value === "MEDICAL") ? (
									<InputLabelContainer label="Specialty" datafieldname="specialities">
										<CustomSelect
											isLoading={specialtyLoading}
											value={formik.values.specialities}
											lefticon={<FiSearch />}
											isMulti
											options={_.map(specialtyData, (item) => {
												return { value: item.name, label: item.name }
											})}
											name="specialities"
											meta={{
												error: formik.errors.specialities,
												touched: formik.touched.specialities,
											}}
											placeholder="Select"
											onBlur={() => formik.setFieldTouched("specialities", true)}
											onChange={async (value) => {
												await formik.setFieldValue("specialities", value)
												formik.validateField("specialities")
											}}
										/>
									</InputLabelContainer>
								) : null}
								<InputLabelContainer label="Topics">
									<CustomSelect
										isLoading={topicsLoading}
										value={formik.values.topics}
										isMulti
										options={_.map(topicsData, (item) => ({
											value: item.name,
											label: item.name,
										}))}
										name="topics"
										meta={{ error: formik.errors.topics, touched: formik.touched.topics }}
										placeholder="Select"
										onBlur={() => formik.setFieldTouched("topics", true)}
										onChange={async (value) => {
											await formik.setFieldValue("topics", value)
											formik.validateField("topics")
										}}
									/>
								</InputLabelContainer>
							</Box>
						</Box>
						<Box
							className="w100 f g12 align-center justify-end"
							padding="16px 24px"
							borderTop="1px solid #E0E0E0"
						>
							<Button type="reset" variant="outlined" color="purple" onClick={handleClose}>
								Cancel
							</Button>
							<Button type="submit" variant="contained" color="purple" disabled={formik.isSubmitting}>
								{formik.isSubmitting ? "Please wait..." : isEdit ? "Update question" : "Add question"}
							</Button>
						</Box>
					</Box>
				</form>
			</Box>
		</CustomDialog>
	)
}

export default AddEdit
