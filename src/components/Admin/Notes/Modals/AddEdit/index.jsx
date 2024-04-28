import { useMutation } from "@apollo/client"
import { Box, CssBaseline, FormHelperText, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import _ from "lodash"
import { useSnackbar } from "notistack"
import React, { useEffect, useState } from "react"
import { FiEdit2, FiPlusSquare } from "react-icons/fi"

import { addNoteMutation, editNoteMutation } from "../../../../../gql/mutations/Notes"
import validationSchema from "./validations/validation"
import { TrackForm } from "../../../../../app/GlobalObjects/store/actions/TrackForm"
import IconFrame from "../../../../utilities/IconFrame"
import { ScrollToFormError } from "../../../../../helpers/FormErrorScroll"
import InputLabelContainer from "../../../../utilities/InputLabelContainer"
import Button from "../../../../utilities/Button"
import CustomDialog from "../../../../utilities/Dialog"

const INITIAL_VALUES = { note: "" }

function AddEdit({ providerId, open, selectedNote, isEdit = false, handleClose = () => {}, refreshData = () => {} }) {
	const { enqueueSnackbar } = useSnackbar()
	const [initialValues, setInitialValues] = useState(INITIAL_VALUES)

	const [AddNote] = useMutation(addNoteMutation)
	const [UpdateNote] = useMutation(editNoteMutation)

	useEffect(() => {
		if (isEdit) {
			setInitialValues({
				note: selectedNote.remarks,
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
		onSubmit: async (values) => {
			try {
				if (!isEdit) {
					await AddNote({
						variables: { remarks: values.note, assignedTo: providerId },
					})
				} else {
					await UpdateNote({
						variables: { id: selectedNote.id, remarks: values.note, assignedTo: providerId },
					})
				}
				enqueueSnackbar(isEdit ? "Note updated successfully." : "Note added successfully.", {
					variant: "mui-alert",
					color: "success",
				})
				TrackForm({
					formId: isEdit ? "provider_note_edit" : "provider_note_add",
					variant: "success",
				})
				refreshData()
				handleClose()
			} catch (err) {
				TrackForm({
					formId: isEdit ? "provider_note_edit" : "provider_note_add",
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
			width="512px"
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
						{isEdit ? "Edit note" : "Add new note"}
					</Typography>
				</Box>
				<form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
					<ScrollToFormError formik={formik} />
					<Box className="f f-c g32">
						<Box className="f f-c g8">
							<InputLabelContainer label="Note">
								<Box className="f f-c">
									<textarea
										datafieldname="note"
										id="note"
										name="note"
										className={`text-area w100 h100 font-s14 font-w400 line-h19 resize-vertical ${
											formik.touched.note && Boolean(formik.errors.note) ? "text-area__error" : ""
										}`}
										style={{ height: "160px" }}
										placeholder="Add note here"
										value={formik.values.note}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.note && Boolean(formik.errors.note) ? (
										<FormHelperText>{formik.touched.note && formik.errors.note}</FormHelperText>
									) : null}
								</Box>
							</InputLabelContainer>
							<Typography color="#717385" fontWeight="400" fontSize="14px" lineHeight="20px">
								Note is only visible to you. This won’t be visible to provider.
							</Typography>
						</Box>
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

export default AddEdit
