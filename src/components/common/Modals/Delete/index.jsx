import { FiTrash2 } from "react-icons/fi"
import { Box, CssBaseline, Typography } from "@mui/material"
import Button from "../../../utilities/Button"
import CustomDialog from "../../../utilities/Dialog"
import IconFrame from "../../../utilities/IconFrame"

function Delete(props) {
	const {
		title,
		description = "Are you sure you want to delete this? This action cannot be undone.",
		open,
		handleClose,
		isSubmitting,
		handleSubmit,
		width = "360px",
	} = props

	return (
		<CustomDialog
			open={open}
			close={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			width={width}
		>
			<CssBaseline />
			<Box className="f f-c g32 align-center" padding="24px">
				<Box className="f f-c g16 align-center">
					<IconFrame
						icon={<FiTrash2 />}
						iconColor="#ef4444"
						iconSize="24px"
						backgroundColor="#fee4e2"
						boxSize="48px"
					/>
					<Box className="f f-c align-center g8">
						<Typography
							textAlign="center"
							color="#253010"
							fontSize="18px"
							fontWeight="600"
							lineHeight="26px"
						>
							{title}
						</Typography>
						<Typography
							color="#596088"
							textAlign="center"
							fontSize="14px"
							fontWeight="400"
							lineHeight="20px"
						>
							{description}
						</Typography>
					</Box>
				</Box>
				<Box className="w100 f g12 align-center justify-s-b">
					<Button fullWidth disabled={isSubmitting} variant="contained" color="danger" onClick={handleClose}>
						Cancel
					</Button>
					<Button fullWidth disabled={isSubmitting} variant="outlined" color="gray" onClick={handleSubmit}>
						{isSubmitting ? "Please wait..." : "Delete"}
					</Button>
				</Box>
			</Box>
		</CustomDialog>
	)
}

export default Delete
