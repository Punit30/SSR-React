import { useMutation } from "@apollo/client"
import { Box, CssBaseline, IconButton } from "@mui/material"
import _ from "lodash"
import { useSnackbar } from "notistack"
import React, { useState } from "react"
import { FiEdit2, FiTrash2 } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { TrackForm } from "../../../../app/GlobalObjects/store/actions/TrackForm"
import Delete from "../../../common/Modals/Delete"
import { dltProviderMutation } from "../../../../gql/mutations/Providers/ForAdmin"

function ActionBtn(props) {
	const navigate = useNavigate()
	const { enqueueSnackbar } = useSnackbar()

	const [deleteModal, setDeleteModal] = useState(false)
	const [selectedProviderId, setSelectedProviderId] = useState(null)

	const [DeleteUser, { loading }] = useMutation(dltProviderMutation)

	const handleEdit = () => {
		navigate(`/dashboard/admin/providers/status/${props.data.id}`)
	}

	const handleDelete = () => {
		setSelectedProviderId(props.data.id)
		setDeleteModal(true)
	}

	const handleDltFunc = async () => {
		try {
			await DeleteUser({ variables: { id: Number(selectedProviderId) } })
			setSelectedProviderId(null)
			props.refreshProviderData()
			enqueueSnackbar("Provider deleted successfully", { variant: "mui-alert", color: "success" })
			TrackForm({ formId: "provider_delete", variant: "success" })
		} catch (e) {
			TrackForm({ formId: "provider_delete", variant: "danger" })
			_.forEach(_.get(e, "graphQLErrors", []), ({ message }) =>
				enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
			)
		}
	}

	return (
		<>
			<CssBaseline />
			<Delete
				title="Delete provider?"
				open={deleteModal}
				isSubmitting={loading}
				handleClose={() => setDeleteModal(false)}
				handleSubmit={handleDltFunc}
			/>
			<Box className="f g4">
				<IconButton sx={{ padding: "6px" }} onClick={handleEdit}>
					<FiEdit2 size="20px" color="#717385" />
				</IconButton>
				<IconButton sx={{ padding: "6px" }} onClick={handleDelete}>
					<FiTrash2 size="20px" color="#717385" />
				</IconButton>
			</Box>
		</>
	)
}

export default ActionBtn
