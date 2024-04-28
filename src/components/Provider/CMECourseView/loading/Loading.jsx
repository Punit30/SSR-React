import { Box, Breadcrumbs, Button, Divider, Skeleton, Typography, useMediaQuery } from "@mui/material"
import _ from "lodash"
import React from "react"
import { FiArrowRight, FiAward, FiCalendar, FiFlag, FiVideo } from "react-icons/fi"
import { IoBook, IoBookmark, IoSparkles } from "react-icons/io5"
import { Link } from "react-router-dom"
import { MAPPER_STYLES, STYLES } from "../meta/MetaData.jsx"
import { useTheme } from "@emotion/react"

const SKELETON_BORDER_RADIUS = { borderRadius: "5px" }

const KeyInfoDetail = ({ icon, label }) => (
	<Box className="f align-center g12 justify-s-b" padding="14px 0px">
		<Box sx={MAPPER_STYLES.keyInfo.details}>
			<Typography fontSize="16px" color="#717385" lineHeight="16px">
				{icon}
			</Typography>
			<Typography sx={MAPPER_STYLES.keyInfo.text}>{label}</Typography>
		</Box>
		<Skeleton height="18px" width="100px" sx={SKELETON_BORDER_RADIUS} />
	</Box>
)

function Loading() {
	const theme = useTheme()
	const isSM = useMediaQuery(theme.breakpoints.up("sm"))
	return (
		<Box className="f f-c">
			<Box className="f f-c g4" padding={{ xs: "16px 16px 24px", sm: "32px 24px 24px" }}>
				<Typography
					color="#101828"
					fontFamily="Poppins"
					fontSize={{ xs: "24px", md: "28px" }}
					fontWeight="500"
					lineHeight={{ xs: "33px", md: "36px" }}
				>
					CME library
				</Typography>
				<Breadcrumbs aria-label="breadcrumb" separator=">">
					<Link style={STYLES.breadcrumb.link} to="/dashboard/provider/cme-library">
						CME library
					</Link>
					<Link style={STYLES.breadcrumb.link} to="/dashboard/provider/cme-library">
						Courses
					</Link>
					<Skeleton height="20px" width="120px" sx={SKELETON_BORDER_RADIUS} />
				</Breadcrumbs>
			</Box>
			<Box
				className="f f-c g16"
				padding={{ xs: "12px 16px 24px", md: "12px 24px 24px" }}
				height={{
					xs: "calc(var(--window-height) - 172px)",
					sm: "calc(var(--window-height) - 190px)",
					md: "calc(var(--window-height) - 122px)",
				}}
				sx={{ backgroundColor: "#F5F7FA", overflowY: "auto" }}
			>
				<Box
					className="f align-start justify-s-b b-r16"
					flexWrap="wrap-reverse"
					gap="24px"
					padding="16px"
					sx={{ background: "linear-gradient(91deg, #592BA4 0%, #8954DE 61%, #592BA4 100%)" }}
				>
					<Box className="f f-c" gap={{xs: "32px" , sm: "28px"}}>
						<Box className="f f-c g10">
							<Box className="f f-c g4">
								<Skeleton height={isSM ? "18px" : "16px"} width="190px" sx={SKELETON_BORDER_RADIUS} />
								<Skeleton height={isSM ? "24px" : "18px"} width="280px" sx={SKELETON_BORDER_RADIUS} />
							</Box>
							<Box className="f align-center g8">
								<Typography
									className="f align-center g4"
									color="#F2EDFC"
									fontSize="12px"
									fontWeight="500"
									lineHeight="18px"
								>
									<FiAward size="14px" />
									<Skeleton height="18px" width="26px" sx={SKELETON_BORDER_RADIUS} /> credits
								</Typography>
								<Typography color="#B592F6" fontSize="12px" lineHeight="18px">
									&#x2022;
								</Typography>
								<Skeleton height="18px" width="70px" sx={SKELETON_BORDER_RADIUS} />
								<Typography color="#B592F6" fontSize="12px" lineHeight="18px">
									&#x2022;
								</Typography>
								<Skeleton height="18px" width="70px" sx={SKELETON_BORDER_RADIUS} />
							</Box>
						</Box>
						<Box className="f">
							<Button type="button" sx={STYLES.button} disabled fullWidth={isSM ? false : true}>
								Start Course
								<FiArrowRight size="14px" />
							</Button>
						</Box>
					</Box>
					<Box className="f align-center g6 flex-wrap justify-end">
						<Typography
							className="f g6 align-center"
							padding="4px 10px"
							color="#6728CC"
							fontSize="12px"
							fontWeight="500"
							lineHeight="18px"
							sx={{ backgroundColor: "#FED23F", borderRadius: "22px" }}
							maxWidth="214px"
						>
							<IoSparkles size="13px" />
							Personalized recommendation
						</Typography>
					</Box>
				</Box>
				<Box className="f align-start g16" flexDirection={{ xs: "column-reverse", md: "row" }}>
					<Box className="f f-c g12 w100">
						<Box
							className="f f-c g8 w100"
							padding="12px 16px 20px"
							sx={{ borderRadius: "14px", backgroundColor: "#FFF" }}
						>
							<Box className="f align-center g8">
								<Box sx={STYLES.boxIcon}>
									<IoBook />
								</Box>
								<Typography color="#814CD6" fontSize="14px" fontWeight="600" lineHeight="20px">
									Learning objectives
								</Typography>
							</Box>
							<Box className="f f-c g8">
								<Skeleton height="20px" sx={SKELETON_BORDER_RADIUS} width="70%" />
								{_.times(4, (index) => (
									<Skeleton height="20px" key={index} sx={SKELETON_BORDER_RADIUS} />
								))}
								<Skeleton height="20px" sx={SKELETON_BORDER_RADIUS} width="70%" />
								{_.times(4, (index) => (
									<Skeleton height="20px" key={index} sx={SKELETON_BORDER_RADIUS} />
								))}
								<Skeleton height="20px" sx={SKELETON_BORDER_RADIUS} width="70%" />
								{_.times(4, (index) => (
									<Skeleton height="20px" key={index} sx={SKELETON_BORDER_RADIUS} />
								))}
							</Box>
						</Box>
					</Box>
					<Box
						className="f f-c g8 w100"
						padding="12px 16px 20px"
						maxWidth={{ xs: "none", md: "358px" }}
						sx={{ borderRadius: "14px", backgroundColor: "#FFF" }}
					>
						<Box className="f align-center g8">
							<Box sx={STYLES.boxIcon}>
								<IoBookmark />
							</Box>
							<Typography color="#1B1C20" fontSize="14px" fontWeight="600" lineHeight="20px">
								Key information
							</Typography>
						</Box>
						<Box className="f f-c">
							<KeyInfoDetail icon={<FiFlag />} label="Status" />
							<Divider />
							<KeyInfoDetail icon={<FiAward />} label="Credit" />
							<Divider />
							<KeyInfoDetail icon={<FiVideo />} label="Course format" />
							<Divider />
							<KeyInfoDetail icon={<FiCalendar />} label="Published date" />
							<Divider />
							<KeyInfoDetail icon={<FiCalendar />} label="Expiration date" />
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default Loading
