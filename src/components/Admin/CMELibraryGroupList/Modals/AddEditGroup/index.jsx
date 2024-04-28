import { useMutation } from "@apollo/client"
import { Box, CssBaseline, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import _ from "lodash"
import { useSnackbar } from "notistack"
import React, { useEffect, useState } from "react"
import { FiEdit2, FiPlusSquare } from "react-icons/fi"
import { addEditCourseGroupMutation } from "../../../../../gql/mutations/Course"
import { ScrollToFormError } from "../../../../../helpers/FormErrorScroll"
import { TrackForm } from "../../../../../app/GlobalObjects/store/actions/TrackForm"
import Button from "../../../../utilities/Button"
import CustomDialog from "../../../../utilities/Dialog"
import IconFrame from "../../../../utilities/IconFrame"
import InputLabelContainer from "../../../../utilities/InputLabelContainer"
import validationSchema from "./validations/validation"

const INITIAL_VALUES = { title: "" }

function AddEditGroup({ open, selectedGrp, isEdit = false, handleClose = () => {}, refreshData = () => {} }) {
	const { enqueueSnackbar } = useSnackbar()
	const [initialValues, setInitialValues] = useState(INITIAL_VALUES)

	const [AddEditCourseGroup] = useMutation(addEditCourseGroupMutation)

	useEffect(() => {
		if (isEdit) {
			setInitialValues({
				title: selectedGrp.title,
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
				await AddEditCourseGroup({ variables: { ...values, id: isEdit ? selectedGrp.id : null } })
				enqueueSnackbar(isEdit ? "Specialty name updated successfully." : "Specialty added successfully.", {
					variant: "mui-alert",
					color: "success",
				})
				TrackForm({
					formId: isEdit ? "boarding_specialty_name_updated" : "boarding_specialty_added",
					variant: "success",
				})
				refreshData()
				handleClose()
			} catch (err) {
				TrackForm({
					formId: isEdit ? "boarding_specialty_name_updated" : "boarding_specialty_added",
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
						{isEdit ? "Edit" : "Add new"} Course group
					</Typography>
				</Box>
				<form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
					<ScrollToFormError formik={formik} />
					<Box className="f f-c g32">
						<InputLabelContainer label="Course group name">
							<TextField
								datafieldname="title"
								fullWidth
								id="title"
								name="title"
								type="text"
								placeholder="Enter course group name"
								variant="outlined"
								value={formik.values.title}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.title && Boolean(formik.errors.title)}
								helperText={formik.touched.title && formik.errors.title}
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

export default AddEditGroup
