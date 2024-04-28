import { Box, CssBaseline } from "@mui/material"
import React, { useEffect } from "react"
import NotesAccordion from "../Notes"
import { useParams } from "react-router-dom"
import QuizDetails from "./QuizDetails"
import EditStatus from "./EditStatus"

function EditProviderStatus() {
	const params = useParams()

	return (
		<Box className="f f-c g20">
			<CssBaseline />
			<NotesAccordion id={params.id} />
			<QuizDetails id={params.id} />
			<EditStatus id={params.id} />
		</Box>
	)
}

export default EditProviderStatus
