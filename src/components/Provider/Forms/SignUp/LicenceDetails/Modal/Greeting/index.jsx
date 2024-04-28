import React from "react"
import CustomDialog from "../../../../../../utilities/Dialog"
import Button from "../../../../../../utilities/Button"
import IconFrame from "../../../../../../utilities/IconFrame"
import { FiCheckCircle } from "react-icons/fi"
import { Box, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { resetLayout } from "../../../../../../../app/GlobalObjects/store/reducers/Layout"

function Greeting({ open, handleClose = () => {} }) {
	const dispatch = useDispatch()

	return (
		<CustomDialog
			open={open}
			close={() => {}}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			width="432px"
		>
			<Box className="f f-c g32 p24 align-center">
				<Box className="f f-c g16 align-center">
					<IconFrame
						icon={<FiCheckCircle />}
						iconColor="#039855"
						iconSize="24px"
						backgroundColor="#D1FADF"
						boxSize="48px"
					/>
					<Box className="f f-c g8">
						<Typography
							color="#101828"
							textAlign="center"
							fontSize="18px"
							fontWeight="600"
							lineHeight="28px"
						>
							Thank you!
						</Typography>
						<Typography
							color="#667085"
							textAlign="center"
							fontSize="14px"
							fontWeight="400"
							lineHeight="20px"
						>
							You will be notified via email when we onboard providers with your qualifications. Stay
							tuned!
						</Typography>
					</Box>
				</Box>
				<Button
					id="provider_other_degree_greeting_modal_close"
					className="track_button"
					fullWidth
					variant="outlined"
					color="gray"
					type="button"
					onClick={() => {
						dispatch(resetLayout())
						handleClose()
					}}
				>
					Close
				</Button>
			</Box>
		</CustomDialog>
	)
}

export default Greeting
