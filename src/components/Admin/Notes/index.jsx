import { useLazyQuery, useMutation } from "@apollo/client"
import {
	Accordion,
	AccordionActions,
	AccordionDetails,
	AccordionSummary,
	Box,
	CssBaseline,
	Divider,
	IconButton,
	Skeleton,
	Typography,
} from "@mui/material"
import _ from "lodash"
import { useSnackbar } from "notistack"
import React, { useEffect, useState } from "react"
import { FiChevronDown, FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi"
import { dltNoteMutation } from "../../../gql/mutations/Notes"
import { getAllNotesByUserIdQuery } from "../../../gql/queries/Notes"
import Delete from "../../common/Modals/Delete"
import Button from "../../utilities/Button"
import AddEdit from "./Modals/AddEdit"
import moment from "moment"

function NotesAccordion({ id }) {
	const { enqueueSnackbar } = useSnackbar()

	const [notes, setNotes] = useState([])
	const [selectedNote, setSelectedNote] = useState(null)
	const [addEditModal, setAddEditModal] = useState(false)
	const [dltModal, setDltModal] = useState(false)

	const [GetNotes, { loading }] = useLazyQuery(getAllNotesByUserIdQuery, {
		variables: { userId: id },
		fetchPolicy: "network-only",
	})

	const [DltNote, { loading: dltLoading }] = useMutation(dltNoteMutation)

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		try {
			const res = await GetNotes()
			setNotes(res.data.getAllNotesByUserId)
		} catch (e) {
			_.forEach(_.get(e, "graphQLErrors", []), ({ message }) =>
				enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
			)
		}
	}

	const AddNoteButton = () => (
		<Button
			variant="contained"
			color="purple"
			sx={{ padding: "10px 16px", fontSize: "14px", gap: "6px", lineHeight: 1.5 }}
			onClick={() => setAddEditModal(true)}
		>
			<FiPlus /> Add note
		</Button>
	)

	const handleDltFunc = async () => {
		try {
			await DltNote({ variables: { notesId: selectedNote.id } })
			fetchData()
			setSelectedNote(null)
			setDltModal(false)
			enqueueSnackbar("Note deleted successfully.", { variant: "mui-alert", color: "success" })
			TrackForm({ formId: "note_delete", variant: "success" })
		} catch (e) {
			TrackForm({ formId: "note_delete", variant: "danger" })
			_.forEach(_.get(e, "graphQLErrors", []), ({ message }) =>
				enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
			)
		}
	}

	return (
		<>
			<CssBaseline />
			<AddEdit
				providerId={id}
				open={addEditModal}
				selectedNote={selectedNote}
				handleClose={() => {
					setAddEditModal(false)
					setSelectedNote(null)
				}}
				refreshData={fetchData}
				isEdit={selectedNote !== null}
			/>
			<Delete
				title="Delete note?"
				open={dltModal}
				isSubmitting={dltLoading}
				handleClose={() => setDltModal(false)}
				handleSubmit={handleDltFunc}
			/>
			<Box>
				<Accordion>
					<AccordionSummary expandIcon={<FiChevronDown />} aria-controls="panel1-content" id="panel1-header">
						Notes
					</AccordionSummary>
					<Divider />
					<AccordionDetails>
						<Box className="f f-c" minHeight="280px" height="280px" sx={{ overflowY: "auto" }}>
							{loading ? (
								_.times(10, (index) => (
									<Box className="p16" borderBottom="1px solid #EAEBF2" key={index}>
										<Skeleton height="80px" sx={{ minHeight: "80px" }} />
									</Box>
								))
							) : notes.length !== 0 ? (
								_.map(notes, (note, index) => (
									<Box className="f f-c g8 p16" borderBottom="1px solid #EAEBF2" key={index}>
										<Box className="f g12 align-start justify-s-b">
											<Box className="f f-c">
												<Box className="f flex-wrap g6">
													{note.noteCreatedBy.firstName ? (
														<Typography
															color="#814CD6"
															fontSize="14px"
															fontWeight="500"
															lineHeight="20px"
															textTransform="capitalize"
														>
															{note.noteCreatedBy.firstName} {note.noteCreatedBy.lastName}{" "}
															-
														</Typography>
													) : null}
													<Typography
														color="#814CD6"
														fontSize="14px"
														fontWeight="500"
														lineHeight="20px"
													>
														{note.noteCreatedBy.email}
													</Typography>
												</Box>
												<Box className="f f-c flex-wrap">
													<Box className="f g6 align-center">
														<Typography
															fontWeight="600"
															fontSize="12px"
															lineHeight="18px"
															color="#9a9cb0"
														>
															Last modified:
														</Typography>
														<Typography
															fontWeight="400"
															fontSize="12px"
															lineHeight="18px"
															color="#9a9cb0"
														>
															{moment
																.utc(note.lastModifiedDate)
																.local()
																.format("DD/MM/YY hh:mm a")}
														</Typography>
													</Box>
													<Box className="f g6 align-center">
														<Typography
															fontWeight="600"
															fontSize="12px"
															lineHeight="18px"
															color="#9a9cb0"
														>
															Created on:
														</Typography>
														<Typography
															fontWeight="400"
															fontSize="12px"
															lineHeight="18px"
															color="#9a9cb0"
														>
															{moment
																.utc(note.creationDate)
																.local()
																.format("DD/MM/YY hh:mm a")}
														</Typography>
													</Box>
												</Box>
											</Box>
											<Box className="f g8 justify-end" minWidth="fit-content">
												<IconButton
													sx={{ padding: "6px" }}
													onClick={() => {
														setSelectedNote(note)
														setAddEditModal(true)
													}}
												>
													<FiEdit2 size="18px" color="#B1B3C4" />
												</IconButton>
												<IconButton
													sx={{ padding: "6px" }}
													onClick={() => {
														setSelectedNote(note)
														setDltModal(true)
													}}
												>
													<FiTrash2 size="18px" color="#B1B3C4" />
												</IconButton>
											</Box>
										</Box>
										<Typography color="#9A9CB0" fontSize="14px" fontWeight="400" lineHeight="20px">
											{note.remarks}
										</Typography>
									</Box>
								))
							) : (
								<Box className="f f-c g8 align-center justify-center w100 h100">
									<Typography fontWeight="500" fontSize="14px" lineHeight="20px" color="#b1b3c4">
										No notes available
									</Typography>
									<AddNoteButton />
								</Box>
							)}
						</Box>
					</AccordionDetails>
					{!loading && notes.length !== 0 ? (
						<>
							<Divider />
							<AccordionActions>
								<AddNoteButton />
							</AccordionActions>
						</>
					) : null}
				</Accordion>
			</Box>
		</>
	)
}

export default NotesAccordion
