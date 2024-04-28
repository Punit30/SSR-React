import { Box, Checkbox, CssBaseline, IconButton, Typography } from "@mui/material"
import React from "react"
import CustomDialog from "../../../../utilities/Dialog"
import { FiX } from "react-icons/fi"
import InputLabelContainer from "../../../../utilities/InputLabelContainer"
import _ from "lodash"
import Button from "../../../../utilities/Button"

function MoreFilters({
	open,
	handleClose,
	language,
	setLanguage = () => {},
	langData = [],
	isLGBTQIA,
	setIsLGBTQIA = () => {},
	isTrans,
	setIsTrans = () => {},
	patientGroup,
	setPatientGroup = () => {},
	pGData = [],
	handleSubmit = () => {},
}) {
	const CheckboxGrid = ({ state, setState, data }) => (
		<Box className="f g12 justify-s-b" maxWidth="540px">
			{_.chunk(data, Math.ceil(data.length / 2)).map((chunk, index) => (
				<Box className="f f-c g4 w100" key={index}>
					{_.map(chunk, (chunkItem, idx) => (
						<Box className="f align-center g6" key={idx}>
							<Checkbox
								value={chunkItem}
								checked={state.includes(chunkItem)}
								onChange={() => setState(_.xor(state, [chunkItem]))}
							/>
							<Typography color="#1B1C20" fontSize="14px" fontWeight="400" lineHeight="20px">
								{chunkItem}
							</Typography>
						</Box>
					))}
				</Box>
			))}
		</Box>
	)

	return (
		<CustomDialog
			open={open}
			close={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			width="854px"
		>
			<CssBaseline />
			<Box className="f f-c">
				<Box className="f g12 align-center justify-s-b" padding="16px 24px" borderBottom="1px solid #E0E0E0">
					<Typography color="#343A40" fontSize="16px" fontWeight="500" lineHeight="24px">
						More filters
					</Typography>
					<IconButton
						id="find_a_provider_filter_modal_close_icon"
						className="track_button"
						onClick={handleClose}
						sx={{ padding: "4px" }}
					>
						<FiX size="24px" color="#6C757D" />
					</IconButton>
				</Box>
				<Box
					className="f f-c g24"
					sx={{ overflowY: "auto" }}
					height="calc(var(--window-height) - 360px)"
					padding="16px 24px"
				>
					<InputLabelContainer label="Languages">
						<CheckboxGrid data={langData} state={language} setState={setLanguage} />
					</InputLabelContainer>
					<InputLabelContainer label="Only show LGBTQIA+ providers?">
						<Box className="f align-center g6">
							<Checkbox value={isLGBTQIA} checked={isLGBTQIA} onChange={() => setIsLGBTQIA(!isLGBTQIA)} />
							<Typography color="#1B1C20" fontSize="14px" fontWeight="400" lineHeight="20px">
								Yes
							</Typography>
						</Box>
					</InputLabelContainer>
					<InputLabelContainer label="Only show transgender providers?">
						<Box className="f align-center g6">
							<Checkbox value={isTrans} checked={isTrans} onChange={() => setIsTrans(!isTrans)} />
							<Typography color="#1B1C20" fontSize="14px" fontWeight="400" lineHeight="20px">
								Yes
							</Typography>
						</Box>
					</InputLabelContainer>
					<InputLabelContainer label="Patient group focus">
						<CheckboxGrid data={pGData} state={patientGroup} setState={setPatientGroup} />
					</InputLabelContainer>
				</Box>
				<Box className="w100 f g12 align-center justify-end" padding="16px 24px" borderTop="1px solid #E0E0E0">
					<Button
						id="filter_modal_discard"
						className="track_button"
						type="reset"
						variant="outlined"
						color="purple"
						onClick={handleClose}
					>
						Discard
					</Button>
					<Button
						id="filter_modal_apply_filter"
						className="track_button"
						type="submit"
						variant="contained"
						color="purple"
						onClick={handleSubmit}
					>
						Apply filter
					</Button>
				</Box>
			</Box>
		</CustomDialog>
	)
}

export default MoreFilters
