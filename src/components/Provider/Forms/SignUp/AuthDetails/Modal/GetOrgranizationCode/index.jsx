import { useLazyQuery } from "@apollo/client"
import { Box, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import { useSnackbar } from "notistack"
import React from "react"
import { FiKey } from "react-icons/fi"
import { useDispatch } from "react-redux"
import { getOrganizationByCodeQuery } from "../../../../../../../gql/queries/Organization"
import { TrackForm } from "../../../../../../../app/GlobalObjects/store/actions/TrackForm"
import Button from "../../../../../../utilities/Button"
import CustomDialog from "../../../../../../utilities/Dialog"
import InputLabelContainer from "../../../../../../utilities/InputLabelContainer"
import validationSchema from "./validations/validation"
import { Link } from "react-router-dom"
import { setHelpModal } from "../../../../../../../app/GlobalObjects/store/reducers/Modal"
import IconFrame from "../../../../../../utilities/IconFrame"

const STYLES = {
	helper: {
		display: "inline",
		fontSize: "14px",
		fontWeight: "400",
		lineHeight: "20px",
		textDecoration: "none",
	},
}

function GetOrganizationCode({ open, setOrgCode, handleClose = () => {} }) {
	const dispatch = useDispatch()
	const { enqueueSnackbar } = useSnackbar()

	const [ValidateOrgCode] = useLazyQuery(getOrganizationByCodeQuery)

	const formik = useFormik({
		initialValues: { orgCode: "" },
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			const res = await ValidateOrgCode({ variables: { organisationCode: values.orgCode } })
			if (res.error) {
				enqueueSnackbar("Organization code is invalid. Please enter valid code.", {
					variant: "mui-alert",
					color: "error",
				})
				TrackForm({ formId: "provider_signup_organization_form_submit", variant: "danger" })
			} else if (res.data) {
				setOrgCode(values.orgCode)
				handleClose()
				enqueueSnackbar("Organization code submitted.", { variant: "mui-alert", color: "success" })
				TrackForm({ formId: "provider_signup_organization_form_submit", variant: "success" })
			}
		},
	})

	return (
		<CustomDialog
			open={open}
			close={() => {}}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			width="432px"
		>
			<Box className="f f-c g24 p24">
				<Box className="f f-c g16 align-center">
					<IconFrame
						icon={<FiKey />}
						iconColor="#814CD6"
						iconSize="24px"
						backgroundColor="#ECE4FB"
						boxSize="48px"
					/>
					<Typography color="#101828" textAlign="center" fontSize="18px" fontWeight="600" lineHeight="26px">
						Do you have organization code?
					</Typography>
				</Box>
				<form className="f f-c g32" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
					<Box className="f f-c g20">
						<InputLabelContainer label="Organization code">
							<TextField
								datafieldname="orgCode"
								fullWidth
								id="orgCode"
								name="orgCode"
								type="text"
								placeholder="Enter your new password"
								variant="outlined"
								value={formik.values.orgCode}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.orgCode && Boolean(formik.errors.orgCode)}
								helperText={formik.touched.orgCode && formik.errors.orgCode}
							/>
						</InputLabelContainer>
						<Box className="f f-c g8">
							<Box display="inline">
								<Typography color="#9A9CB0" sx={STYLES.helper}>
									Don't have an organization code?
								</Typography>{" "}
								<Typography
									color="#814CD6"
									sx={STYLES.helper}
									component={Link}
									to="/provider-comming-soon"
								>
									Get notified
								</Typography>{" "}
								<Typography color="#9A9CB0" sx={STYLES.helper}>
									when we expand.
								</Typography>
							</Box>
							<Box display="inline">
								<Typography color="#9A9CB0" sx={STYLES.helper}>
									Organization code isn't working?
								</Typography>{" "}
								<Typography
									color="#814CD6"
									sx={{ ...STYLES.helper, cursor: "pointer" }}
									onClick={() => dispatch(setHelpModal(true))}
								>
									Contact us
								</Typography>
							</Box>
						</Box>
					</Box>
					<Box className="f g12 align-center">
						<Button
							id="organization_code_modal_cancel"
							className="track_button"
							fullWidth
							component={Link}
							to="/signup"
							variant="outlined"
							color="gray"
							type="reset"
							disabled={formik.isSubmitting}
							sx={{ textDecoration: "none" }}
						>
							Cancel
						</Button>
						<Button
							id="organization_code_modal_submit"
							className="track_button"
							fullWidth
							variant="contained"
							color="purple"
							type="submit"
							disabled={formik.isSubmitting || !formik.dirty}
						>
							{formik.isSubmitting ? "Please wait..." : "Submit"}
						</Button>
					</Box>
				</form>
			</Box>
		</CustomDialog>
	)
}

export default GetOrganizationCode
