import React from "react"
import CustomDialog from "../../../../utilities/Dialog"
import Button from "../../../../utilities/Button"
import { Link } from "react-router-dom"
import { Box, Typography } from "@mui/material"

function RedirectNotice({ open, handleClose, redirectLink }) {
	return (
		<CustomDialog
			open={open}
			close={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			width="954px"
		>
			<Box className="f f-c g32">
				<Box className="f f-c g8 align-center">
					<Typography textAlign="center" fontWeight="600" fontSize="18px" lineHeight="26px" color="#101828">
						Redirection notice!
					</Typography>
					<Typography textAlign="center" fontWeight="400" fontSize="14px" lineHeight="20px" color="#667085">
						This course is hosted by an external party. By clicking OK, you will be directed off
						inclusiveplus.co. Upon completing the course, please return to inclusiveplus.co to upload your
						certificate of completion.
					</Typography>
				</Box>
				<Box className="w100 f g12 align-center justify-end" padding="16px 24px" borderTop="1px solid #E0E0E0">
					<Button
						id="cme_course_redirect_modal_cancel"
						className="track_button"
						type="reset"
						variant="outlined"
						color="purple"
						onClick={handleClose}
					>
						Cancel
					</Button>
					<Button
						id="cme_course_redirect_modal_ok"
						className="track_button"
						type="submit"
						variant="contained"
						color="purple"
						component={Link}
						to={redirectLink}
					>
						OK
					</Button>
				</Box>
			</Box>
		</CustomDialog>
	)
}

export default RedirectNotice
