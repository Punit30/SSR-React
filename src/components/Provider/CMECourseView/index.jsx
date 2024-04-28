import { useLazyQuery } from "@apollo/client"
import { Box, Breadcrumbs, CssBaseline, Divider, Typography, useMediaQuery } from "@mui/material"
import _ from "lodash"
import moment from "moment"
import { useSnackbar } from "notistack"
import React, { useEffect, useState } from "react"
import { FiArrowRight, FiAward, FiCalendar, FiFlag, FiVideo } from "react-icons/fi"
import { IoBook, IoBookOutline, IoBookmark, IoPlay, IoSparkles } from "react-icons/io5"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getCMECourseQuery } from "../../../gql/queries/Course"
import Button from "../../utilities/Button"
import Loading from "./loading/Loading"
import { DATA_VALUES, STATUS, STYLES } from "./meta/MetaData.jsx"
import { KeyInfoDetail } from "./widgets/DetailMappers"
import RedirectNotice from "./modal/RedirectNotice"
import { useTheme } from "@emotion/react"
import { BsPatchCheckFill } from "react-icons/bs"

function CMECourseView() {
	const theme = useTheme()
	const isSM = useMediaQuery(theme.breakpoints.up("sm"))
	const params = useParams()
	const navigate = useNavigate()
	const { enqueueSnackbar } = useSnackbar()

	const [data, setData] = useState(_.cloneDeep(DATA_VALUES))
	const [loading, setLoading] = useState(false)
	const [redirectNoticeModal, setRedirectNoticeModal] = useState(false)

	const [GetCourse] = useLazyQuery(getCMECourseQuery, { fetchPolicy: "network-only" })

	useEffect(() => {
		getData()
	}, [])

	const getData = async () => {
		setLoading(true)
		try {
			const res = (await GetCourse({ variables: { courseId: params.id } })).data.getCMECourse
			setData({
				id: res.id,
				isJointProvider: res.jointProviderShip,
				title: res.title,
				description: res.description,
				credit: res.credits,
				creditType: res.creditType,
				publishDate: new Date(res.startDate),
				expirationDate: new Date(res.expirationDate),
				courseFormat: res.cmeCourseFormat,
				courseType: res.cmeCourseType,
				tags: res.tags,
				specialty: res.specialities,
				topics: res.topics,
				state: res.requiredStates,
				overview: res.courseOverview,
				feedbackLink: res.feedbackUrl,
				cmeCourseLink: res.cmeCourseLink,
				status: res.providerCourse?.cmeCourseStatus,
			})
		} catch (e) {
			_.forEach(_.get(e, "graphQLErrors", []), ({ message }) =>
				enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
			)
		}
		setLoading(false)
	}

	if (loading) return <Loading />

	return (
		<Box className="f f-c">
			<CssBaseline />
			<RedirectNotice
				open={redirectNoticeModal}
				redirectLink={data.cmeUploadLink}
				handleClose={() => setRedirectNoticeModal(false)}
			/>
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
					<Typography
						color="#814CD6"
						fontSize="14px"
						fontWeight="500"
						lineHeight="20px"
						letterSpacing="0.28px"
					>
						{data.title}
					</Typography>
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
					gap="16px"
					padding="16px"
					sx={{ background: "linear-gradient(91deg, #592BA4 0%, #8954DE 61%, #592BA4 100%)" }}
				>
					<Box className="f f-c" gap={{ xs: "32px", sm: "28px" }} width={{ xs: "100%", sm: "fit-content" }}>
						<Box className="f f-c g10">
							<Box className="f f-c">
								<Typography
									color="#B592F6"
									fontSize={{ xs: "12px", sm: "14px" }}
									fontWeight="500"
									lineHeight={{ xs: "18px", sm: "20px" }}
									textTransform="capitalize"
								>
									{data.description}
								</Typography>
								<Typography
									color="#FFF"
									fontSize={{ xs: "14px", sm: "18px" }}
									fontWeight="600"
									lineHeight={{ xs: "20px", sm: "26px" }}
								>
									{data.title}
								</Typography>
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
									{data.credit} credits
								</Typography>
								{data.creditType.map((creditType, index) => (
									<Box className="f align-center g8" key={index}>
										<Typography color="#B592F6" fontSize="12px" lineHeight="18px">
											&#x2022;
										</Typography>
										<Typography
											color="#F2EDFC"
											fontSize="12px"
											fontWeight="500"
											lineHeight="18px"
											textTransform="capitalize"
										>
											{creditType.toLowerCase()} credit
										</Typography>
									</Box>
								))}
							</Box>
						</Box>
						<Box className="f">
							{data.status === "COMPLETED" ? (
								<Box className="f f-c g8 w100">
									<Box
										className="f g6 align-center"
										width="fit-content"
										padding="4px 10px"
										sx={{ backgroundColor: "#CDF5D1", borderRadius: "22px" }}
									>
										<BsPatchCheckFill size="13px" color="#136927" />
										<Typography color="#136927" fontSize="12px" fontWeight="500" lineHeight="18px">
											Congratulations! You have completed the course.
										</Typography>
									</Box>
									{data.feedbackLink ? (
										<Box className="f">
											<Button
												fullWidth={isSM ? false : true}
												id="cme-course-view-feedback"
												className="track_button"
												type="button"
												variant="outlined"
												color="gray"
												sx={STYLES.button}
												component={Link}
												to={data.feedbackLink}
												target="_blank"
											>
												Submit feedback
												<FiArrowRight size="14px" />
											</Button>
										</Box>
									) : null}
								</Box>
							) : (
								<Box className="f">
									<Button
										fullWidth={isSM ? false : true}
										id="cme-course-view-launch"
										className="track_button"
										type="button"
										variant="outlined"
										color="gray"
										sx={STYLES.button}
										onClick={() =>
											data.courseFormat === "LINK"
												? setRedirectNoticeModal(true)
												: navigate(
														`/dashboard/provider/cme-library/course/${data.courseType.toLowerCase()}/${
															params.id
														}`
												  )
										}
									>
										{data.courseFormat === "LINK"
											? "Go to course"
											: data.status === "IN_PROGRESS"
											? "Resume course"
											: "Start course"}
										{data.status === "IN_PROGRESS" ? (
											<IoPlay size="16px" />
										) : (
											<FiArrowRight size="14px" />
										)}
									</Button>
								</Box>
							)}
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
							<Box
								className="f f-c"
								sx={{
									"& ul": {
										margin: "0px",
										paddingLeft: "16px",
									},
								}}
								color="#717385 !important"
								dangerouslySetInnerHTML={{ __html: data.overview }}
							/>
						</Box>
						{data.isJointProvider ? (
							<Box
								className="f f-c g8 w100"
								padding="12px 16px 20px"
								sx={{ borderRadius: "14px", backgroundColor: "#FFF" }}
							>
								<Box className="f align-center g8">
									<Box sx={STYLES.boxIcon}>
										<IoBookOutline />
									</Box>
									<Typography color="#814CD6" fontSize="14px" fontWeight="600" lineHeight="20px">
										Accreditation Statement
									</Typography>
								</Box>
								<Box className="f f-c" gap="14px">
									<Box className="f f-c g6">
										<Typography sx={STYLES.jointProviderShip.header}>
											Accreditation Statement:
										</Typography>
										<Typography sx={STYLES.jointProviderShip.description}>
											In support of improving patient care, Rush University Medical Center is
											jointly accredited by the Accreditation Council for Continuing Medical
											Education (ACCME), the Accreditation Council for Pharmacy Education (ACPE),
											and the American Nurses Credentialing Center (ANCC), to provide continuing
											education for the healthcare team.
										</Typography>
									</Box>
									<Box className="f f-c g6">
										<Typography sx={STYLES.jointProviderShip.header}>
											Joint Providership Statement:
										</Typography>
										<Typography sx={STYLES.jointProviderShip.description}>
											This activity has been planned and implemented in accordance with the
											accreditation requirements and policies of the Accreditation Council for
											Continuing Medical Education (ACCME) through the joint providership of Rush
											University Medical Center and inclusive+. Rush University Medical Center is
											accredited by the ACCME to provide continuing medical education for
											physicians.
										</Typography>
									</Box>
								</Box>
							</Box>
						) : null}
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
							<KeyInfoDetail
								icon={<FiFlag />}
								label="Status"
								value={
									<Typography
										className="f align-center g4"
										component="span"
										fontSize="inherit"
										fontWeight="inherit"
										lineHeight="inherit"
										sx={STATUS[data.status].colorClass}
									>
										{STATUS[data.status].icon} {STATUS[data.status].label}
									</Typography>
								}
							/>
							<Divider />
							<KeyInfoDetail icon={<FiAward />} label="Credit" value={`${data.credit} credits`} />
							<Divider />
							<KeyInfoDetail
								icon={<FiVideo />}
								label="Course format"
								value={data.courseFormat.toLowerCase().split("_").join(" ")}
							/>
							<Divider />
							<KeyInfoDetail
								icon={<FiCalendar />}
								label="Published date"
								value={moment(data.publishDate).format("LL")}
							/>
							<Divider />
							<KeyInfoDetail
								icon={<FiCalendar />}
								label="Expiration date"
								value={moment(data.expirationDate).format("LL")}
							/>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default CMECourseView
