import { Box, Skeleton } from "@mui/material"
import React from "react"
import RowInputLabelContainer from "../../../../../../utilities/RowInputLabelContainer"

function Loading() {
	return (
		<Box className="f f-c g32" padding="14px 0px 0px" maxWidth="820px">
			<RowInputLabelContainer label="Degree" labelWrap={false} alignLabel="start" labelMinWidth="240px">
				<Box className="w100" maxWidth="502px">
					<Skeleton height="48px" />
				</Box>
			</RowInputLabelContainer>
			<RowInputLabelContainer label="Specialty" labelWrap={false} alignLabel="start" labelMinWidth="240px">
				<Box className="w100" maxWidth="502px">
					<Skeleton height="48px" />
				</Box>
			</RowInputLabelContainer>
			<RowInputLabelContainer
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
			</RowInputLabelContainer>
			<RowInputLabelContainer
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
			</RowInputLabelContainer>
			<RowInputLabelContainer label="Short biography" labelWrap={false} alignLabel="start" labelMinWidth="240px">
				<Box className="f f-c g8 w100" maxWidth="502px">
					<Skeleton height="88px" />
				</Box>
			</RowInputLabelContainer>
			<RowInputLabelContainer label="Upload CV" labelWrap={false} alignLabel="start" labelMinWidth="240px">
				<Box className="f f-c g8 w100" maxWidth="502px">
					<Skeleton height="88px" />
				</Box>
			</RowInputLabelContainer>
		</Box>
	)
}

export default Loading
