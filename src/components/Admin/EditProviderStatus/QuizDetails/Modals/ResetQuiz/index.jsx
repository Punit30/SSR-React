import { Box, CssBaseline, Typography } from "@mui/material"
import { IoAlert } from "react-icons/io5"
import CustomDialog from "../../../../../utilities/Dialog"
import IconFrame from "../../../../../utilities/IconFrame"
import Button from "../../../../../utilities/Button"

function ResetQuiz({ open, isSubmitting, handleSubmit = () => {}, handleClose = () => {} }) {
	return (
		<CustomDialog
			open={open}
			close={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			width="360px"
		>
			<CssBaseline />
			<Box className="f f-c g32 align-center" padding="24px">
				<Box className="f f-c g16 align-center">
					<IconFrame
						icon={<IoAlert />}
						iconColor="#DC2626"
						iconSize="24px"
						backgroundColor="#fee4e2"
						boxSize="48px"
					/>
					<Box className="f f-c align-center g8">
						<Typography color="#253010" fontSize="18px" fontWeight="600" lineHeight="26px">
							Reset quiz?
						</Typography>
						<Typography
							color="#596088"
							textAlign="center"
							fontSize="14px"
							fontWeight="400"
							lineHeight="20px"
						>
							Are you sure to reset the quiz? This will clear all the previous quiz data for this user.
						</Typography>
					</Box>
				</Box>
				<Box className="w100 f g12 align-center justify-s-b">
					<Button fullWidth disabled={isSubmitting} variant="contained" color="danger" onClick={handleClose}>
						No
					</Button>
					<Button fullWidth disabled={isSubmitting} variant="outlined" color="gray" onClick={handleSubmit}>
						{isSubmitting ? "Please wait..." : "Yes"}
					</Button>
				</Box>
			</Box>
		</CustomDialog>
	)
}

export default ResetQuiz
