import { useTheme } from "@emotion/react"
import { Box, Button, Divider, List, ListItem, ListItemText, Skeleton, Typography, useMediaQuery } from "@mui/material"
import _ from "lodash"
import React from "react"
import { FiPlus } from "react-icons/fi"
import { makeColor } from "../../../../utilities/Button"

const STYLES = {
	button: {
		...makeColor({
			bgColor: "#F2EDFC",
			bgHoverColor: "#F2EDFC",
			borderColor: "#F2EDFC",
			borderHoverColor: "#F2EDFC",
			color: "#814CD6",
			colorHover: "#814CD6",
			shadowColor: "none",
			disbabledBgColor: "transparent",
			disabledBorderColor: "transparent",
			disabledColor: "transparent",
		}),
		borderRadius: "6px",
		minWidth: "0px !important",
		padding: "3px 6px",
		fontSize: "12px",
		lineHeight: "18px",
		gap: "2px",
	},
}

function ListLayout({ title, listItems = [], loading, actions, noDataText = "No data", addModalClick = () => {} }) {
	const theme = useTheme()
	const isMD = useMediaQuery(theme.breakpoints.up("md"))

	return (
		<Box
			className="f f-c b-r8 w100"
			border="1px solid #d9dae6"
			minHeight="400px"
			height={{ xs: "400px", md: `calc(var(--window-height) - ${isMD ? "210px" : "260px"})` }}
		>
			<Box className="f g8 align-center justify-s-b p16">
				<Typography color="#1B1C20" fontSize="14px" fontWeight="500" lineHeight="20px">
					{title}
				</Typography>
				<Button sx={STYLES.button} onClick={addModalClick}>
					<FiPlus /> Add
				</Button>
			</Box>
			<Divider />
			{loading ? (
				<Box className="f f-c g16 p16">
					<Skeleton sx={{ borderRadius: "4px" }} height="20px" />
					<Skeleton sx={{ borderRadius: "4px" }} height="20px" />
					<Skeleton sx={{ borderRadius: "4px" }} height="20px" />
					<Skeleton sx={{ borderRadius: "4px" }} height="20px" />
					<Skeleton sx={{ borderRadius: "4px" }} height="20px" />
					<Skeleton sx={{ borderRadius: "4px" }} height="20px" />
					<Skeleton sx={{ borderRadius: "4px" }} height="20px" />
					<Skeleton sx={{ borderRadius: "4px" }} height="20px" />
				</Box>
			) : (
				<Box className="f f-c" sx={{ overflowY: "auto" }}>
					{listItems.length !== 0 ? (
						<List disablePadding>
							{_.map(listItems, (item) => (
								<ListItem
									key={item.name}
									secondaryAction={actions(item)}
									sx={{
										boxShadow: "inset 0px -1px 0px 0px #eaebf2 !important",
										padding: "16px 72px 16px 16px",
									}}
								>
									<ListItemText
										sx={{ "& .MuiListItemText-primary": { fontWeight: 400 } }}
										primary={item.name}
									/>
								</ListItem>
							))}
						</List>
					) : (
						<Box className="f align-center justify-center" height="280px">
							<Typography color="#717385" fontSize="14px" fontWeight="400" lineHeight="20px">
								{noDataText}
							</Typography>
						</Box>
					)}
				</Box>
			)}
		</Box>
	)
}

export default ListLayout
