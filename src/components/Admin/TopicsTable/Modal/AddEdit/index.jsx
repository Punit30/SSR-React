import { useMutation } from "@apollo/client"
import { Box, CssBaseline, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import _ from "lodash"
import { useSnackbar } from "notistack"
import React, { useEffect, useState } from "react"
import { FiEdit2, FiPlusSquare } from "react-icons/fi"
import validationSchema from "./validations/validation"
import { addTopicMutation, updateTopicMutation } from "../../../../../gql/mutations/Topic"
import { TrackForm } from "../../../../../app/GlobalObjects/store/actions/TrackForm"
import CustomDialog from "../../../../utilities/Dialog"
import IconFrame from "../../../../utilities/IconFrame"
import { ScrollToFormError } from "../../../../../helpers/FormErrorScroll"
import InputLabelContainer from "../../../../utilities/InputLabelContainer"
import Button from "../../../../utilities/Button"

const INITIAL_VALUES = { name: "" }

function AddEditModal({ open, selectedTopic, isEdit = false, handleClose = () => {}, refreshData = () => {} }) {
	const { enqueueSnackbar } = useSnackbar()
	const [initialValues, setInitialValues] = useState(INITIAL_VALUES)

	const [AddTopic] = useMutation(addTopicMutation)
	const [UpdateTopic] = useMutation(updateTopicMutation)

	useEffect(() => {
		if (isEdit) {
			setInitialValues({
				name: selectedTopic.name,
			})
		} else {
			setInitialValues(INITIAL_VALUES)
		}
		formik.resetForm()
	}, [open])

	const formik = useFormik({
		initialValues: initialValues,
		enableReinitialize: true,
		validationSchema: validationSchema,
		onSubmit: async () => {
			try {
				if (!isEdit) {
					await AddTopic({
						variables: {
							topicName: formik.values.name,
						},
					})
				} else {
					await UpdateTopic({
						variables: {
							topicId: selectedTopic.id,
							newTopicName: formik.values.name,
						},
					})
				}
				enqueueSnackbar(isEdit ? "Topic name updated successfully." : "Topic added successfully.", {
					variant: "mui-alert",
					color: "success",
				})
				TrackForm({
					formId: isEdit ? "topic_name_updated" : "topic_added",
					variant: "success",
				})
				refreshData()
				handleClose()
			} catch (err) {
				TrackForm({
					formId: isEdit ? "topic_name_updated" : "topic_added",
					variant: "danger",
				})
				_.forEach(_.get(err, "graphQLErrors", []), ({ message }) =>
					enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
				)
			}
		},
	})

	return (
		<CustomDialog
			open={open}
			close={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			width="432px"
		>
			<CssBaseline />
			<Box className="f f-c g32 align-center" padding="24px">
				<Box className="f f-c g16 align-center">
					<IconFrame
						icon={isEdit ? <FiEdit2 /> : <FiPlusSquare />}
						iconColor="#814cd6"
						iconSize="24px"
						backgroundColor="#f2edfc"
						boxSize="48px"
					/>

					<Typography color="#253010" fontSize="18px" fontWeight="600" lineHeight="26px">
						{isEdit ? "Edit topic" : "Add new topic"}
					</Typography>
				</Box>
				<form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
					<ScrollToFormError formik={formik} />
					<Box className="f f-c g32">
						<InputLabelContainer label="Topic name">
							<TextField
								datafieldname="name"
								fullWidth
								id="name"
								name="name"
								type="text"
								placeholder="Enter topic name"
								variant="outlined"
								value={formik.values.name}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.name && Boolean(formik.errors.name)}
								helperText={formik.touched.name && formik.errors.name}
							/>
						</InputLabelContainer>
						<Box className="w100 f g12 align-center justify-s-b">
							<Button fullWidth type="reset" variant="outlined" color="purple" onClick={handleClose}>
								Cancel
							</Button>
							<Button
								fullWidth
								type="submit"
								variant="contained"
								color="purple"
								disabled={formik.isSubmitting || !formik.dirty}
							>
								{formik.isSubmitting ? "Please wait..." : isEdit ? "Update" : "Add"}
							</Button>
						</Box>
					</Box>
				</form>
			</Box>
		</CustomDialog>
	)
}

export default AddEditModal
