import { Alert } from "@mui/material"
import { SnackbarContent } from "notistack"
import { forwardRef } from "react"

const MuiAlert = forwardRef(({ id, ...props }, ref) => {
	return (
		<SnackbarContent ref={ref}>
			<Alert variant="outlined" color={props.color} severity={props.color}>
				{props.message}
			</Alert>
		</SnackbarContent>
	)
})

export default MuiAlert
