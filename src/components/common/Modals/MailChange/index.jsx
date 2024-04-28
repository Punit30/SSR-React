import { Box, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import _ from "lodash"
import React, { useEffect, useState } from "react"
import { FiMail } from "react-icons/fi"
import Button from "../../../utilities/Button"
import CustomDialog from "../../../utilities/Dialog"
import InputLabelContainer from "../../../utilities/InputLabelContainer"
import validationSchema from "./validations/validation"

const INITIAL_VALUES = {
	email: "",
}

function MailChange({ preMail, open, handleSubmit = async () => {}, handleClose = () => {} }) {
	const [initialValues, setInitialValues] = useState(_.cloneDeep(INITIAL_VALUES))

	useEffect(() => {
		if (open && preMail) {
			setInitialValues({
				email: preMail,
			})
		} else {
			setInitialValues(_.cloneDeep(INITIAL_VALUES))
		}
		formik.resetForm()
	}, [open, preMail])

	const formik = useFormik({
		initialValues: initialValues,
		enableReinitialize: true,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			await handleSubmit(values.email)
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
			<Box className="f f-c g24 p24">
				<Box className="f f-c g16 align-center">
					<Typography
						className="f align-center justify-center b-rhalf"
						sx={{ backgroundColor: "#ECE4FB" }}
						color="#814CD6"
						fontSize="24px"
						lineHeight="normal"
						minHeight="48px"
						maxHeight="48px"
						minWidth="48px"
						maxWidth="48px"
					>
						<FiMail />
					</Typography>
					<Box className="f f-c g8 align-center">
						<Typography
							color="#101828"
							textAlign="center"
							fontSize="18px"
							fontWeight="600"
							lineHeight="26px"
						>
							Edit your email
						</Typography>
						<Typography
							color="#667085"
							textAlign="center"
							fontSize="14px"
							fontWeight="400"
							lineHeight="20px"
						>
							Please update your registered mail for account verification.
						</Typography>
					</Box>
				</Box>
				<form className="f f-c g32" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
					<InputLabelContainer label="Email">
						<TextField
							datafieldname="email"
							fullWidth
							id="email"
							name="email"
							type="text"
							placeholder="Enter your new email"
							variant="outlined"
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.email && Boolean(formik.errors.email)}
							helperText={formik.touched.email && formik.errors.email}
						/>
					</InputLabelContainer>
					<Box className="f g12 align-center">
						<Button
							id="edit_email_form_cancel"
							className="track_button"
							fullWidth
							variant="outlined"
							color="gray"
							type="reset"
							onClick={handleClose}
							disabled={formik.isSubmitting}
							sx={{ textDecoration: "none" }}
						>
							Cancel
						</Button>
						<Button
							id="edit_email_form_submit"
							className="track_button"
							fullWidth
							variant="contained"
							color="purple"
							type="submit"
							disabled={formik.isSubmitting || !formik.dirty}
						>
							{formik.isSubmitting ? "Please wait..." : "Update"}
						</Button>
					</Box>
				</form>
			</Box>
		</CustomDialog>
	)
}

export default MailChange
