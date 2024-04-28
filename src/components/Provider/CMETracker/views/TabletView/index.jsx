import { Box, CircularProgress, IconButton, List, ListItem, Skeleton, Typography } from "@mui/material"
import _ from "lodash"
import React from "react"
import { FiCheck, FiClock, FiEye, FiFileText, FiRotateCw, FiSlash, FiTrash2 } from "react-icons/fi"
import { IoFolderOpenOutline } from "react-icons/io5"
import IconFrame from "../../../../utilities/IconFrame"

const STYLES = {
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

function TabletView({
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
		<Box className="f f-c g12">
			{loading ? (
				_.times(6, (index) => <Skeleton height="72px" key={index} />)
			) : data.length !== 0 ? (
				_.map(data, (cert, index) => {
					const previewDisabled = loadingCert.id === cert.certificateId && loadingCert.loading
					return (
						<Box
							className="f g6 align-start b-r12"
							padding="12px 16px"
							key={index}
							border="1px solid #EAEBF2"
						>
							<Typography fontSize="20px" lineHeight="normal" paddingTop="2px" color="#9A9CB0">
								<FiFileText />
							</Typography>
							<Box className="f f-c g6 w100">
								<Box className="f g8 align-center justify-s-b">
									<Typography color="#717385" fontSize="14px" fontWeight="400" lineHeight="20px">
										{cert.certificateName}
									</Typography>
									<Box className="f  g4">
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
												<FiRotateCw size="18px" color="#9A9CB0" />
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
												<FiEye size="18px" color="#9A9CB0" />
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
											<FiTrash2 size="18px" color="#EF4444" />
										</IconButton>
									</Box>
								</Box>
								<Box className="f g8 align-center justify-s-b flex-wrap">
									<Box className="f align-center g8">
										<Typography sx={STYLES.tableCreditTag}>{cert.value}</Typography>
										<Box sx={{ ...STYLES.tableStatusTag, ...STYLES[STATUS[cert.status].cssClass] }}>
											<Typography fontSize="16px" lineHeight="12px">
												{STATUS[cert.status].icon}
											</Typography>
											<Typography fontSize="12px" fontWeight="500" lineHeight="20px">
												{STATUS[cert.status].label}
											</Typography>
										</Box>
									</Box>
									<Typography color="#9A9CB0" fontSize="12px" fontWeight="400" lineHeight="18px">
										{cert.completionDate}
									</Typography>
								</Box>
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
					<IconFrame
						icon={<IoFolderOpenOutline />}
						iconColor="#814CD6"
						iconSize="24px"
						backgroundColor="#F2EDFC"
						boxSize="72px"
					/>
					<Typography color="#717385" fontSize="14px" fontWeight="400" lineHeight="20px">
						No certificates uploaded
					</Typography>
				</Box>
			)}
		</Box>
	)
}

export default TabletView
