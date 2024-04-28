import _ from "lodash"
import React, { useEffect, useRef, useState } from "react"
import {
	addProviderCMECertificateMutation,
	updateProviderCMECertificateMutation,
} from "../../../../../gql/mutations/Certificates"
import { useMutation } from "@apollo/client"
import { useFormik } from "formik"
import validationSchema from "./validations/validation"
import CustomDialog from "../../../../utilities/Dialog"
import { Box, CssBaseline, FormHelperText, IconButton, Typography } from "@mui/material"
import InputLabelContainer from "../../../../utilities/InputLabelContainer"
import useResourcesTitle from "../../../../../helpers/hooks/useResourcesTitle"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import moment from "moment"
import CustomSelect from "../../../../utilities/Select"
import { CME_RATING_LIST, CREDIT_LIST, CREDIT_TYPES } from "../../../../../Constants/data-types/cme-formats"
import Button from "../../../../utilities/Button"
import { FiFileText, FiTrash2, FiUpload } from "react-icons/fi"
import { ScrollToFormError } from "../../../../../helpers/FormErrorScroll"
import { TrackForm } from "../../../../../app/GlobalObjects/store/actions/TrackForm"
import { enqueueSnackbar, useSnackbar } from "notistack"
import useCourseTitle from "../../../../../helpers/hooks/useCourseTitle"

const INITIAL_VALUES = {
	file: null,
	completionDate: "",
	value: "",
	certName: "",
	rating: null,
}

function AddEditCert({ open, selectedCert = null, isEdit = false, refreshData = () => {}, handleClose = () => {} }) {
	const { enqueueSnackbar } = useSnackbar()
	const fileRef = useRef()
	const [initialValues, setInitialValues] = useState(_.cloneDeep(INITIAL_VALUES))

	const [EditCert] = useMutation(updateProviderCMECertificateMutation)
	const [AddCert] = useMutation(addProviderCMECertificateMutation)

	const { data: cTData, loading: cTLoading } = useCourseTitle()

	useEffect(() => {
		if (open) {
			if (isEdit) {
				setInitialValues(
					_.cloneDeep({
						file: {
							name: selectedCert.certificateName,
							type: "application/pdf",
							change: false,
						},
						completionDate: selectedCert.completionDate,
						value: selectedCert.value,
						certName: selectedCert.certificateName,
						rating: selectedCert.rating
							? CME_RATING_LIST.filter((rate) => rate.value === selectedCert.rating)[0]
							: null,
					})
				)
			} else {
				setInitialValues(_.cloneDeep(INITIAL_VALUES))
			}
		} else {
			setInitialValues(_.cloneDeep(INITIAL_VALUES))
		}
		formik.resetForm()
	}, [open])

	const formik = useFormik({
		initialValues: initialValues,
		enableReinitialize: true,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			if (isEdit) {
				await handleEdit(values)
			} else {
				await handleAdd(values)
			}
		},
	})

	const handleEdit = async (values) => {
		try {
			const payload = {
				certificateId: Number(selectedCert.certificateId),
				completionDate: new Date(_.get(values, "completionDate", null)),
				points: _.get(values, "value", ""),
				rating: _.get(values, "rating.value", ""),
			}

			const res = await EditCert({
				variables: payload,
			})

			const url = _.get(res, "data.updateCMECertificate.launchLink", "")

			if (!_.isEmpty(values.file) && !_.get(values.file, "change")) {
				// File upload on S3 bucket
				await fetch(url, {
					method: "PUT",
					body: _.get(values, "file", ""),
				})
					.then((data) => {
						refreshData()
						handleClose()
					})
					.catch((error) => console.log("error", error))
			} else {
				TrackForm({ formId: "CME_certificate_upload_form_submit", variant: "success" })
				enqueueSnackbar("Your certificate has been re-uploaded.", { variant: "mui-alert", color: "success" })
				refreshData()
				handleClose()
			}
		} catch (e) {
			TrackForm({ formId: "CME_certificate_upload_form_submit", variant: "danger" })
			if (!_.isEmpty(e.graphQLErrors)) {
				e.graphQLErrors.forEach(({ message }) => {
					enqueueSnackbar("Submission failed. Please try again..", { variant: "mui-alert", color: "error" })
				})
			}
		}
	}

	const handleAdd = async (values) => {
		try {
			const payload = {
				certificate: _.get(values, "certName", ""),
				comment: "",
				completionDate: moment(values.completionDate, "DD/MM/YYYY").format("YYYY-MM-DDTHH:mm:ss"),
				points: _.get(values, "value", ""),
				source: "INTERNAL",
				rating: _.get(values, "rating.value", ""),
			}

			const res = await AddCert({
				variables: payload,
			})

			const url = _.get(res, "data.addCMECertificate.launchLink", "")

			// File upload on S3 bucket
			await fetch(url, {
				method: "PUT",
				body: _.get(values, "file", ""),
			})
				.then((data) => {
					TrackForm({ formId: "CME_certificate_upload_form_submit", variant: "success" })
					enqueueSnackbar("Your certificate added successfully.", { variant: "mui-alert", color: "success" })
					refreshData()
					handleClose()
				})
				.catch((error) => console.log("error", error))
		} catch (e) {
			TrackForm({ formId: "CME_certificate_upload_form_submit", variant: "danger" })
			if (!_.isEmpty(e.graphQLErrors)) {
				e.graphQLErrors.forEach(({ message }) => {
					enqueueSnackbar("Submission failed. Please try again.", { variant: "mui-alert", color: "error" })
				})
			}
		}
	}

	const cme_resource_options = _.map(cTData, (title) => ({ value: title.id, label: title.name }))

	return (
		<CustomDialog
			open={open}
			close={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			width="432px"
		>
			<CssBaseline />
			<form className="f f-c g24 p24" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
				<ScrollToFormError formik={formik} />
				<Box className="f f-c g8">
					<Typography color="#101828" fontSize="18px" fontWeight="500" lineHeight="26px">
						Upload your CME certificate
					</Typography>
					<Typography color="#667085" fontSize="14px" fontWeight="400" lineHeight="20px">
						Only certificates in PDF format can be uploaded.
					</Typography>
				</Box>
				<Box className="f f-c g16">
					<InputLabelContainer label="CME title" datafieldname="certName">
						<CustomSelect
							isLoading={cTLoading}
							isDisabled={isEdit || cTLoading}
							value={_.find(cme_resource_options, (res) => res.label === formik.values.certName)}
							options={cme_resource_options}
							name="certName"
							meta={{ error: formik.errors.certName, touched: formik.touched.certName }}
							placeholder="Select CME title"
							onBlur={() => formik.setFieldTouched("certName", true)}
							onChange={async (value) => {
								await formik.setFieldValue("certName", value.value)
								formik.validateField("certName")
							}}
						/>
					</InputLabelContainer>
					<InputLabelContainer label="CME certificate" datafieldname="file">
						<input
							style={{ display: "none" }}
							id="file"
							name="file"
							placeholder="e.g. 1 or 0.5"
							accept="application/pdf"
							type="file"
							ref={fileRef}
							onChange={(event) => formik.setFieldValue("file", event.currentTarget.files[0])}
						/>
						{formik.values.file ? (
							<Box
								className="f align-center g8 justify-s-b b-r8"
								padding="12px 16px"
								border="1px solid #D9DAE6"
							>
								<Box className="f align-center g8">
									<Typography fontSize="20px" color="#9A9CB0" lineHeight="14px">
										<FiFileText />
									</Typography>
									<Typography color="#717385" fontSize="14px" fontWeight="400" lineHeight="20px">
										{formik.values.file?.name}
									</Typography>
								</Box>
								<IconButton
									id="cme_certificate_upload_modal_file_dlt"
									className="track_button"
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
							<Button
								id="cme_modal_upload_certificate"
								className="track_button"
								fullWidth
								variant="contained"
								color="purple"
								onClick={() => {
									fileRef.current.click()
									formik.setFieldTouched("file", true)
								}}
							>
								<FiUpload size="20px" /> Upload file
							</Button>
						)}
						{formik.touched.file && Boolean(formik.errors.file) ? (
							<FormHelperText>{formik.touched.file && formik.errors.file}</FormHelperText>
						) : null}
					</InputLabelContainer>
					<InputLabelContainer label="Completion date" datafieldname="completionDate">
						<LocalizationProvider dateAdapter={AdapterMoment}>
							<DatePicker
								disableFuture
								value={
									formik.values.completionDate
										? moment(formik.values.completionDate, "DD/MM/YYYY")
										: null
								}
								onOpen={() => formik.setFieldTouched("completionDate", true)}
								timezone="system"
								format="DD/MM/YYYY"
								onChange={async (e) => {
									await formik.setFieldValue("completionDate", e.format("DD/MM/YYYY"))
									formik.validateField("completionDate")
								}}
							/>
						</LocalizationProvider>
						{formik.touched.completionDate && Boolean(formik.errors.completionDate) ? (
							<FormHelperText>
								{formik.touched.completionDate && formik.errors.completionDate}
							</FormHelperText>
						) : null}
					</InputLabelContainer>
					<InputLabelContainer label="Credit hours" datafieldname="value">
						<CustomSelect
							options={CREDIT_LIST}
							value={
								formik.values.value
									? {
											value: formik.values.value,
											label: formik.values.value,
									  }
									: null
							}
							name="value"
							meta={{ error: formik.errors.value, touched: formik.touched.value }}
							placeholder="Select credit hours"
							onBlur={() => formik.setFieldTouched("value", true)}
							onChange={async (value) => {
								await formik.setFieldValue("value", value.value)
								formik.validateField("value")
							}}
						/>
					</InputLabelContainer>
					<InputLabelContainer label="How satisfied are you with this course?" datafieldname="rating">
						<CustomSelect
							options={CME_RATING_LIST}
							value={
								formik.values.rating !== null
									? {
											value: formik.values.rating.value,
											label: formik.values.rating.label,
									  }
									: null
							}
							name="rating"
							meta={{ error: formik.errors.rating, touched: formik.touched.rating }}
							placeholder="Select"
							onBlur={() => formik.setFieldTouched("rating", true)}
							onChange={async (value) => {
								await formik.setFieldValue("rating", value)
								formik.validateField("rating")
							}}
						/>
					</InputLabelContainer>
				</Box>
				<Box className="f align-center g12">
					<Button
						id="upload_cme_modal_cancel"
						className="track_button"
						fullWidth
						type="reset"
						variant="outlined"
						color="gray"
						onClick={handleClose}
						disabled={formik.isSubmitting}
					>
						Cancel
					</Button>
					<Button
						id="upload_cme_modal_submit"
						className="track_button"
						fullWidth
						type="submit"
						variant="contained"
						color="purple"
						disabled={formik.isSubmitting || !formik.dirty}
					>
						{formik.isSubmitting ? "Please wait..." : "Submit"}
					</Button>
				</Box>
			</form>
		</CustomDialog>
	)
}

export default AddEditCert
