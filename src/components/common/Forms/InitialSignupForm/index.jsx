"use client"

import React, { useState } from "react"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"
import { Box, useMediaQuery, useTheme } from "@mui/material"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { setPrePatientRegisterModal } from "@/app/GlobalObjects/store/reducers/Modal"
import ProcessPanel from "./widgets/ProcessPanel"
import Button from "@/components/utilities/Button"
import HelpModalButton from "../../HelpModalButton"

function InitialSignForm() {
	const theme = useTheme()
	const isSM = useMediaQuery(theme.breakpoints.up("sm"))
	const navigate =useRouter()
	const dispatch = useDispatch()
	const [selectedProcess, setSelectedProcess] = useState("PATIENT")

	const handleContinue = () => {
		if (selectedProcess === "PATIENT") {
			dispatch(setPrePatientRegisterModal(true))
		} else {
			navigate.push("/signup/provider")
		}
	}

	return (
		<>
			<Box className="f f-c" gap="32px">
				<ProcessPanel
					isSelected={selectedProcess === "PATIENT"}
					title="Patient"
					description="I'm looking for a healthcare provider who is vetted and understand my needs."
					onChange={() => setSelectedProcess("PATIENT")}
				/>
				<ProcessPanel
					isSelected={selectedProcess === "PROVIDER"}
					title="Provider"
					description="I'm applying to join the inclusive+ directory and gain access to the LGBTQIA+ medical education center."
					onChange={() => setSelectedProcess("PROVIDER")}
				/>
			</Box>
			<Box className="f align-center justify-s-b g8" paddingBottom="32px">
				<Box className="f align-center g16 w100">
					<Button
						id="initial_signup_back"
						className="track_button"
						variant="outlined"
						color="gray"
						fullWidth={isSM ? false : true}
						onClick={() => navigate.push("/")}
					>
						<FiArrowLeft size="20px" /> Back
					</Button>
					<Button
						id="initial_signup_continue"
						className="track_button"
						variant="contained"
						color="purple"
						fullWidth={isSM ? false : true}
						onClick={handleContinue}
					>
						Continue <FiArrowRight size="20px" />
					</Button>
				</Box>
				<Box className="align-center" display={{ xs: "none", sm: "none", md: "flex" }}>
					<HelpModalButton />
				</Box>
			</Box>
		</>
	)
}

export default InitialSignForm
