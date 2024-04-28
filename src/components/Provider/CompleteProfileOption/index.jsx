import { Box, Typography } from "@mui/material"
import React from "react"
import { FiArrowRight } from "react-icons/fi"
import Button from "../../utilities/Button"
import { Link } from "react-router-dom"

function CompleteProfileOption() {
	return (
		<Box className="f f-c g12 h100 justify-center align-center">
			<Typography fontWeight="500" fontSize="16px" lineHeight="24px" color="#1b1c20">
				Please complete your profile to access this page
			</Typography>
			<Button
				component={Link}
				to="/provider/profile-form"
				type="button"
				variant="contained"
				color="purple"
				sx={{ fontSize: "14px", lineHeight: "20px" }}
			>
				Complete your profile <FiArrowRight size="20px" />
			</Button>
		</Box>
	)
}

export default CompleteProfileOption
