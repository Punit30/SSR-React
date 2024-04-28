import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { resetQuiz } from "../../../../app/GlobalObjects/store/reducers/provider/Quiz"
import { Box, CircularProgress } from "@mui/material"
import { InlineWidget } from "react-calendly"
import HelpModalButton from "../../../common/HelpModalButton"

function Interview(props) {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(resetQuiz())
	}, [])

	return (
		<Box
			overflow="auto"
			className="f f-c h100 justify-s-b"
			gap={{ xs: "16px", sm: "24px" }}
			// padding={{ xs: "0px 16px", sm: "0px 24px", md: "82px 54px 20px" }}
		>
			<InlineWidget
				styles={{ width: "100%", height: "calc(100% - 6px)" }}
				url={import.meta.env.VITE_APP_CALENDLY_INTERVIEW_URL}
				pageSettings={{
					backgroundColor: "ffffff",
					// hideEventTypeDetails: true,
					// hideLandingPageDetails: true,
					primaryColor: "8000ff",
					textColor: "4d5055",
					hideGdprBanner: true,
				}}
			/>
			<Box
				className="justify-end"
				paddingBottom="24px"
				display={{ xs: "none", md: "flex" }}
				padding={{ xs: "0px 16px", sm: "0px 24px", md: "0px 54px 20px" }}
			>
				<HelpModalButton />
			</Box>
		</Box>
	)
}

export default Interview
