import { Box, Typography } from "@mui/material"
import React from "react"
import { FiHelpCircle } from "react-icons/fi"
import CustomDialog from "../../../../../utilities/Dialog"
import IconFrame from "../../../../../utilities/IconFrame"
import Button from "../../../../../utilities/Button"

function SubmitQuiz({ open, isSubmitting, handleSubmit = async () => {}, handleClose = () => {} }) {
	return (
		<CustomDialog
			open={open}
			close={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			width="432px"
		>
			<Box className="f f-c g32 align-center p24">
				<Box className="f f-c g16 align-center">
					<IconFrame
						icon={<FiHelpCircle size="24px" />}
						iconColor="#814CD6"
						iconSize="24px"
						backgroundColor="#F4EBFF"
						boxSize="48px"
					/>
					<Box className="f f-c g8 align-center">
						<Typography color="#101828" fontSize="18px" fontWeight="600" lineHeight="28px">
							Submit the assessment?
						</Typography>
						<Typography
							color="#667085"
							textAlign="center"
							fontSize="14px"
							fontWeight="400"
							lineHeight="20px"
						>
							Are you sure you want to submit this assessment. This action cannot be undone.
						</Typography>
					</Box>
				</Box>
				<Box className="f g12 w100">
					<Button
						id="quiz_submit_modal_cancel"
						className="track_button"
						fullWidth
						type="button"
						variant="outlined"
						color="gray"
						disabled={isSubmitting}
						onClick={handleClose}
					>
						No
					</Button>
					<Button
						id="quiz_submit_modal_submit"
						className="track_button"
						fullWidth
						type="button"
						variant="contained"
						color="purple"
						disabled={isSubmitting}
						onClick={async () => {
							const res = await handleSubmit()
							if (res) {
								handleClose()
							}
						}}
					>
						{isSubmitting ? "Please wait..." : "Yes"}
					</Button>
				</Box>
			</Box>
		</CustomDialog>
	)
}

export default SubmitQuiz
