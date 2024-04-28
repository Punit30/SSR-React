import MuiDrawer from "@mui/material/Drawer"
import ListItem from "@mui/material/ListItem"
import { styled } from "@mui/styles"

export const drawerWidth = 280

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
})

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(10)} + 1px)`,
})

export const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
    justifyContent: "space-between",
	padding: "30px 24px",
	height: "96px",
	...theme.mixins.toolbar,
}))

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
    "& .MuiPaper-root": {
        // position: "static",
        overflow: "visible !important"
    }
}))

export const SidebarAnchor = styled("div")(({ theme, open }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	position: open ? "static"  : "absolute",
	top: "32px",
	right: open ? "0px" : "-14px",
	transition: "right .2s",
	zIndex: theme.zIndex.drawer + 1,
	minWidth: "30px",
	minHeight: "30px",
	maxHeight: "30px",
	maxWidth: "30px",
	backgroundColor: "#f9f9fb",
	borderRadius: "6px",
	border: "1px solid #eaebf2",
	fontSize: "16px",
	color: "#717385",
    cursor: "pointer",
}))

export const ListItemCon = styled(ListItem)(({ theme, ...props }) => ({
	borderRadius: "8px",
	background: props.active ? "#814CD6" : "#FFF",

	"& .MuiListItemButton-root .MuiListItemText-root .MuiTypography-root": {
		color: props.active ? "#FFF" : "#1B1C20",
		fontSize: "16px",
		fontWeight: "500",
		lineHeight: "24px",
	},

	"& .MuiListItemButton-root .MuiListItemIcon-root": {
		color: props.active ? "#FFF" : "#717385",
	},

	"&:hover": {
		background: props.active ? "#814CD6" : "#f2edfc",
	},

	"& .MuiListItemButton-root:hover": {
		background: props.active ? "#814CD6" : "#f2edfc",

		"& > .MuiListItemText-root .MuiTypography-root, .MuiListItemIcon-root": {
			color: props.active ? "#FFF" : "#814CD6",
		},
	},
}))
