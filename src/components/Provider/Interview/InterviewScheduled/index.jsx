import { Box, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { FiArrowUpRight } from "react-icons/fi"
import { IoCheckmarkCircle } from "react-icons/io5"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { resetLayout } from "../../../../app/GlobalObjects/store/reducers/Layout"
import HelpModalButton from "../../../common/HelpModalButton"
import Button from "../../../utilities/Button"

function InterviewScheduled() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(resetLayout())
	}, [])

	return (
		<Box className="f f-c g12 justify-s-b h100" padding={{ xs: "0px 16px", sm: "0px 24px", md: "60px 54px 20px" }}>
			<Box className="f f-c g12 justify-center h100" maxWidth="620px" alignItems={{ xs: "center", sm: "start" }}>
				<IoCheckmarkCircle size="40px" color="#28A745" />
				<Box className="f f-c">
					<Typography
						textAlign={{ xs: "center", sm: "start" }}
						fontFamily="Poppins"
						fontWeight="600"
						fontSize={{ xs: "24px", md: "32px" }}
						lineHeight={{ xs: "32px", md: "44px" }}
						color="#1b1c20"
					>
						Interview scheduled successfully
					</Typography>
					<Typography
						textAlign={{ xs: "center", sm: "start" }}
						fontWeight="400"
						fontSize="16px"
						lineHeight="24px"
						color="#717385"
					>
						Please check you inbox. A link has been sent to your registered email.
					</Typography>
				</Box>
				<Button
					component={Link}
					to="/dashboard/provider"
					id="go_to_profile"
					className="track_button"
					type="button"
					variant="contained"
					color="purple"
				>
					Go to your profile <FiArrowUpRight size="18px" />
				</Button>
			</Box>
			<Box className="justify-end" display={{ xs: "none", sm: "none", md: "flex" }}>
				<HelpModalButton />
			</Box>
		</Box>
	)
}

export default InterviewScheduled
