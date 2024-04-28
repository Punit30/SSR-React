import React from "react"
import CustomDialog from "../../../../../utilities/Dialog"
import IconFrame from "../../../../../utilities/IconFrame"
import { FiAlertCircle } from "react-icons/fi"
import { Box, Typography } from "@mui/material"
import Button from "../../../../../utilities/Button"

function CloseQuiz({ open, isSubmitting, handleSubmit = async () => {}, handleClose = () => {} }) {
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
						icon={<FiAlertCircle size="24px" />}
						iconColor="#D92D20"
						iconSize="24px"
						backgroundColor="#FEE4E2"
						boxSize="48px"
					/>
					<Box className="f f-c g8 align-center">
						<Typography color="#101828" fontSize="18px" fontWeight="600" lineHeight="28px">
							Quit the assessment?
						</Typography>
						<Typography
							color="#667085"
							textAlign="center"
							fontSize="14px"
							fontWeight="400"
							lineHeight="20px"
						>
							Are you sure you want to quit the quiz? This will submit your response and you won’t be able
							to retake it, unless authorized by an admin.
						</Typography>
					</Box>
				</Box>
				<Box className="f g12 w100">
					<Button
						id="quit_quiz_modal_no"
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
						id="quit_quiz_modal_yes"
						className="track_button"
						fullWidth
						type="button"
						variant="contained"
						color="danger"
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

export default CloseQuiz
