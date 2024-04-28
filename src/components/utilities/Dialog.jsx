import { Dialog, DialogContent } from "@mui/material"
import React from "react"

function CustomDialog(props) {
	return (
		<Dialog
			open={props.open}
			onClose={props.close}
			aria-labelledby="responsive-dialog-title"
			sx={{
				"& .MuiDialog-paper": {
					maxWidth: props.maxWidth,
					width: props.width,
				},
			}}
		>
			<DialogContent>{props.children}</DialogContent>
		</Dialog>
	)
}

CustomDialog.defaultProps = {
	maxWidth: "925px",
	width: "100%px",
}

export default CustomDialog
