import { useMutation } from "@apollo/client"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { providerInterviewDetailMutation } from "../../../gql/mutations/Providers/ForProvider"
import logo from "../../../assets/imgs/logo-black.png"
import HelpModalButton from "../../common/HelpModalButton"
import { Box, Typography } from "@mui/material"
import { useSnackbar } from "notistack"

function InterviewRedirect({ providerId }) {
	const navigate = useNavigate()
	const { enqueueSnackbar } = useSnackbar()
	const [searchParams] = useSearchParams()
	const [InterviewDetail, { loading }] = useMutation(providerInterviewDetailMutation)

	useEffect(() => {
		setTimeout(() => processExecution(), 500)
	}, [])

	const processExecution = async () => {
		if (searchParams.has("event_type_uuid")) {
			const event_type_uuid = searchParams.get("event_type_uuid")
			const event_start_time = searchParams.get("event_start_time")
			const event_end_time = searchParams.get("event_end_time")
			const invitee_uuid = searchParams.get("invitee_uuid")
			const invitee_email = searchParams.get("invitee_email")

			if (providerId) {
				const startTime = new Date(event_start_time)
				const endTime = new Date(event_end_time)
				const payload = {
					providerId,
					eventId: event_type_uuid,
					startTime: `${startTime.toISOString().slice(0, 16).replace("T", " ")}`,
					endTime: `${endTime.toISOString().slice(0, 16).replace("T", " ")}`,
					inviteeId: invitee_uuid,
					inviteeEmail: invitee_email,
				}

				try {
					await InterviewDetail({ variables: payload })

					navigate("/provider/vetting/interview-status")
				} catch (e) {
					_.get(e, "graphQLErrors", []).forEach(({ message }) =>
						enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
					)
				}
			}
		}
	}

	return (
		<Box className="f f-c h100" flex={2}>
			<Box className="f g24 align-center justify-s-b" padding={{ xs: "24px 16px", sm: "24px 24px" }}>
				<Box width="174px" height="30px">
					<Link to="/" style={{ textDecoration: "none" }}>
						<img src={logo} width="100%" height="100%" />
					</Link>
				</Box>
				<HelpModalButton />
			</Box>
			<Box className="f f-c align-center justify-center w100" height="calc(var(--window-height) - 80px)">
				<Box className="f align-center">
					<Typography fontSize="16px" lineHeight="24px" fontWeight="600" color="#1b1c20">
						Processing
					</Typography>
					<Box className="dot-flashing" />
				</Box>
				<Typography fontSize="16px" fontWeight="400" lineHeight="24px" color="#b1b3c4">
					Please don't close the window
				</Typography>
			</Box>
		</Box>
	)
}

const mapStateToProps = (state) => ({
	providerId: state.session.layoutReducer.providerSignUp.providerId || state.local.providerReducer.providerId,
})

export default connect(mapStateToProps)(InterviewRedirect)
