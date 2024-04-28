import { Box, Typography } from "@mui/material"
import React from "react"

function InputLabelContainer({
	width = "100%",
	label,
	labelHelper = null,
	children,
	direction = "column",
	datafieldname = "",
}) {
	return (
		<Box
			className="f g6"
			flexDirection={direction}
			width={width}
			alignItems={direction === "row" ? "center" : "normal"}
			datafieldname={datafieldname}
		>
			<Box display="inline">
				<Typography color="#1B1C20" fontSize="14px" fontWeight="500" lineHeight="20px" display="inline">
					{label}
				</Typography>{" "}
				{labelHelper ? (
					<Typography fontWeight="400" fontSize="12px" lineHeight="18px" color="#b1b3c4" display="inline">
						{labelHelper}
					</Typography>
				) : null}
			</Box>
			{children}
		</Box>
	)
}

export default InputLabelContainer
