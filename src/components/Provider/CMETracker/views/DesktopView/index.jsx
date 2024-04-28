import { Box, CircularProgress, IconButton, Skeleton, Typography } from "@mui/material"
import _ from "lodash"
import React from "react"
import { FiCheck, FiClock, FiEye, FiFileText, FiRotateCw, FiSlash, FiTrash2 } from "react-icons/fi"
import { IoFolderOpen, IoFolderOpenOutline } from "react-icons/io5"

const STYLES = {
	tableHead: {
		backgroundColor: "#F2EDFC",
		border: "1px solid #F2EDFC",
		padding: "0px 4px",
	},
	tableHeadHeading: {
		width: "100%",
		padding: "16px 8px",
		color: "#3F1681",
		fontSize: "14px",
		fontWeight: "500",
		lineHeight: "20px",
	},
	tableRow: {
		width: "100%",
		padding: "16px 8px",
	},
	tableRowText: {
		color: "#717385",
		fontSize: "14px",
		fontWeight: "400",
		lineHeight: "20px",
	},
	tableCreditTag: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: "2px 10px",
		backgroundColor: "#F2EDFC",
		color: "#814CD6",
		textAlign: "center",
		fontSize: "14px",
		fontWeight: "500",
		lineHeight: "20px",
		borderRadius: "24px",
	},
	tableStatusTag: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		gap: "4px",
		borderRadius: "4px",
		padding: "4px 12px",
		textAlign: "center",
	},
	success: {
		color: "#14882F",
		backgroundColor: "#EAFEEF",
	},
	pending: {
		color: "#E8930B",
		backgroundColor: "#FFF8EA",
	},
	rejected: {
		color: "#EF4444",
		backgroundColor: "#FFF1F3",
	},
}

const STATUS = {
	APPROVED: { icon: <FiCheck />, label: "Approved", cssClass: "success" },
	PENDING: { icon: <FiClock />, label: "Approval pending", cssClass: "pending" },
	REJECTED: { icon: <FiSlash />, label: "Rejected", cssClass: "rejected" },
}

function DesktopView({
	data,
	loading,
	loadingCert,
	setUploadModal = () => {},
	setSelectedCert = () => {},
	setIsEditForm = () => {},
	handleCertPreview = () => {},
	setDltModal = () => {},
}) {
	return (
		<Box className="f f-c g8" overflow="auto">
			<Box className="f align-center b-r12 justify-s-b" sx={STYLES.tableHead}>
				<Typography minWidth="158px" maxWidth="438px" sx={STYLES.tableHeadHeading}>
					Certificate
				</Typography>
				<Typography minWidth="108px" maxWidth="144px" textAlign="center" sx={STYLES.tableHeadHeading}>
					Completion date
				</Typography>
				<Typography minWidth="102px" maxWidth="192px" textAlign="center" sx={STYLES.tableHeadHeading}>
					Credit hours (e.g. 0.5)
				</Typography>
				<Typography minWidth="88px" maxWidth="210px" textAlign="center" sx={STYLES.tableHeadHeading}>
					Status
				</Typography>
				<Typography minWidth="88px" maxWidth="164px" textAlign="end" sx={STYLES.tableHeadHeading}>
					Actions
				</Typography>
			</Box>
			<Box className="f f-c">
				{loading ? (
					_.times(6, (index) => (
						<Box key={index} sx={{ padding: "16px 0px", borderBottom: "1px solid #EAEBF2" }}>
							<Skeleton height="72px" />
						</Box>
					))
				) : data.length !== 0 ? (
					_.map(data, (cert, index) => {
						const previewDisabled = loadingCert.id === cert.certificateId && loadingCert.loading
						return (
							<Box
								className="f align-center justify-s-b"
								key={index}
								sx={{ borderBottom: "1px solid #EAEBF2" }}
								padding="0px 4px"
							>
								<Box minWidth="158px" maxWidth="438px" className="f g4" sx={STYLES.tableRow}>
									<Typography fontSize="20px" lineHeight="normal" color="#9A9CB0">
										<FiFileText />
									</Typography>
									<Typography sx={STYLES.tableRowText}>{cert.certificateName}</Typography>
								</Box>
								<Typography
									minWidth="108px"
									maxWidth="144px"
									textAlign="center"
									sx={{ ...STYLES.tableRowText, ...STYLES.tableRow }}
								>
									{cert.completionDate}
								</Typography>
								<Box
									className="f align-start justify-center"
									minWidth="102px"
									maxWidth="192px"
									sx={STYLES.tableRow}
								>
									<Typography sx={STYLES.tableCreditTag}>{cert.value}</Typography>
								</Box>
								<Box
									minWidth="88px"
									maxWidth="210px"
									className="f align-start justify-center"
									sx={STYLES.tableRow}
								>
									<Box sx={{ ...STYLES.tableStatusTag, ...STYLES[STATUS[cert.status].cssClass] }}>
										<Typography fontSize="16px" lineHeight="12px">
											{STATUS[cert.status].icon}
										</Typography>
										<Typography fontSize="12px" fontWeight="500" lineHeight="20px">
											{STATUS[cert.status].label}
										</Typography>
									</Box>
								</Box>
								<Box
									minWidth="88px"
									maxWidth="164px"
									className="f g8 align-start justify-end"
									sx={{ ...STYLES.tableRow, gap: "2px" }}
								>
									{cert.status === "REJECTED" ? (
										<IconButton
											id="certificate_re-upload_action"
											className="track_button"
											sx={{ padding: "4px" }}
											onClick={() => {
												setIsEditForm(true)
												setSelectedCert(cert)
												setUploadModal(true)
											}}
										>
											<FiRotateCw size="20px" color="#9A9CB0" />
										</IconButton>
									) : null}
									<IconButton
										id="certificate_view_action"
										className="track_button"
										sx={{ padding: "4px" }}
										disabled={previewDisabled}
										onClick={() => handleCertPreview(cert.certificateId)}
									>
										{previewDisabled ? (
											<CircularProgress thickness={5} size="18px" />
										) : (
											<FiEye size="20px" color="#9A9CB0" />
										)}
									</IconButton>
									<IconButton
										id="certificate_delete_action"
										className="track_button"
										sx={{ padding: "4px" }}
										onClick={() => {
											setSelectedCert(cert)
											setDltModal(true)
										}}
									>
										<FiTrash2 size="20px" color="#EF4444" />
									</IconButton>
								</Box>
							</Box>
						)
					})
				) : (
					<Box
						className="f f-c g16 align-center justify-center w100 b-r12"
						height="200px"
						border="1px solid #EAEBF2"
					>
						<Box
							className="f align-center justify-center b-rhalf"
							minHeight="72px"
							maxHeight="72px"
							minWidth="72px"
							maxWidth="72px"
							sx={{ backgroundColor: "#F2EDFC" }}
						>
							<IoFolderOpenOutline size="24px" color="#814CD6" />
						</Box>
						<Typography color="#717385" fontSize="14px" fontWeight="400" lineHeight="20px">
							No certificates uploaded
						</Typography>
					</Box>
				)}
			</Box>
		</Box>
	)
}

export default DesktopView
