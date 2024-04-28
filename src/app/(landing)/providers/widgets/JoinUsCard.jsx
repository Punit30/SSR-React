import { Box, CssBaseline, Typography } from "@mui/material"
import React from "react"

function JoinUsCard({ icon, title, description }) {
	return (
		<Box
			className="f f-c g24"
			padding={{ xs: "40px 24px", md: "40px 48px" }}
			sx={{
				backgroundColor: "#FFF",
				boxShadow: "0px 19px 46px rgba(72, 58, 102, 0.08)",
				border: "0px",
				borderRadius: "16px",
				maxWidth: "392px",
				width: "100%",
				zIndex: 1,
			}}
		>
			<CssBaseline />
			<Typography fontSize="48px" color="#814CD6" lineHeight="0px">
				{icon}
			</Typography>
			<Box className="f f-c g16">
				<Typography color="#000" fontFamily="Poppins" fontSize="18px" fontWeight="600" lineHeight="24px">
					{title}
				</Typography>
				<Typography color="#1B1C20" fontSize="16px" fontWeight="400" lineHeight="24px">
					{description}
				</Typography>
			</Box>
		</Box>
	)
}

export default JoinUsCard
