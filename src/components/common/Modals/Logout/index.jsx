"use client"
import { Box, CssBaseline, Typography } from "@mui/material"
import { FiLogOut } from "react-icons/fi"
import { connect, useDispatch } from "react-redux"
import { removeAuth } from "../../../../app/GlobalObjects/store/reducers/Auth"
import { resetData } from "../../../../app/GlobalObjects/store/reducers/Data"
import { setLogoutModal } from "../../../../app/GlobalObjects/store/reducers/Modal"
import { resetUser } from "../../../../app/GlobalObjects/store/reducers/User"
import Button from "../../../utilities/Button"
import CustomDialog from "../../../utilities/Dialog"
import IconFrame from "../../../utilities/IconFrame"
import { useRouter } from "next/navigation"

function LogoutModal(props) {
	const dispatch = useDispatch()
	const navigate = useRouter()

	const handleClose = () => {
		dispatch(setLogoutModal(false))
	}

	const handleLogout = () => {
		dispatch(removeAuth())
		dispatch(resetUser())
		dispatch(resetData())
		handleClose()
		navigate.push("/")
	}

	return (
		<CustomDialog
			open={props.open}
			close={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			width="432px"
		>
			<CssBaseline />
			<Box className="f f-c g32 align-center" padding="24px">
				<Box className="f f-c g16 align-center">
					<IconFrame
						icon={<FiLogOut />}
						iconColor="#ef4444"
						iconSize="24px"
						backgroundColor="#fee4e2"
						boxSize="48px"
					/>
					<Box className="f f-c align-center g8">
						<Typography color="#253010" fontSize="18px" fontWeight="600" lineHeight="26px">
							Logout?
						</Typography>
						<Typography
							color="#596088"
							textAlign="center"
							fontSize="14px"
							fontWeight="400"
							lineHeight="20px"
						>
							Are you sure you want to logout?
						</Typography>
					</Box>
				</Box>
				<Box className="w100 f g12 align-center justify-s-b">
					<Button
						id="logout_modal_cancel_button"
						className="track_button"
						fullWidth
						variant="contained"
						color="danger"
						onClick={handleClose}
					>
						Cancel
					</Button>
					<Button
						id="logout_modal_yes_button"
						className="track_button"
						fullWidth
						variant="outlined"
						color="gray"
						onClick={handleLogout}
					>
						Logout
					</Button>
				</Box>
			</Box>
		</CustomDialog>
	)
}

const mapStateToProps = (state) => ({
	open: state.modalReducer.logout,
})

export default connect(mapStateToProps)(LogoutModal)
