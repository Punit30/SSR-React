"use client"
import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, Toolbar } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useState } from "react"
import { FiArrowUpRight, FiLogOut, FiMenu, FiPower, FiX } from "react-icons/fi"
import { connect, useDispatch } from "react-redux"

import { setLogoutModal } from "@/app/GlobalObjects/store/reducers/Modal"
import Button from "@/components/utilities/Button"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { drawerItems, drawerStaticLinks, navItems } from "./data"

const logo = "/images/logo-black.png"

const useStyles = makeStyles({
	link: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "4px",
		color: "#717885",
		fontSize: "14px",
		fontWeight: 400,
		lineHeight: "20px",
		textDecoration: "none",
		textAlign: "center",
		transition: "0.2s all",

		"&:hover": {
			color: "#6728CC",
		},
	},
	activeLink: {
		fontWeight: "500 !important",
		color: "#6728CC !important",
	},
	activeBorder: {
		border: "2px solid #6728CC",
		borderRadius: "16px",
		maxWidth: "16px",
		minWidth: "16px",
	},
	drawerLink: {
		color: "#1B1C20",

		"&:active": {
			backgroundColor: "#F2EDFC",
		},

		"&:focus": {
			color: "#1B1C20",
		},
	},
})

const drawerWidth = 340

function NavBar(props) {
	const classes = useStyles()
	const pathname  = usePathname()
	const navigate = useRouter()
	const dispatch = useDispatch()
	const [mobileOpen, setMobileOpen] = useState(false)

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState)
	}

	const drawer = (
		<Box className="f f-c h100 g8 justify-s-b overflow-y">
			<Box className="f f-c">
				<Box className="f align-center g8 justify-s-b" padding="14px 16px">
					<Box width="154px" height="28px">
						<Link href="/" style={{ textDecoration: "none" }}>
							<img src={logo} width="100%" height="100%" />
						</Link>
					</Box>
					<IconButton onClick={handleDrawerToggle}>
						<FiX size="24px" color="#9A9CB0" />
					</IconButton>
				</Box>
				<Divider />
				<Box className="f f-c" padding="16px 0px">
					{drawerItems.map((item) => (
						<Link
							onClick={handleDrawerToggle}
							href={item.link}
							key={item.name}
							className={`${classes.link} ${classes.drawerLink} ${
								pathname === item.link ? classes.activeLink : null
							}`}
							style={{ padding: "12px 20px", width: "100%", alignItems: "start" }}
						>
							<Box className="f align-center g16">
								{item.icon}
								{item.name}
							</Box>
						</Link>
					))}
					{props.accessToken ? (
						<Link
							onClick={() => {
								handleDrawerToggle()
								dispatch(setLogoutModal(true))
							}}
							key="logout"
							className={`${classes.link} ${classes.drawerLink}`}
							style={{ padding: "12px 20px", width: "100%", alignItems: "start" }}
						>
							<Box component="span" className="f align-center g16">
								<LogoutSVG />
								Logout
							</Box>
						</Link>
					) : null}
				</Box>
				<Divider />
				<Box className="f f-c align-start" padding="16px 0px">
					{drawerStaticLinks.map((item) => (
						<Link
							onClick={handleDrawerToggle}
							href={item.link}
							key={item.name}
							className={`${classes.link} ${pathname === item.link ? classes.activeLink : null}`}
							style={{ padding: "6px 20px", width: "100%", alignItems: "start" }}
						>
							<Box className="f align-center g16">
								{item.icon}
								{item.name}
							</Box>
						</Link>
					))}
				</Box>
				<Divider />
			</Box>
			<Box className="f f-c g10" padding="8px 16px">
				{!props.accessToken ? (
					<>
						<Button
							id="login"
							className="track_button"
							variant="outlined"
							color="purple"
							sx={{ padding: "10px 18px" }}
							onClick={() => navigate.push("/login")}
						>
							<FiPower size="20px" /> Log In
						</Button>
						<Button
							id="signup"
							className="track_button"
							variant="contained"
							color="purple"
							sx={{ padding: "10px 18px" }}
							onClick={() => navigate.push("/signup")}
						>
							<FiLogOut size="20px" /> Sign Up
						</Button>
					</>
				) : (
					<Button
						id="go_to_dashboard"
						className="track_button"
						variant="contained"
						color="purple"
						sx={{ padding: "10px 18px" }}
						onClick={() => {
							navigate.push(
								props.authority === "PATIENT"
									? "/dashboard"
									: props.authority === "PROVIDER"
									? "/dashboard/provider"
									: "/dashboard/admin"
							)
						}}
					>
						Go to dashboard
						<FiArrowUpRight size="20px" />
					</Button>
				)}
			</Box>
		</Box>
	)

	const container = () => window.document.body

	return (
		<>
			<CssBaseline />
			<AppBar
				component="nav"
				position="sticky"
				sx={{ background: "#fff", boxShadow: "none", padding: { xs: "24px 16px", md: "24px 48px" } }}
			>
				<Toolbar
					className="f align-center justify-s-b"
					sx={{ minHeight: "0px !important", padding: "0px !important" }}
				>
					<Box width="182px" height="32px">
						<Link aria-label="landing-page" href="/" style={{ textDecoration: "none" }}>
							<img src={logo} width="100%" height="100%" />
						</Link>
					</Box>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { lg: "none" } }}
					>
						<FiMenu size="24px" color="#1B1C20" />
					</IconButton>
					<Box className="align-center g24" sx={{ display: { xs: "none", lg: "flex" } }}>
						<Box className="f align-center g24" marginTop="12px">
							{navItems.map((item) => (
								<Link
									href={item.link}
									key={item.name}
									className={`${classes.link} ${pathname === item.link ? classes.activeLink : null}`}
								>
									{item.name}
									<Box
										component="span"
										className={classes.activeBorder}
										visibility={pathname === item.link ? "visible" : "hidden"}
									/>
								</Link>
							))}
						</Box>
						{!props.accessToken ? (
							<Box className="f g8">
								<Button
									id="login"
									className="track_button"
									variant="outlined"
									color="purple"
									sx={{ padding: "8px 18px" }}
									onClick={() => navigate.push("/login")}
								>
									<FiPower size="20px" /> Log In
								</Button>
								<Button
									id="signup"
									className="track_button"
									variant="contained"
									color="purple"
									sx={{ padding: "8px 18px" }}
									onClick={() => navigate.push("/signup")}
								>
									<FiLogOut size="20px" />
									Sign Up
								</Button>
							</Box>
						) : (
							<Box className="f g8">
								<Button
									id="logout"
									className="track_button"
									variant="outlined"
									color="purple"
									sx={{ padding: "8px 18px" }}
									onClick={() => dispatch(setLogoutModal(true))}
								>
									<FiPower size="20px" /> Logout
								</Button>
								<Button
									id="go_to_dashboard"
									className="track_button"
									variant="contained"
									color="purple"
									sx={{ padding: "8px 18px" }}
									onClick={() => {
										navigate.push(
											props.authority === "PATIENT"
												? "/dashboard"
												: props.authority === "PROVIDER"
												? "/dashboard/provider"
												: "/dashboard/admin"
										)
									}}
								>
									Go to dashboard
									<FiArrowUpRight size="20px" />
								</Button>
							</Box>
						)}
					</Box>
				</Toolbar>
			</AppBar>
			<nav>
				<Drawer
					anchor="right"
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: { xs: "block", lg: "none" },
						"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
					}}
				>
					{drawer}
				</Drawer>
			</nav>
		</>
	)
}

const mapStateToProps = (state) => ({
	authority: state.local.userReducer.authority,
	accessToken: state.local.authReducer.accessToken,
})

export default connect(mapStateToProps)(NavBar)
