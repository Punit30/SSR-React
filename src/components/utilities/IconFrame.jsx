import { Box, Typography } from "@mui/material"
import React from "react"

function IconFrame({ icon, iconSize, boxSize, backgroundColor, iconColor }) {
	return (
		<Box
			className="f align-center justify-center b-rhalf"
			minWidth={boxSize}
			minHeight={boxSize}
			maxWidth={boxSize}
			maxHeight={boxSize}
			sx={{ backgroundColor: backgroundColor }}
		>
			<Typography lineHeight="0px" fontSize={iconSize} color={iconColor}>
				{icon}
			</Typography>
		</Box>
	)
}

export default IconFrame
