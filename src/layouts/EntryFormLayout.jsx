import { Box, CssBaseline, Typography } from "@mui/material"
import React from "react"
import ElementPlus from "../Constants/svgs/ElementPlus"

function EntryFormLayout({ title, description, children }) {
	return (
		<Box
			className="f f-c align-center"
			position="relative"
			gap={{ xs: "32px", md: "56px" }}
			padding="32px 16px 100px"
			overflow="hidden"
		>
			<CssBaseline />
			<Box className="f f-c g8 align-center" zIndex={1} maxWidth="750px">
				<Typography
					component="h1"
					color="#1B1D20"
					textAlign="center"
					fontFamily="Poppins"
					fontSize={{ xs: "28px", md: "40px" }}
					fontWeight="600"
					lineHeight={{ xs: "36px", md: "55px" }}
				>
					{title}
				</Typography>
				<Typography
					component="p"
					color="#717885"
					textAlign="center"
					fontSize={{ xs: "16px", md: "18px" }}
					fontWeight="400"
					lineHeight={{ xs: "24px", md: "28px" }}
				>
					{description}
				</Typography>
			</Box>
			<Box zIndex={1}>{children}</Box>
			<Box
				className="g7"
				maxWidth="60px"
				minWidth="60px"
				position="absolute"
				zIndex={0}
				top="45%"
				right="54px"
				display="flex"
			>
				<ElementPlus color="#EFE9FC" size="32px" logo={false} />
				<Box paddingTop="24px">
					<ElementPlus color="#EFE9FC" size="18px" logo={false} />
				</Box>
			</Box>
			<Box position="absolute" bottom="18%" left="-36px" zIndex={0}>
				<ElementPlus color="#EFE9FC" size="230px" logo={false} />
			</Box>
		</Box>
	)
}

export default EntryFormLayout
