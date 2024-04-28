import { Box, Skeleton } from "@mui/material"
import React from "react"
import InputLabelContainer from "../../../../../../utilities/InputLabelContainer"

function Loading() {
	return (
		<Box className="f f-c g32" padding="14px 0px 0px" maxWidth="820px">
			<InputLabelContainer
				label="Preferred setting to provide care"
				alignLabel="start"
				forcelabelMinWidth="240px"
			>
				<Box className="f flex-wrap g24 w100" maxWidth="502px" datafieldname="providerCare">
					<Skeleton height="24px" width="100px" sx={{ borderRadius: "8px" }} />
					<Skeleton height="24px" width="100px" sx={{ borderRadius: "8px" }} />
				</Box>
			</InputLabelContainer>

			<InputLabelContainer
				label="Practice address for in-person setting"
				alignLabel="start"
				forcelabelMinWidth="240px"
			>
				<Box className="f f-c g12 w100" maxWidth="502px">
					<InputLabelContainer label="Practice name">
						<Skeleton height="44px" />
					</InputLabelContainer>
					<InputLabelContainer label="Address line 1">
						<Skeleton height="44px" />
					</InputLabelContainer>
					<InputLabelContainer label="Address line 2">
						<Skeleton height="44px" />
					</InputLabelContainer>
					<InputLabelContainer label="State or province">
						<Skeleton height="44px" />
					</InputLabelContainer>
					<Box className="f g12">
						<InputLabelContainer label="City">
							<Skeleton height="44px" />
						</InputLabelContainer>
						<InputLabelContainer label="Zip or postal">
							<Skeleton height="44px" />
						</InputLabelContainer>
					</Box>
					<Box className="f align-center g8" datafieldname="hideLocation">
						<Skeleton height="24px" />
					</Box>
				</Box>
			</InputLabelContainer>
			<InputLabelContainer
				label="Virtual setting details"
				labelWrap={false}
				alignLabel="start"
				labelMinWidth="240px"
			>
				<Box className="w100" maxWidth="502px">
					<InputLabelContainer label="Licensed in following state(s)">
						<Skeleton height="44px" />
					</InputLabelContainer>
				</Box>
			</InputLabelContainer>
			<InputLabelContainer
				label="Practice website URL"
				labelWrap={false}
				alignLabel="start"
				labelMinWidth="240px"
			>
				<Box className="w100" maxWidth="502px">
					<Skeleton height="44px" />
				</Box>
			</InputLabelContainer>
			<InputLabelContainer
				label="What payment or insurance types do you accept?"
				labelHelper="(Please select all that apply)"
				alignLabel="start"
				forcelabelMinWidth="240px"
			>
				<Box className="w100" maxWidth="502px" datafieldname="insurance">
					<Skeleton height="140px" />
				</Box>
			</InputLabelContainer>
			<InputLabelContainer label="Other payment type" labelWrap={false} alignLabel="start" labelMinWidth="240px">
				<Box className="w100" maxWidth="502px">
					<Skeleton height="44px" />
				</Box>
			</InputLabelContainer>
			<InputLabelContainer
				label="How would you like patients to contact you?"
				labelHelper="(Please select all that apply)"
				alignLabel="start"
				forcelabelMinWidth="240px"
			>
				<Box className="f f-c g12 w100" maxWidth="502px">
					<Box className="f align-center g8">
						<Skeleton height="24px" width="100%" sx={{ borderRadius: "8px" }} />
					</Box>
					<Box className="f align-start g8">
						<Skeleton height="24px" width="100%" sx={{ borderRadius: "8px" }} />
					</Box>
					<Box className="f align-start g8">
						<Skeleton height="24px" width="100%" sx={{ borderRadius: "8px" }} />
					</Box>
				</Box>
			</InputLabelContainer>
		</Box>
	)
}

export default Loading
