import { Box, Skeleton, Typography } from "@mui/material"
import React from "react"
import InputLabelContainer from "../../../../utilities/InputLabelContainer"
import EditorToolbar from "../../../../utilities/EditorToolbar"

function Loading() {
	return (
		<Box
			className="f"
			flexDirection={{ xs: "column", md: "row" }}
			gap={{ xs: "24px", md: "48px" }}
			position="relative"
			height={{ xs: "auto", md: "calc(var(--window-height) - 178px)" }}
			sx={{ overflowY: "auto" }}
			padding={{ xs: "0px 16px 16px", sm: "0px 24px 32px" }}
		>
			<Box
				className="f f-c b-r16 g16 w100 h100"
				position={{ xs: "static", md: "sticky" }}
				top="0px"
				padding="16px 16px 24px 16px"
				maxWidth={{ xs: "none", md: "468px" }}
				sx={{ backgroundColor: "#F9F9FB" }}
				height="fit-content"
				minWidth="318px"
			>
				<Box className="f align-center g12 justify-s-b flex-wrap">
					<Typography color="#814CD6" fontSize="14px" fontWeight="500" lineHeight="20px">
						Is this a joint provider-ship course?
					</Typography>
					<Skeleton height="24px" width="38px" sx={{ borderRadius: "12px" }} />
				</Box>
				<InputLabelContainer label="CME title">
					<Skeleton height="44px" />
				</InputLabelContainer>
				<InputLabelContainer label="CME description">
					<Skeleton height="44px" />
				</InputLabelContainer>
				<InputLabelContainer label="Credit">
					<Skeleton height="44px" />
				</InputLabelContainer>
				<InputLabelContainer label="Credit type">
					<Skeleton height="44px" />
				</InputLabelContainer>
				<InputLabelContainer label="CME publish date">
					<Skeleton height="44px" />
				</InputLabelContainer>
				<InputLabelContainer label="CME expiration date">
					<Skeleton height="44px" />
				</InputLabelContainer>
			</Box>
			<Box className="f f-c w100 g12" maxWidth={{ xs: "none", md: "468px" }}>
				<InputLabelContainer label="CME course format">
					<Skeleton height="44px" />
				</InputLabelContainer>
				<InputLabelContainer label="CME course type">
					<Skeleton height="44px" />
				</InputLabelContainer>
				<InputLabelContainer label="Tag(s)">
					<Skeleton height="44px" />
				</InputLabelContainer>
				<InputLabelContainer label="Specialty">
					<Skeleton height="44px" />
				</InputLabelContainer>
				<InputLabelContainer label="Topics">
					<Skeleton height="44px" />
				</InputLabelContainer>
				<InputLabelContainer label="State">
					<Skeleton height="44px" />
				</InputLabelContainer>
				<InputLabelContainer label="Course overview">
					<Skeleton height="160px" />
				</InputLabelContainer>
				<InputLabelContainer label="Feedback link">
					<Skeleton height="44px" />
				</InputLabelContainer>
				<Box paddingBottom={{ xs: "0px", md: "24px" }}>
					<InputLabelContainer label="Link">
						<Skeleton height="44px" />
					</InputLabelContainer>
				</Box>
			</Box>
		</Box>
	)
}

export default Loading
