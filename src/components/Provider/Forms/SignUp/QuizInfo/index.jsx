import { useMutation } from "@apollo/client"
import { Box, Typography } from "@mui/material"
import { enqueueSnackbar } from "notistack"
import React, { useEffect, useState } from "react"
import { HiLightBulb } from "react-icons/hi2"
import { connect, useDispatch } from "react-redux"
import { getQuizMutation, startQuizMutation } from "../../../../../gql/mutations/Quiz"
import { resetLayout } from "../../../../../app/GlobalObjects/store/reducers/Layout"
import { setQuiz } from "../../../../../app/GlobalObjects/store/reducers/provider/Quiz"
import HelpModalButton from "../../../../common/HelpModalButton"
import Button from "../../../../utilities/Button"
import IconFrame from "../../../../utilities/IconFrame"
import { useNavigate } from "react-router-dom"
import _ from "lodash"
import { setHelpModal } from "../../../../../app/GlobalObjects/store/reducers/Modal"
import Loading from "./loading/Loading"

function QuizInfo(props) {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [quizId, setQuizId] = useState(null)

	const [GetQuiz, { loading: gQLoading }] = useMutation(getQuizMutation)
	const [StartQuiz, { loading: sQLoading }] = useMutation(startQuizMutation)

	useEffect(() => {
		getData()
	}, [])

	const getData = async () => {
		try {
			const res = await GetQuiz({
				variables: { providerId: props.providerId },
			})

			const data = res.data.getQuiz
			const quizState = {
				quizId: data.id,
				totalQuestions: data.questions.length,
				questions: data.questions,
				startTime: data.startTime,
				endTime: data.endTime,
			}

			setQuizId(data.id)
			dispatch(setQuiz(quizState))
		} catch (e) {
			_.forEach(e.graphQLErrors, ({ message }) => {
				const errorMessage =
					message === "Your last quiz attempt has expired. Please reach out to Admin for any further queries."
						? "Your last quiz attempt has expired."
						: "We are facing some issues. Please try again after some time."
				const helpLink =
					message === "Your last quiz attempt has expired. Please reach out to Admin for any further queries."
						? () => dispatch(setHelpModal({ modalOpen: true }))
						: () => navigate("/contact-us")
				const linkText =
					message === "Your last quiz attempt has expired. Please reach out to Admin for any further queries."
						? "Help"
						: "Contact us"
				const colorThemeBool =
					message === "Your last quiz attempt has expired. Please reach out to Admin for any further queries."

				enqueueSnackbar(
					<Box className="f f-c">
						<Typography fontSize="16px" fontWeight="500" lineHeight="22px">
							{errorMessage}
						</Typography>
						<Box display="inline">
							<Typography
								display="inline"
								fontWeight="500"
								fontSize="14px"
								lineHeight="20px"
								color={colorThemeBool ? "#92400E" : "#9B0E1C"}
							>
								If you need any help reach out to us.
							</Typography>{" "}
							<Typography
								onClick={helpLink}
								display="inline"
								fontWeight="500"
								fontSize="14px"
								lineHeight="20px"
								sx={{ cursor: "pointer", textDecoration: "underline" }}
								color={colorThemeBool ? "#92400E" : "#9B0E1C"}
							>
								{linkText}
							</Typography>
						</Box>
					</Box>,
					{
						variant: "mui-alert",
						color: colorThemeBool ? "warning" : "error",
					}
				)

				if (
					!props.isParentVettedProvider &&
					message === "Your last quiz attempt has expired. Please reach out to Admin for any further queries."
				) {
					dispatch(resetLayout())
				}
			})
		}
	}

	const handleStartQuiz = async () => {
		if (_.isNil(quizId)) {
			enqueueSnackbar(
				<Box className="f f-c">
					<Typography fontSize="16px" fontWeight="500" lineHeight="22px">
						We are facing some issues. Please try again after some time.
					</Typography>
					<Box display="inline">
						<Typography display="inline" fontWeight="500" fontSize="14px" lineHeight="20px" color="#9B0E1C">
							Click here to refresh page.
						</Typography>{" "}
						<Typography
							onClick={() => navigate(0)}
							display="inline"
							fontWeight="500"
							fontSize="14px"
							lineHeight="20px"
							sx={{ cursor: "pointer", textDecoration: "underline" }}
							color="#9B0E1C"
						>
							Refresh page
						</Typography>
					</Box>
				</Box>,
				{
					variant: "mui-alert",
					color: "error",
				}
			)
			return
		}

		if (_.isNull(props.startTime)) {
			try {
				await StartQuiz({
					variables: { quizId },
				})

				dispatch(
					setQuiz({
						currentQuestion: 0,
						optionSelected: [],
						startTime: new Date().toUTCString(),
					})
				)

				const destination = props.isParentVettedProvider ? "/provider/vetting/quiz" : "/signup/provider/quiz"
				navigate(destination)
			} catch (e) {
				_.forEach(e.graphQLErrors, ({ message }) =>
					enqueueSnackbar(message, {
						variant: "mui-alert",
						color: "error",
					})
				)
				dispatch(resetLayout())
				navigate("/login")
			}
		} else {
			const destination = props.isParentVettedProvider ? "/provider/vetting/quiz" : "/signup/provider/quiz"
			navigate(destination)
		}
	}

	return (
		<Box className="f f-c g24 justify-s-b h100">
			<Box className="f f-c" gap={{ xs: "32px", md: "48px" }}>
				<Box className="f f-c g8">
					<Typography
						color="#1B1C20"
						fontFamily="Poppins"
						fontSize={{ xs: "24px", md: "32px" }}
						fontWeight="600"
						lineHeight={{ xs: "33px", md: "44px" }}
					>
						Let's get started
					</Typography>
					<Typography color="#717385" fontSize="16px" fontWeight="400" lineHeight="26px" maxWidth="598px">
						We optimize your time by recommending CMEs that fill your specific knowledge gaps on LGBTQIA+
						care. The results from the assessment will guide your CME recommendations.
					</Typography>
				</Box>
				{gQLoading ? (
					<Loading />
				) : (
					<Box className="f f-c g32" maxWidth="512px">
						<Box className="f f-c g12">
							<Box className="f align-center g12">
								<IconFrame
									icon={<HiLightBulb />}
									iconColor="#814CD6"
									iconSize="24px"
									backgroundColor="#F2EDFC"
									boxSize="44px"
								/>
								<Typography
									color="#1B1C20"
									fontFamily="Poppins"
									fontSize="18px"
									fontWeight="600"
									lineHeight="24px"
								>
									Baseline assessment
								</Typography>
							</Box>
							<Typography color="#717385" fontSize="16px" fontWeight="400" lineHeight="24px">
								The assessment should take 15 minutes to complete, but you will have 45 minutes before
								the platform times out.
							</Typography>
						</Box>
						<Button
							id="take_the_assessment"
							className="track_button"
							type="button"
							variant="contained"
							color="purple"
							onClick={() => handleStartQuiz()}
							disabled={sQLoading}
						>
							{sQLoading ? "Please wait" : "Take the assessment"}
						</Button>
					</Box>
				)}
			</Box>
			<Box className="justify-end" paddingBottom="24px" display={{ xs: "none", md: "flex" }}>
				<HelpModalButton />
			</Box>
		</Box>
	)
}

const mapStateToProps = (state) => ({
	startTime: state.session.quizReducer.startTime,
	step: state.session.layoutReducer.providerSignUp.step,
	id: state.session.layoutReducer.providerSignUp.providerId,
	providerId: state.session.layoutReducer.providerSignUp.providerId || state.local.providerReducer.providerId,
})

export default connect(mapStateToProps)(QuizInfo)
