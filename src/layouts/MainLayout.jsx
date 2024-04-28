import { Stack } from "@mui/material"
import React from "react"
import { Outlet } from "react-router-dom"
import Footer from "../components/common/Footer"
import NavBar from "../components/common/NavBar"

function MainLayout() {
	return (
		<Stack>
			<NavBar />
			<Outlet />
			<Footer />
		</Stack>
	)
}

export default MainLayout
