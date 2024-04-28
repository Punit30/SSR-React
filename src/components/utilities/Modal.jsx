import { Box, Fade, Modal } from "@mui/material"
import React from "react"

function CModal(props) {
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		bgcolor: props.bgColor,
		border: "0px",
		borderRadius: "12px",
		boxShadow: "0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0px 20px 24px -4px rgba(16, 24, 40, 0.08)",
		outline: "none",
	}

	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			open={props.open}
			onClose={(event, reason) => {
				if (props.backdropClose) {
					props.handleClose()
				}
			}}
			closeAfterTransition
		>
			<Fade in={props.open}>
				<Box
					sx={style}
					minWidth={props.minWidth}
					maxWidth={props.width}
					width={props.customWidthOptions ?? { xs: "inital", sm: "initial", md: "100%" }}
				>
					{props.children}
				</Box>
			</Fade>
		</Modal>
	)
}

CModal.defaultProps = {
	minWidth: "340px",
	width: "400px",
	bgColor: "#FFF",
	children: "",
	open: false,
	backdropClose: true,
	handleClose: () => {},
}

export default CModal
