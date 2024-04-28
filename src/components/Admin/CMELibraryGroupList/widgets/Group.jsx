import { useMutation } from "@apollo/client"
import { Box, CssBaseline, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import _ from "lodash"
import { useSnackbar } from "notistack"
import React, { useState } from "react"
import { FiEdit2, FiPlus, FiShuffle, FiTrash2 } from "react-icons/fi"
import { IoEllipsisVertical } from "react-icons/io5"
import { Link, useNavigate } from "react-router-dom"
import { RESOURCE_FORMAT_LIST } from "../../../../Constants/data-types/cme-formats"
import { dltCourseMutation, reArrangeCoursesMutation } from "../../../../gql/mutations/Course"
import { TrackForm } from "../../../../app/GlobalObjects/store/actions/TrackForm"
import Delete from "../../../common/Modals/Delete"
import ReArrange from "../Modals/ReArrange"

function Group({ data, handleEdit, handleDlt, refreshData }) {
	const { enqueueSnackbar } = useSnackbar()
	const navigate = useNavigate()
	const [anchorEl, setAnchorEl] = useState(null)
	const [selectedGroup, setSelectedGroup] = useState(null)
	const [selectedCourse, setSelectedCourse] = useState(null)
	const [reArrangeModal, setReArrangeModal] = useState(false)
	const [dltModal, setDltModal] = useState(false)

	const [ReArrangeCourses, { loading: reArrangeLoading }] = useMutation(reArrangeCoursesMutation)
	const [DltCourse, { loading: dltLoading }] = useMutation(dltCourseMutation)

	const handleReArrange = async (values) => {
		try {
			const orderList = _.map(values, (item, index) => ({
				id: item.id,
				order: index + 1,
			}))

			await ReArrangeCourses({
				variables: {
					orderList,
					cmeCourseGroupId: selectedGroup.id,
				},
			})
			refreshData()
			setReArrangeModal(false)
			enqueueSnackbar("Courses re-arranged successfully.", { variant: "mui-alert", color: "success" })
			TrackForm({ formId: "course_rearrange", variant: "success" })
		} catch (e) {
			TrackForm({ formId: "course_rearrange", variant: "danger" })
			_.forEach(_.get(e, "graphQLErrors", []), ({ message }) =>
				enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
			)
		}
	}

	const handleDltFunc = async () => {
		try {
			await DltCourse({ variables: { cmeCourseId: selectedCourse.id } })
			refreshData()
			setSelectedCourse(null)
			setDltModal(false)
			enqueueSnackbar("Course deleted successfully.", { variant: "mui-alert", color: "success" })
			TrackForm({ formId: "course_delete", variant: "success" })
		} catch (e) {
			TrackForm({ formId: "course_delete", variant: "danger" })
			_.forEach(_.get(e, "graphQLErrors", []), ({ message }) =>
				enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
			)
		}
	}

	const handleOpenMenu = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleCloseMenu = () => {
		setAnchorEl(null)
	}

	return (
		<>
			<CssBaseline />
			<ReArrange
				open={reArrangeModal}
				loading={reArrangeLoading}
				header={
					<Box className="f f-c g2">
						<Typography color="#9a9cb0" fontWeight="500" fontSize="14px" lineHeight="20px">
							CME course gorup
						</Typography>
						<Typography color="#1b1c20" fontWeight="500" fontSize="14px" lineHeight="20px">
							{data.title}
						</Typography>
					</Box>
				}
				list={_.map(data.cmeCourses, (course) => ({ id: course.id, title: course.title }))}
				handleSubmit={handleReArrange}
				handleClose={() => setReArrangeModal(false)}
			/>
			<Delete
				title="Delete course?"
				open={dltModal}
				isSubmitting={dltLoading}
				handleClose={() => {
					setDltModal(false)
					setSelectedCourse(null)
				}}
				handleSubmit={handleDltFunc}
			/>
			<Box className="f f-c b-r16 g16" sx={{ border: "1px solid #EAEBF2", backgroundColor: "#FFF" }}>
				<Box
					className="f g12 justify-s-b"
					alignItems={{ xs: "start", sm: "center" }}
					padding={{ xs: "12px 16px", sm: "12px 24px" }}
					borderBottom="1px solid #EAEBF2"
				>
					<Typography
						color="#1B1C20"
						fontSize="14px"
						fontWeight="600"
						lineHeight="20px"
						textTransform="capitalize"
					>
						{data.title}
					</Typography>
					<IconButton
						sx={{ padding: "4px" }}
						onClick={(e) => {
							handleOpenMenu(e)
							setSelectedGroup(data)
						}}
					>
						<IoEllipsisVertical size="20px" color="#b1b3c4" />
					</IconButton>
				</Box>
				<Box className="f f-c g12" paddingBottom="20px">
					{data.cmeCourses.length !== 0 ? (
						_.map(data.cmeCourses, (cmeCourse, index) => (
							<Box
								onClick={() => navigate(`/dashboard/admin/cme-library/view/${data.id}/${cmeCourse.id}`)}
								className="f g24 align-start justify-s-b cursor-pointer"
								sx={{
									":hover": {
										backgroundColor: "#F9F9FB",
									},
								}}
								key={index}
								padding={{ xs: "10px 16px", sm: "10px 24px" }}
							>
								<Box className="f g16" maxWidth="600px">
									<Typography fontSize="24px" color="#814CD6" lineHeight="20px">
										{RESOURCE_FORMAT_LIST[cmeCourse.cmeCourseFormat]}
									</Typography>
									<Box className="f f-c g4">
										<Typography
											color="#1B1C20"
											fontSize="14px"
											fontWeight="500"
											lineHeight="20px"
											textTransform="capitalize"
										>
											{cmeCourse.title}
										</Typography>
										<Box className="f f-c g6">
											<Typography
												color="#9A9CB0"
												fontSize="14px"
												fontWeight="500"
												lineHeight="20px"
												textTransform="capitalize"
											>
												{cmeCourse.description}
											</Typography>
											<Box className="f g6">
												{_.map(cmeCourse.topics, (topic, index) => (
													<Typography
														key={index}
														className="f align-center justify-center b-r4"
														width="fit-content"
														padding="2px 10px"
														sx={{ backgroundColor: "#EAEBF2" }}
														color="#717385"
														fontSize="12px"
														fontWeight="500"
														lineHeight="18px"
														textTransform="capitalize"
													>
														{topic}
													</Typography>
												))}
											</Box>
										</Box>
									</Box>
								</Box>
								<Box className="f f-c justify-end g10">
									<Box className="f g8 justify-end" minWidth="fit-content">
										<IconButton
											sx={{ padding: "6px", zIndex: 999 }}
											onClick={(e) => {
												e.stopPropagation()
												navigate(`/dashboard/admin/cme-library/edit/${data.id}/${cmeCourse.id}`)
											}}
										>
											<FiEdit2 size="18px" color="#B1B3C4" />
										</IconButton>
										<IconButton
											sx={{ padding: "6px", zIndex: 999 }}
											onClick={(e) => {
												e.stopPropagation()
												setSelectedCourse(cmeCourse)
												setDltModal(true)
											}}
										>
											<FiTrash2 size="18px" color="#B1B3C4" />
										</IconButton>
									</Box>
									<Typography
										noWrap
										className="f align-center justify-center b-r4"
										width="fit-content"
										padding="4px 12px"
										sx={{ backgroundColor: "#FFF8EA" }}
										color="#E8930B"
										fontSize="12px"
										fontWeight="600"
										lineHeight="18px"
									>
										{cmeCourse.credits} Credit
									</Typography>
								</Box>
							</Box>
						))
					) : (
						<Typography
							className="f align-center justify-center w100 h100"
							fontWeight="500"
							fontSize="14px"
							lineHeight="20px"
							color="#b1b3c4"
							minHeight="80px"
						>
							No course available
						</Typography>
					)}
				</Box>
			</Box>
			<Menu
				id="menu-appbar"
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={Boolean(anchorEl)}
				onClose={handleCloseMenu}
				sx={{
					"& .MuiPaper-root": {
						width: "fit-content",
						padding: "0px 6px",
					},
				}}
			>
				<MenuItem
					component={Link}
					to={`/dashboard/admin/cme-library/add/${data.id}`}
					onClick={() => handleCloseMenu()}
				>
					<FiPlus size="16px" /> Add course
				</MenuItem>
				<MenuItem
					disabled={data.cmeCourses.length === 0}
					onClick={() => {
						setReArrangeModal(true)
						handleCloseMenu()
					}}
				>
					<FiShuffle size="16px" /> Re-arrange
				</MenuItem>
				<MenuItem
					onClick={() => {
						handleEdit(selectedGroup)
						handleCloseMenu()
					}}
				>
					<FiEdit2 size="16px" /> Edit
				</MenuItem>
				<MenuItem
					onClick={() => {
						handleDlt(selectedGroup)
						handleCloseMenu()
					}}
				>
					<FiTrash2 size="16px" />
					Delete
				</MenuItem>
			</Menu>
		</>
	)
}

export default Group
