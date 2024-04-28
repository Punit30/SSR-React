import { Avatar, Box, CssBaseline, Typography } from "@mui/material"
import _ from "lodash"
import React from "react"
import { FiCheck, FiMapPin } from "react-icons/fi"
import { Link } from "react-router-dom"
import ElementPlus from "../../../../../Constants/svgs/ElementPlus"
import userAvatar from "../../../../../assets/imgs/user-avatar.png"

const STYLES = {
	serviceTag: {
		display: "flex",
		padding: "4px 12px",
		justifyContent: "center",
		alignItems: "center",
		gap: "4px",
		borderRadius: "6px",
		background: "#F9F9FB",
		color: "#717385",
		fontSize: "12px",
		fontWeight: "500",
		lineHeight: "20px",
	},
	seeMore: {
		color: "#814CD6",
		padding: "0px 4px",
		fontSize: "12px",
		fontWeight: "500",
		lineHeight: "20px",
	},
	vettedTag: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		gap: "6px",
		padding: "6px 12px",
		borderRadius: "36px",
		border: "1px solid #814CD6",
		background: "#FFF",
		fontSize: "12px",
		fontWeight: "500",
		lineHeight: "18px",
		color: "#814CD6",
	},
	comTag: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		gap: "4px",
		padding: "6px 12px",
		color: "#14882F",
		borderRadius: "36px",
		border: "1px solid #EAFEEF",
		background: "#EAFEEF",
		fontSize: "12px",
		fontWeight: "500",
		lineHeight: "18px",
	},
}
function ProviderCard({ provider }) {
	return (
		<Box
			component={Link}
			to={`/provider/info/${provider.id}`}
			className="f f-c g24 b-r16 h100 justify-s-b"
			padding={{ xs: "16px 24px", sm: "24px 32px" }}
			border="1px solid #EAEBF2"
			sx={{
				backgroundColor: "#FFF",
				textDecoration: "none",
				":hover": {
					boxShadow: "0px 19px 46px 0px rgba(72, 58, 102, 0.08)",
				},
			}}
		>
			<CssBaseline />
			<Box className="f f-c g24">
				<Box className="f g16">
					<Avatar
						sx={{
							minWidth: "72px",
							minHeight: "72px",
							maxWidth: "72px",
							maxHeight: "72px",
							backgroundColor: "#f2edfc",
							animation: "fadeAnimation 1s infinite alternate",
						}}
						alt={provider.name}
						src={provider.profilePic || userAvatar}
						key={provider.profilePic || userAvatar}
					/>
					<Box className="f f-c" justifyContent="center">
						<Typography
							color="#1B1C20"
							fontFamily="Poppins"
							fontSize={{ xs: "16px", md: "20px" }}
							fontWeight="600"
							lineHeight={{ xs: "22px", md: "28px" }}
						>
							{provider.name}, {_.join(provider.degree, ", ")}
						</Typography>
						<Typography color="#717385" fontSize="16px" fontWeight="500" lineHeight="24px">
							{_.join(provider.specialty, ", ")}
						</Typography>
					</Box>
				</Box>
				<Box className="f align-center flex-wrap g4">
					{_.map(provider.services, (service, index) => (
						<Typography key={index} sx={service !== "see more" ? STYLES.serviceTag : STYLES.seeMore}>
							{service}
						</Typography>
					))}
				</Box>
			</Box>
			<Box className="f f-c g10">
				{provider.location.length !== 0 ? (
					<Typography
						className="f align-center g6"
						color="#717385"
						fontSize="14px"
						fontWeight="500"
						lineHeight="20px"
					>
						<FiMapPin size="16px" /> {_.join(provider.location, ", ")}
					</Typography>
				) : null}
				<Box className="f align-center g4">
					{provider.isVetted ? (
						<Typography sx={STYLES.vettedTag}>
							<ElementPlus size="16px" />
						</Typography>
					) : null}
					{provider.inPerson ? (
						<Typography sx={STYLES.comTag}>
							<FiCheck size="16px" /> In-person
						</Typography>
					) : null}
					{provider.virtual ? (
						<Typography sx={STYLES.comTag}>
							<FiCheck size="16px" /> Virtual
						</Typography>
					) : null}
				</Box>
			</Box>
		</Box>
	)
}

export default ProviderCard
