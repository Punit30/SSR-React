import { Box, Button, Divider, Skeleton, Typography } from "@mui/material"
import _ from "lodash"
import React from "react"
import { FiArrowLeft } from "react-icons/fi"
import { Link } from "react-router-dom"
import { makeColor } from "../../../../utilities/Button"

const STYLES = {
	backButton: {
		...makeColor({
			bgColor: "transparent",
			bgHoverColor: "transparent",
			borderColor: "transparent",
			borderHoverColor: "transparent",
			color: "#fff",
			colorHover: "#fff",
			shadowColor: "none",
			disbabledBgColor: "transparent",
			disabledBorderColor: "transparent",
			disabledColor: "#B1B3C4",
		}),
		padding: "10px 0px",
		width: "fit-content",
		gap: "8px",
		fontSize: "14px",
		fontWeight: "500",
		lineHeight: "20px",
	},
}
function LoadingSkeleton({ backButton = true }) {
	const LabelContainer = ({ label, children }) => (
		<Box className="f f-c g8">
			<Typography color="#1B1C20" fontSize="16px" fontWeight="600" lineHeight="24px">
				{label}
			</Typography>
			{children}
		</Box>
	)

	return (
		<>
			<Box className="f f-c" gap={{ xs: "16px", md: "24px" }} sx={{ backgroundColor: "#814cd6" }}>
				<Box padding={{ xs: "16px 16px 0px", md: "40px 96px 0px" }}>
					{backButton ? (
						<Button LinkComponent={Link} to="/find-a-provider" sx={STYLES.backButton}>
							<FiArrowLeft /> Back to all provider
						</Button>
					) : null}
				</Box>
				<Box
					className="f flex-wrap g16"
					padding={{ xs: "0px 16px", md: "0px 96px" }}
					sx={{ background: "linear-gradient(to bottom, #814cd6 35%, #ffffff 35% 100%)" }}
				>
					<Skeleton height="210px" sx={{ flex: 2, minWidth: { xs: "320px", sm: "540px" } }} />
					<Skeleton height="210px" sx={{ flex: 1, minWidth: "320px" }} />
				</Box>
			</Box>
			<Box className="f" padding={{ xs: "24px 16px 208px", md: "40px 96px 352px" }}>
				<Box className="f f-c" gap="48px" maxWidth="768px">
					<Box className="f f-c g8">
						<Typography color="#1B1C20" fontSize="16px" fontWeight="600" lineHeight="24px">
							Services
						</Typography>
						<Box className="f align-center g6 flex-wrap">
							{_.times(6, (index) => (
								<Skeleton height="38px" width="90px" key={index} />
							))}
						</Box>
					</Box>
					<Box className="f f-c g24">
						<Box className="f f-c g16">
							<Typography color="#1B1C20" fontSize="18px" fontWeight="600" lineHeight="26px">
								Personal information
							</Typography>
							<Divider />
						</Box>
						<LabelContainer label="About">
							<Skeleton height="52px" />
						</LabelContainer>
						<LabelContainer label="Identify as">
							<Box className="f align-center g6 flex-wrap">
								{_.times(2, (index) => (
									<Skeleton height="38px" width="90px" key={index} />
								))}
							</Box>
						</LabelContainer>
						<LabelContainer label="Pronouns">
							<Box className="f align-center g6 flex-wrap">
								{_.times(4, (index) => (
									<Skeleton height="38px" width="90px" key={index} />
								))}
							</Box>
						</LabelContainer>
						<LabelContainer label="Genders">
							<Box className="f align-center g6 flex-wrap">
								{_.times(4, (index) => (
									<Skeleton height="38px" width="90px" key={index} />
								))}
							</Box>
						</LabelContainer>
						<LabelContainer label="Race or Ethnicity">
							<Box className="f align-center g6 flex-wrap">
								{_.times(4, (index) => (
									<Skeleton height="38px" width="90px" key={index} />
								))}
							</Box>
						</LabelContainer>
						<LabelContainer label="Languages">
							<Box className="f align-center g6 flex-wrap">
								{_.times(4, (index) => (
									<Skeleton height="38px" width="90px" key={index} />
								))}
							</Box>
						</LabelContainer>
					</Box>
					<Box className="f f-c g24">
						<Box className="f f-c g16">
							<Typography color="#1B1C20" fontSize="18px" fontWeight="600" lineHeight="26px">
								Professional information
							</Typography>
							<Divider />
						</Box>
						<LabelContainer label="Degrees">
							<Box className="f align-center g6 flex-wrap">
								{_.times(4, (index) => (
									<Skeleton height="38px" width="90px" key={index} />
								))}
							</Box>
						</LabelContainer>
						<LabelContainer label="Patient focus group">
							<Box className="f align-center g6 flex-wrap">
								{_.times(4, (index) => (
									<Skeleton height="38px" width="90px" key={index} />
								))}
							</Box>
						</LabelContainer>
						<LabelContainer label="Practice location">
							<Skeleton height="78px" />
						</LabelContainer>
						<LabelContainer label="Payments accepted">
							<Box className="f align-center g6 flex-wrap">
								{_.times(4, (index) => (
									<Skeleton height="38px" width="90px" key={index} />
								))}
							</Box>
						</LabelContainer>
					</Box>
				</Box>
			</Box>
		</>
	)
}

export default LoadingSkeleton
