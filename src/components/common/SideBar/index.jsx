import { Avatar, Box, Divider, Drawer as TempDrawer, Typography, useMediaQuery } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { useTheme } from "@mui/material/styles"
import _ from "lodash"
import * as React from "react"
import { FiChevronLeft, FiChevronRight, FiHelpCircle, FiLogOut } from "react-icons/fi"
import { connect, useDispatch } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import ElementPlus from "../../../Constants/svgs/ElementPlus"
import logo from "../../../assets/imgs/logo-black.png"
import userAvatar from "../../../assets/imgs/user-avatar.png"
import { setHelpModal, setLogoutModal } from "../../../app/GlobalObjects/store/reducers/Modal"
import { Drawer, DrawerHeader, ListItemCon, SidebarAnchor, drawerWidth } from "./styles"

function DrawerContent({ menuList, sidebarOpen, user, handleClose = null }) {
	const { pathname } = useLocation()
	const dispatch = useDispatch()

	return (
		<Box className="f f-c g8 h100 justify-s-b">
			<List className="f f-c g8" sx={{ padding: "0px 16px" }}>
				{_.map(menuList, (menuItem, index) => {
					const active = menuItem.activeLinks.includes(pathname) ? 1 : 0
					return (
						<ListItemCon key={menuItem.name} disablePadding active={active}>
							<Link
								to={menuItem.redirect}
								style={{ textDecoration: "none", width: "100%" }}
								onClick={() => (handleClose ? handleClose() : null)}
							>
								<ListItemButton
									sx={{
										minHeight: 48,
										justifyContent: "initial",
										px: 2.5,
									}}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: 3,
											justifyContent: "center",
											fontSize: "24px",
										}}
									>
										{menuItem.icon}
									</ListItemIcon>
									{sidebarOpen ? <ListItemText primary={menuItem.name} /> : null}
								</ListItemButton>
							</Link>
						</ListItemCon>
					)
				})}
			</List>
			<Box className="f f-c justify-end">
				<Box sx={{ padding: "0px 16px 8px" }}>
					<List>
						{user.authority !== "ADMIN" ? (
							<ListItemCon disablePadding>
								<ListItemButton onClick={() => dispatch(setHelpModal(true))}>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: 3,
											justifyContent: "center",
											fontSize: "24px",
										}}
									>
										<FiHelpCircle size="24px" />
									</ListItemIcon>
									{sidebarOpen ? <ListItemText primary="Help" /> : null}
								</ListItemButton>{" "}
							</ListItemCon>
						) : null}
						<ListItemCon disablePadding>
							<ListItemButton onClick={() => dispatch(setLogoutModal(true))}>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: 3,
										justifyContent: "center",
										fontSize: "24px",
									}}
								>
									<FiLogOut size="24px" />
								</ListItemIcon>
								{sidebarOpen ? <ListItemText primary="Logout" /> : null}
							</ListItemButton>
						</ListItemCon>
					</List>
				</Box>
				<Divider />
				<Box className="f g8 align-center" sx={{ padding: "12px 20px" }}>
					<ListItemIcon
						sx={{
							minWidth: 0,
							mr: 3,
							justifyContent: "center",
							fontSize: "24px",
						}}
					>
						<Avatar
							sx={{ minHeight: "40px", minWidth: "40px", maxWidth: "40px", maxHeight: "40px" }}
							alt="user_profile_pic"
							src={user.profilePic || userAvatar}
						/>
					</ListItemIcon>
					{sidebarOpen ? (
						<Box className="f f-c justify-center">
							<Typography color="#1B1C20" fontSize="14px" fontWeight="500" lineHeight="20px">
								{user.firstName} {user.lastName}
							</Typography>
							<Typography color="#9A9CB0" fontSize="14px" fontWeight="400" lineHeight="20px">
								{user.email}
							</Typography>
						</Box>
					) : null}
				</Box>
			</Box>
		</Box>
	)
}

function SideBar(props) {
	const theme = useTheme()
	const showSidebar = useMediaQuery(theme.breakpoints.up("md"))

	return (
		<Box className="f" position="relative">
			<CssBaseline />
			{showSidebar ? (
				<Drawer anchor="left" variant="permanent" open={props.open}>
					<Box className="f f-c" overflow="auto" height="var(--window-height)">
						<DrawerHeader>
							<Link className="f align-center" to="/" aria-label="landing page">
								{props.open ? (
									<img src={logo} width="158px" height="28px" />
								) : (
									<ElementPlus size="32px" />
								)}
							</Link>
							<SidebarAnchor open={props.open} onClick={props.toggle}>
								{props.open ? <FiChevronLeft /> : <FiChevronRight />}
							</SidebarAnchor>
						</DrawerHeader>
						<DrawerContent menuList={props.menuList} sidebarOpen={props.open} user={props.user} />
					</Box>
				</Drawer>
			) : (
				<TempDrawer
					sx={{
						width: drawerWidth,
						flexShrink: 0,
						"& .MuiDrawer-paper": {
							width: drawerWidth,
							boxSizing: "border-box",
						},
					}}
					anchor="left"
					open={props.open}
					onClose={props.toggle}
				>
					<DrawerHeader className="f align-center justify-s-b">
						<Link className="f align-center" to="/" aria-label="landing page">
							<img src={logo} width="158px" height="28px" />
						</Link>
						{props.open ? (
							<SidebarAnchor open={props.open} onClick={props.toggle}>
								<FiChevronLeft />
							</SidebarAnchor>
						) : null}
					</DrawerHeader>
					<DrawerContent
						sidebarOpen={props.open}
						menuList={props.menuList}
						user={props.user}
						handleClose={props.toggle}
					/>
				</TempDrawer>
			)}
		</Box>
	)
}

const mapStateToProps = (state) => ({
	user: state.local.userReducer,
})

export default connect(mapStateToProps)(SideBar)
