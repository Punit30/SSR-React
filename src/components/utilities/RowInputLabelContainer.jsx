import { Box, Typography } from "@mui/material"
import React from "react"

function RowInputLabelContainer({
	alignLabel = null,
	justifyContent = "space-between",
	width = "100%",
	label,
	labelHelper,
	children,
	datafieldname = "",
	forcelabelMinWidth,
	labelWrap = true,
	labelMinWidth = "120px",
	labelWidth="fit-content",
	labelMaxWidth = "none",
}) {
	return (
		<Box
			width={width}
			className="f g8"
			justifyContent={justifyContent}
			alignItems={alignLabel ?? { xs: "start", md: "center" }}
			flexDirection={{ xs: "column", md: "row" }}
			datafieldname={datafieldname}
		>
			<Box className="f f-c" >
				<Typography
					noWrap={!labelWrap}
					color="#1B1C20"
					fontSize="14px"
					fontWeight="500"
					lineHeight="20px"
					width={width}
					maxWidth={labelMaxWidth}
					{...(labelWrap ? { minWidth: forcelabelMinWidth ?? "none" } : { minWidth: labelMinWidth })}
				>
					{label}
				</Typography>
				{labelHelper ? (
					<Typography
						fontWeight="400"
						fontSize="12px"
						lineHeight="18px"
						color="#b1b3c4"
						width={width}
						maxWidth={labelMaxWidth}
						{...(labelWrap ? { minWidth: forcelabelMinWidth ?? "none" } : { minWidth: labelMinWidth })}
					>
						{labelHelper}
					</Typography>
				) : null}
			</Box>
			{children}
		</Box>
	)
}

export default RowInputLabelContainer
