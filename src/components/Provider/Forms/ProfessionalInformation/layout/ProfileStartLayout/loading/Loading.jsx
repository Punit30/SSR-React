import { Box, Skeleton } from "@mui/material"
import React from "react"
import InputLabelContainer from "../../../../../../utilities/InputLabelContainer"

function Loading() {
	return (
		<Box className="f f-c g32" padding="14px 0px 0px" maxWidth="820px">
			<InputLabelContainer label="Degree" labelWrap={false} alignLabel="start" labelMinWidth="240px">
				<Box className="w100" maxWidth="502px">
					<Skeleton height="48px" />
				</Box>
			</InputLabelContainer>
			<InputLabelContainer label="Specialty" labelWrap={false} alignLabel="start" labelMinWidth="240px">
				<Box className="w100" maxWidth="502px">
					<Skeleton height="48px" />
				</Box>
			</InputLabelContainer>
			<InputLabelContainer
				label="Do you provide any of these services?"
				alignLabel="start"
				forcelabelMinWidth="240px"
				labelHelper="(Please select all that apply)"
				labelWidth="100%"
				labelMaxWidth={{ xs: "none", sm: "240px" }}
			>
				<Box className="f f-c g8 w100" maxWidth="502px">
					<Skeleton height="260px" />
				</Box>
			</InputLabelContainer>
			<InputLabelContainer
				label="Do you have in-depth experience with any of these patient groups?"
				alignLabel="start"
				forcelabelMinWidth="240px"
				labelWidth="100%"
				labelHelper="(Please select all that apply)"
				labelMaxWidth={{ xs: "none", sm: "240px" }}
			>
				<Box className="f f-c g8 w100" maxWidth="502px">
					<Skeleton height="120px" />
				</Box>
			</InputLabelContainer>
			<InputLabelContainer label="Short biography" labelWrap={false} alignLabel="start" labelMinWidth="240px">
				<Box className="f f-c g8 w100" maxWidth="502px">
					<Skeleton height="88px" />
				</Box>
			</InputLabelContainer>
			<InputLabelContainer label="Upload CV" labelWrap={false} alignLabel="start" labelMinWidth="240px">
				<Box className="f f-c g8 w100" maxWidth="502px">
					<Skeleton height="88px" />
				</Box>
			</InputLabelContainer>
		</Box>
	)
}

export default Loading
