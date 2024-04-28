import { Box, CssBaseline, Divider, IconButton, useMediaQuery } from "@mui/material"
import { styled, useTheme } from "@mui/styles"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link, Outlet } from "react-router-dom"
import { NAV_MENU } from "../Constants/data-types/sidebar-data"
import SideBar from "../components/common/SideBar"
import logo from "../assets/imgs/logo-black.png"
import { HiOutlineMenuAlt1 } from "react-icons/hi"

const SBox = styled(Box, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	flexGrow: 1,
	transition: theme.transitions.create("margin", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	}),
}))

function DashboardLayout(props) {
	const theme = useTheme()
	const showSidebar = useMediaQuery(theme.breakpoints.up("md"))
	const [open, setOpen] = useState(showSidebar)

	useEffect(() => {
		setOpen(showSidebar)
	}, [showSidebar])

	const handleSidebarToggle = () => setOpen(!open)

	return (
		<Box className="f">
			<CssBaseline />
			<SideBar open={open} toggle={handleSidebarToggle} menuList={NAV_MENU[props.role]} />
			<SBox open={open} position="relative">
				<Box
					className="g24 align-center justify-s-b"
					padding={{ xs: "20px 16px", sm: "20px 24px" }}
					display={{ xs: "flex", md: "none" }}
				>
					<Box width="174px" height="30px">
						<Link to="/" style={{ textDecoration: "none" }}>
							<img src={logo} width="154px" height="28px" />
						</Link>
					</Box>
					<IconButton onClick={handleSidebarToggle} sx={{ padding: "2px" }}>
						<HiOutlineMenuAlt1 color="#1B1C20" size="24px" />
					</IconButton>
				</Box>
				<Divider />
				<Box sx={{ overflowY: "auto" }} height={`calc(var(--window-height) - ${showSidebar ? "1px" : "71px"})`}>
					<Box sx={{ overflowY: "auto" }} minHeight="600px">
						<Outlet />
					</Box>
				</Box>
			</SBox>
		</Box>
	)
}

const mapStateToProps = (state) => ({
	role: state.local.userReducer.authority,
})

export default connect(mapStateToProps)(DashboardLayout)
