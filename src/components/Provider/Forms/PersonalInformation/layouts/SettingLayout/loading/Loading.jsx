import { Box, Skeleton, Typography } from "@mui/material"
import React from "react"
import Button from "../../../../../../utilities/Button"
import RowInputLabelContainer from "../../../../../../utilities/RowInputLabelContainer"

function Loading() {
	return (
		<Box className="f f-c g32" padding="14px 0px 0px" maxWidth="820px">
			<RowInputLabelContainer label="Your name" labelWrap={false} alignLabel="start" labelMinWidth="240px">
				<Box className="f f-c g16 w100" maxWidth="502px">
					<Skeleton height="44px" />
					<Skeleton height="44px" />
				</Box>
			</RowInputLabelContainer>
			<RowInputLabelContainer label="Your profile photo" labelWrap={false} alignLabel="start" labelMinWidth="240px">
				<Box className="f align-center g24 w100" maxWidth="502px">
					<Skeleton variant="circular" height="72px" width="72px" />
					<Box className="f align-center g8 flex-wrap">
						<Skeleton height="44px" width="240px" />
					</Box>
				</Box>
			</RowInputLabelContainer>
			<RowInputLabelContainer label="Pronouns" labelWrap={false} alignLabel="start" labelMinWidth="240px">
				<Box className="w100" maxWidth="502px">
					<Skeleton height="102px" />
				</Box>
			</RowInputLabelContainer>
			<RowInputLabelContainer label="Gender" labelWrap={false} alignLabel="start" labelMinWidth="240px">
				<Box className="w100" maxWidth="502px">
					<Skeleton height="102px" />
				</Box>
			</RowInputLabelContainer>

			<RowInputLabelContainer label="Transgender" labelWrap={false} alignLabel="start" labelMinWidth="240px">
				<Box className="w100" maxWidth="502px">
					<Skeleton height="44px" />
				</Box>
			</RowInputLabelContainer>
			<RowInputLabelContainer label="Race or ethinicity" labelWrap={false} alignLabel="start" labelMinWidth="240px">
				<Box className="w100" maxWidth="502px">
					<Skeleton height="102px" />
				</Box>
			</RowInputLabelContainer>
			<RowInputLabelContainer
				label="Identify as LGBTQIA+?"
				labelWrap={false}
				alignLabel="start"
				labelMinWidth="240px"
			>
				<Box className="w100" maxWidth="502px">
					<Skeleton height="44px" />
				</Box>
			</RowInputLabelContainer>
			<RowInputLabelContainer
				label="Language(s)"
				labelHelper="Select languages other than english in which you provide care."
				labelWrap={false}
				alignLabel="start"
				labelMinWidth="240px"
			>
				<Box className="w100" maxWidth="502px">
					<Skeleton height="102px" />
				</Box>
			</RowInputLabelContainer>

			<RowInputLabelContainer
				label="How many years have you been in practice?"
				alignLabel="start"
				forcelabelMinWidth="240px"
			>
				<Box className="w100" maxWidth="502px">
					<Skeleton height="102px" />
				</Box>
			</RowInputLabelContainer>
			<RowInputLabelContainer label="What is your age group?" alignLabel="start" forcelabelMinWidth="240px">
				<Box className="w100" maxWidth="502px">
					<Skeleton height="102px" />
				</Box>
			</RowInputLabelContainer>
		</Box>
	)
}

export default Loading
