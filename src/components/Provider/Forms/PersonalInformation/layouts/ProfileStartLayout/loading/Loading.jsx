import { Box, Skeleton } from "@mui/material"
import React from "react"
import InputLabelContainer from "../../../../../../utilities/InputLabelContainer"

function Loading() {
	return (
		<Box className="f f-c g32" padding="14px 0px 0px" maxWidth="820px">
			<InputLabelContainer label="Your name" labelWrap={false} alignLabel="start" labelMinWidth="240px">
				<Box className="f f-c g16 w100" maxWidth="502px">
					<Skeleton height="44px" />
					<Skeleton height="44px" />
				</Box>
			</InputLabelContainer>
			<InputLabelContainer label="Your profile photo" labelWrap={false} alignLabel="start" labelMinWidth="240px">
				<Box className="f align-center g24 w100" maxWidth="502px">
					<Skeleton variant="circular" height="72px" width="72px" />
					<Box className="f align-center g8 flex-wrap">
						<Skeleton height="44px" width="240px" />
					</Box>
				</Box>
			</InputLabelContainer>
			<InputLabelContainer label="Pronouns" labelWrap={false} alignLabel="start" labelMinWidth="240px">
				<Box className="w100" maxWidth="502px">
					<Skeleton height="102px" />
				</Box>
			</InputLabelContainer>
			<InputLabelContainer label="Gender" labelWrap={false} alignLabel="start" labelMinWidth="240px">
				<Box className="w100" maxWidth="502px">
					<Skeleton height="102px" />
				</Box>
			</InputLabelContainer>

			<InputLabelContainer label="Transgender" labelWrap={false} alignLabel="start" labelMinWidth="240px">
				<Box className="w100" maxWidth="502px">
					<Skeleton height="44px" />
				</Box>
			</InputLabelContainer>
			<InputLabelContainer label="Race or ethinicity" labelWrap={false} alignLabel="start" labelMinWidth="240px">
				<Box className="w100" maxWidth="502px">
					<Skeleton height="102px" />
				</Box>
			</InputLabelContainer>
			<InputLabelContainer
				label="Identify as LGBTQIA+?"
				labelWrap={false}
				alignLabel="start"
				labelMinWidth="240px"
			>
				<Box className="w100" maxWidth="502px">
					<Skeleton height="44px" />
				</Box>
			</InputLabelContainer>
			<InputLabelContainer
				label="Language(s)"
				labelHelper="Select languages other than english in which you provide care."
				labelWrap={false}
				alignLabel="start"
				labelMinWidth="240px"
			>
				<Box className="w100" maxWidth="502px">
					<Skeleton height="102px" />
				</Box>
			</InputLabelContainer>

			<InputLabelContainer
				label="How many years have you been in practice?"
				alignLabel="start"
				forcelabelMinWidth="240px"
			>
				<Box className="w100" maxWidth="502px">
					<Skeleton height="102px" />
				</Box>
			</InputLabelContainer>
			<InputLabelContainer label="What is your age group?" alignLabel="start" forcelabelMinWidth="240px">
				<Box className="w100" maxWidth="502px">
					<Skeleton height="102px" />
				</Box>
			</InputLabelContainer>
		</Box>
	)
}

export default Loading
