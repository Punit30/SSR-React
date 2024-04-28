import { Box, IconButton, Typography } from "@mui/material"
import _ from "lodash"
import React, { useEffect, useRef, useState } from "react"
import { FiX } from "react-icons/fi"
import DragSVG from "../../../../../Constants/svgs/DragSVG"
import Button from "../../../../utilities/Button"
import CustomDialog from "../../../../utilities/Dialog"

function ReArrange({ list, open, handleClose, loading, title = "group", header = null, handleSubmit = () => {} }) {
	const [flow, setFlow] = useState(null)

	useEffect(() => {
		if (open) {
			setFlow(list)
		} else {
			setFlow(null)
		}
	}, [open])

	// save reference for drageditem and dragoveritem
	const dragItem = useRef(null)
	const dragOverItem = useRef(null)

	const handleSort = () => {
		// Create a deep copy of the flow array
		const updatedItems = _.cloneDeep(flow)

		const draggedItemContent = updatedItems[dragItem.current]

		// Remove the dragged item from its original position
		updatedItems.splice(dragItem.current, 1)

		// Insert the dragged item at the new position
		updatedItems.splice(dragOverItem.current, 0, draggedItemContent)

		// Update the state with the new order
		setFlow(updatedItems)

		// Reset the drag item references
		dragItem.current = null
		dragOverItem.current = null
	}

	return (
		<CustomDialog
			open={open}
			close={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			width="624px"
		>
			<Box className="f f-c">
				<Box className="f g12 align-center justify-s-b" padding="16px 24px" borderBottom="1px solid #E0E0E0">
					<Typography color="#343A40" fontSize="16px" fontWeight="500" lineHeight="24px">
						Re-arrange {title}
					</Typography>
					<IconButton onClick={handleClose} sx={{ padding: "4px" }}>
						<FiX size="24px" color="#6C757D" />
					</IconButton>
				</Box>
				<Box className="f f-c g16" padding="16px 0px">
					{header ? <Box padding="0px 24px">{header}</Box> : null}
					<Box
						className="f f-c g8 w100"
						padding="0px 24px"
						sx={{ overflowY: "auto" }}
						height="calc(var(--window-height) - 320px)"
					>
						{_.map(flow, (option, index) => (
							<Box
								className="f b-r8 p12 g8 align-center"
								border="1px solid #d9dae6"
								sx={{
									cursor: "move",
									transform: "translate(0px, 0px)",
									backgroundColor: dragItem.current === index ? "red" : "#fff",
								}}
								key={index}
								draggable
								onDragStart={() => (dragItem.current = index)}
								onDragEnter={() => (dragOverItem.current = index)}
								onDragEnd={handleSort}
								onDragOver={(e) => e.preventDefault()}
							>
								<DragSVG color="#B1B3C4" />
								<Typography fontWeight="500" fontSize="14px" lineHeight="20px" color="#717385">
									{option.title}
								</Typography>
							</Box>
						))}
					</Box>
				</Box>
				<Box className="w100 f g12 align-center justify-end" padding="16px 24px" borderTop="1px solid #E0E0E0">
					<Button type="reset" variant="outlined" color="purple" onClick={handleClose}>
						Cancel
					</Button>
					<Button
						type="submit"
						variant="contained"
						onClick={() => handleSubmit(flow)}
						color="purple"
						disabled={loading}
					>
						{loading ? "Please wait..." : "Re-arrange"}
					</Button>
				</Box>
			</Box>
		</CustomDialog>
	)
}

export default ReArrange
