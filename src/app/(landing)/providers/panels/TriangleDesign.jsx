import { Box, CssBaseline } from "@mui/material"
import React from "react"

function TriangleDesign() {
	return (
		<Box className="triangle">
			<CssBaseline />
			<Box className="triangle__first">
				<Box className="triangle__first__second">
					<Box className="triangle__first__second__third" />
				</Box>
			</Box>
		</Box>
	)
}

export default TriangleDesign
