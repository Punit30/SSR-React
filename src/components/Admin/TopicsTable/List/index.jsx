import { useTheme } from "@emotion/react"
import { Box, Divider, List, ListItem, ListItemText, Skeleton, Typography, useMediaQuery } from "@mui/material"
import _ from "lodash"
import React from "react"

function TopicListLayout({ title, listItems = [], loading, actions, noDataText = "No data" }) {
	const theme = useTheme()
	const isMD = useMediaQuery(theme.breakpoints.up("md"))

	return (
		<Box
			className="f f-c b-r8 w100"
			border="1px solid #d9dae6"
			minHeight="400px"
			height={`calc(var(--window-height) - ${isMD ? "270px" : "320px"})`}
		>
			<Box className="f g8 align-center justify-s-b p16">
				<Typography color="#1B1C20" fontSize="14px" fontWeight="500" lineHeight="20px">
					{title}
				</Typography>
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

export default TopicListLayout
