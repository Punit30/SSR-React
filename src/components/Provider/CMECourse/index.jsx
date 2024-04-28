import { useLazyQuery, useMutation } from "@apollo/client"
import React, { useEffect, useState } from "react"
import { launchCourseMutation } from "../../../gql/mutations/Course"
import { Link, useParams } from "react-router-dom"
import { connect } from "react-redux"
import { Box, Breadcrumbs, CircularProgress, Skeleton, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
import _ from "lodash"
import { IoFolderOpen } from "react-icons/io5"
import { FiAward } from "react-icons/fi"

export const STYLES = {
	breadcrumb: {
		link: {
			color: "#667085",
			fontSize: "14px",
			fontWeight: "400",
			lineHeight: "20px",
			letterSpacing: "0.28px",
			textDecoration: "none",
			":hover": {
				textDecoration: "underline",
			},
		},
	},
}

function CMECourse({ providerId }) {
	const params = useParams()
	const { enqueueSnackbar } = useSnackbar()
	const [data, setData] = useState("")
	const [LaunchCourse, { loading }] = useMutation(launchCourseMutation)

	useEffect(() => {
		if (params.type !== "LINK") {
			fetchData()
		}
	}, [])

	const fetchData = async () => {
		try {
			const res = (await LaunchCourse({ variables: { courseId: params.id, providerId: providerId } })).data
				.launchCMECourse

			setData(res)
		} catch (e) {
			_.forEach(_.get(e, "graphQLErrors", []), ({ message }) =>
				enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
			)
		}
	}

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
					<Link style={STYLES.breadcrumb.link} to={`/dashboard/provider/cme-library/view/${params.id}`}>
						{loading ? (
							<Skeleton height="20px" width="160px" sx={{ borderRadius: "4px" }} />
						) : (
							data?.cmeCourse?.title
						)}
					</Link>
					<Typography
						color="#814CD6"
						fontSize="14px"
						fontWeight="500"
						lineHeight="20px"
						letterSpacing="0.28px"
					>
						Course in progress
					</Typography>
				</Breadcrumbs>
			</Box>
			<Box
				className="f f-c g8"
				padding={{ xs: "12px 16px 0px", md: "12px 24px 0px" }}
				height={{
					xs: "calc(var(--window-height) - 172px)",
					sm: "calc(var(--window-height) - 190px)",
					md: "calc(var(--window-height) - 121px)",
				}}
				sx={{ backgroundColor: "#F5F7FA", overflowY: "auto" }}
			>
				<Box
					className="f g24 align-start justify-s-b b-r16 flex-wrap"
					padding="16px 16px 24px 24px"
					sx={{ background: "linear-gradient(91deg, #592BA4 0%, #8954DE 61%, #592BA4 100%)" }}
				>
					<Box className="f f-c g2">
						<Typography
							color="#B592F6"
							fontSize="14px"
							fontWeight="500"
							lineHeight="20px"
							textTransform="capitalize"
						>
							{loading ? (
								<Skeleton height="20px" width="200px" sx={{ borderRadius: "4px" }} />
							) : (
								data?.cmeCourse?.description
							)}
						</Typography>
						<Typography color="#FFF" fontSize="18px" fontWeight="600" lineHeight="26px">
							{loading ? (
								<Skeleton height="26px" width="240px" sx={{ borderRadius: "4px" }} />
							) : (
								data?.cmeCourse?.title
							)}
						</Typography>
					</Box>
					<Box
						className="f align-center g6"
						padding="3px 10px"
						borderRadius="22px"
						sx={{ backgroundColor: "#FFF" }}
					>
						<FiAward size="13px" color="#6728CC" />
						{loading ? (
							<Skeleton height="18px" width="68px" sx={{ borderRadius: "4px" }} />
						) : (
							<Typography color="#6728CC" fontSize="12px" fontWeight="500" lineHeight="18px">
								{data?.cmeCourse?.credits} Credits
							</Typography>
						)}
					</Box>
				</Box>
				<Box
					className="f w100 h100"
					// height="calc(100vh - 100px)"
					border="1px solid #EAEBF2"
					sx={{
						overflow: "hidden",
						backgroundColor: "#FFF",
						borderTopLeftRadius: "16px",
						borderTopRightRadius: "16px",
					}}
				>
					{loading ? (
						<Box className="f f-c align-center w100 justify-center g12">
							<IoFolderOpen size="40px" color="#D9DAE6" />
							<Typography color="#9A9CB0" fontSize="16px" fontWeight="500" lineHeight="24px">
								Embedded course will be displayed here
							</Typography>
							<CircularProgress size="18px" />
						</Box>
					) : (
						<iframe
							style={{ border: "none" }}
							src={data.launchLink}
							height="100%"
							width="100%"
							title="Course"
							allowFullScreen
						/>
					)}
				</Box>
			</Box>
		</Box>
	)
}

const mapStateToProps = (state) => ({
	providerId: state.local.providerReducer.providerId,
})

export default connect(mapStateToProps)(CMECourse)
