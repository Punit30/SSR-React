import { Box, IconButton, Slider, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import Cropper from "react-easy-crop"
import { IoCloseOutline } from "react-icons/io5"
import Button from "./Button"
import CustomDialog from "./Dialog"

function ImageCropper({ open, image, onCropDone, onCropCancel }) {
	const [crop, setCrop] = useState({ x: 0, y: 0 })
	const [zoom, setZoom] = useState(1)
	const [croppedArea, setCroppedArea] = useState(null)

	const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
		setCroppedArea(croppedAreaPixels)
	}

	useEffect(() => {
		if (open) {
			setCrop({ x: 0, y: 0 })
			setZoom(1)
		}
	}, [open])

	return (
		<CustomDialog
			open={open}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			width="400px"
		>
			<Box className="modal-container f f-r g8 justify-s-b align-center" padding="12px">
				<Typography color="#071427" lineHeight="normal" fontWeight={500} fontSize="16px">
					Edit image
				</Typography>
				<IconButton className="modal-container__close-button" onClick={onCropCancel}>
					<IoCloseOutline />
				</IconButton>
			</Box>
			<Box
				className="f f-c g40 justify-s-b"
				sx={{
					height: "400px",
					width: "400px",
					position: "relative",
				}}
			>
				<Cropper
					maxZoom={20}
					image={image}
					aspect={1}
					crop={crop}
					zoom={zoom}
					zoomWithScroll
					showGrid
					restrictPosition
					onCropChange={setCrop}
					onZoomChange={setZoom}
					onCropComplete={onCropComplete}
					objectFit="cover"
					style={{
						containerStyle: {
							width: "400px",
							height: "400px",
							background: "black",
						},
					}}
				/>
			</Box>
			<Box className="f f-c g8" sx={{ padding: "18px 24px", borderTop: "1px solid #eaebf2" }}>
				<Slider
					aria-label="time-indicator"
					size="small"
					value={zoom}
					min={1}
					max={20}
					onChange={(_, value) => setZoom(value)}
				/>
				<Box className="f f-r g8 justify-s-b align-center">
					<Button variant="outlined" color="gray" type="button" onClick={onCropCancel} fullWidth>
						Cancel
					</Button>
					<Button
						variant="contained"
						color="purple"
						type="submit"
						onClick={() => onCropDone(croppedArea)}
						fullWidth
					>
						Upload
					</Button>
				</Box>
			</Box>
		</CustomDialog>
	)
}

export default ImageCropper
