import React from "react"
import CustomDialog from "../../../../utilities/Dialog"
import { Box, IconButton, Typography } from "@mui/material"
import { FiX } from "react-icons/fi"

function ToDoHelp({ open, helperText, handleClose = () => {} }) {
	return (
		<CustomDialog
			open={open}
			close={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			width="564px"
		>
			<Box className="f f-c">
				<Box className="f g12 align-center justify-s-b" padding="16px 24px" borderBottom="1px solid #E0E0E0">
					<Typography color="#343A40" fontSize="16px" fontWeight="500" lineHeight="24px">
						What does optional mean?
					</Typography>
					<IconButton onClick={handleClose} sx={{ padding: "4px" }}>
						<FiX size="24px" color="#6C757D" />
					</IconButton>
				</Box>
				<Typography
					className="f"
					padding="16px 24px 32px 24px"
					fontWeight="400"
					fontSize="14px"
					lineHeight="22px"
					color="#717385"
				>
					{helperText}
				</Typography>
			</Box>
		</CustomDialog>
	)
}

export default ToDoHelp
