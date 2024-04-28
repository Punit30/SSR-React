import { useMutation } from "@apollo/client"
import { useTheme } from "@emotion/react"
import { Box, CssBaseline, IconButton, Tooltip, Typography, useMediaQuery } from "@mui/material"
import _ from "lodash"
import { useSnackbar } from "notistack"
import React, { useEffect, useState } from "react"
import { FiArrowRight, FiClock, FiX } from "react-icons/fi"
import { connect, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { closeQuizMutation, submitQuizAnswer } from "../../../../gql/mutations/Quiz"
import { TrackForm } from "../../../../app/GlobalObjects/store/actions/TrackForm"
import { setQuiz } from "../../../../app/GlobalObjects/store/reducers/provider/Quiz"
import HelpModalButton from "../../../common/HelpModalButton"
import Button from "../../../utilities/Button"
import Stepper from "../../../utilities/Stepper"
import { default as CloseQuizModal } from "./Modals/CloseQuiz"
import SubmitQuiz from "./Modals/SubmitQuiz"

function Quiz(props) {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { enqueueSnackbar } = useSnackbar()
	const theme = useTheme()
	const isSM = useMediaQuery(theme.breakpoints.up("sm"))

	const [optionsSelected, setOptionsSelected] = useState([])
	const [submitQuizModal, setSubmitQuizModal] = useState(false)
	const [quitQuizModal, setQuitQuizModal] = useState(false)
	const [timeLeft, setTimeLeft] = useState(45 * 60) // Total time in seconds
	const [timerActive, setTimerActive] = useState(true)
	const [quizClosing, setQuizClosing] = useState(false)

	const [SubmitResponse, { loading: sRLoading }] = useMutation(submitQuizAnswer)
	const [CloseQuiz] = useMutation(closeQuizMutation)

	const intToChar = (int) => {
		const code = "A".charCodeAt(0)
		return String.fromCharCode(code + int)
	}

	useEffect(() => {
		const interval = setInterval(() => {
			if (timeLeft > 0 && timerActive) {
				setTimeLeft((prevTime) => prevTime - 1)
			} else {
				handleQuizSubmit()
				setTimerActive(false)
				clearInterval(interval)
			}
		}, 1000)

		return () => clearInterval(interval)
	}, [timeLeft, timerActive])

	useEffect(() => {
		if (props.startTime) {
			const currentTime = Math.floor(new Date().getTime() / 1000)
			const elapsedTime = currentTime - Math.floor(new Date(props.startTime).getTime() / 1000)
			setTimeLeft((prevTime) => prevTime - elapsedTime)
		}
	}, [props.startTime])

	const handleQuizSubmit = async () => {
		setQuizClosing(true)
		let res = false

		if (optionsSelected.length !== 0) {
			res = await handleResponseSubmit()
		}

		try {
			if (res || quitQuizModal || timeLeft <= 0) {
				const timestamp = new Date().toISOString()
				await CloseQuiz({
					variables: { quizId: props.quizId, endTime: timestamp },
				})

				const destination = props.isParentVettedProvider
					? "/provider/vetting/quiz/complete"
					: "/signup/provider/quiz/complete"
				navigate(destination)

				TrackForm({ formId: "quiz_submit", variant: "success" })
				setQuizClosing(false)
				return true
			}
		} catch (e) {
			enqueueSnackbar("Submission failed. Please try again.", { variant: "mui-alert", color: "error" })
		}

		enqueueSnackbar("Submission failed. Please try again.", { variant: "mui-alert", color: "error" })
		TrackForm({ formId: "quiz_submit", variant: "danger" })
		setQuizClosing(false)
		return false
	}

	const handleOnClick = async () => {
		if (props.totalQuestions !== props.currentQuestion + 1) {
			const res = await handleResponseSubmit()
			if (res) {
				dispatch(
					setQuiz({
						currentQuestion: props.currentQuestion + 1,
						optionSelected: [
							...props.optionSelected,
							{
								questionId: props.questions[props.currentQuestion]["id"],
								optionId: optionsSelected,
							},
						],
					})
				)
				setOptionsSelected([])
			}
		} else {
			setSubmitQuizModal(true)
		}
	}

	const handleResponseSubmit = async () => {
		try {
			const { quizId, questions, currentQuestion } = props
			const submitQuizPayload = {
				quizId,
				questionId: questions[currentQuestion].id,
				question: questions[currentQuestion].question,
				optionId: optionsSelected,
			}

			const res = await SubmitResponse({
				variables: submitQuizPayload,
			})

			if (!res.errors) {
				TrackForm({ formId: "quiz_question_submit", variant: "success" })
				return true
			}
		} catch (e) {
			console.warn(e)
		}
		TrackForm({ formId: "quiz_question_submit", variant: "danger" })
		return false
	}

	const minutes = Math.floor(timeLeft / 60)
	const seconds = timeLeft % 60

	const handleEvent = (event) => {
		event.preventDefault()

		switch (event.type) {
			case "keydown":
				if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) {
					event.preventDefault()
					enqueueSnackbar("This action is prevented.", { variant: "mui-alert", color: "error" })
				}
				break
			case "contextmenu":
				event.preventDefault()
				enqueueSnackbar("This action is prevented.", { variant: "mui-alert", color: "error" })
				break
			default:
				break
		}
	}

	return (
		<>
			<CloseQuizModal
				open={quitQuizModal}
				handleClose={() => setQuitQuizModal(false)}
				isSubmitting={quizClosing}
				handleSubmit={handleQuizSubmit}
			/>
			<SubmitQuiz
				open={submitQuizModal}
				handleClose={() => setSubmitQuizModal(false)}
				isSubmitting={quizClosing}
				handleSubmit={handleQuizSubmit}
			/>
			<CssBaseline />
			<Box
				overflow="auto"
				className="f f-c h100"
				gap={{ xs: "16px", sm: "24px" }}
				padding={{ xs: "0px 16px", sm: "0px 24px", md: "60px 54px 20px" }}
				tabIndex="0"
				onKeyDown={handleEvent}
				onContextMenu={handleEvent}
			>
				<Box className="f align-start g32 justify-s-b w100">
					<Box className="f f-c w100" gap={{ xs: "8px", sm: "24px" }} paddingTop="13px">
						<Stepper steps={props.totalQuestions} color="#814CD6" currentStep={props.currentQuestion + 1} />
						<Box className="f align-center justify-s-b g12">
							<Typography color="#814CD6" fontSize="16px" fontWeight="500" lineHeight="26px">
								Question {props.currentQuestion + 1} of {props.totalQuestions}
							</Typography>
							<Box
								className="f align-center g8 b-r8"
								padding="6px 12px"
								sx={{ backgroundColor: "#F2EDFC" }}
							>
								<FiClock size="16px" color="#814CD6" />
								<Typography
									color="#814CD6"
									fontSize="14px"
									fontWeight="500"
									lineHeight="20px"
									minWidth="44px"
								>
									{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}
								</Typography>
							</Box>
						</Box>
					</Box>
					<Tooltip title="Close quiz">
						<IconButton sx={{ padding: "4px" }} onClick={() => setQuitQuizModal(true)}>
							<FiX size="24px" color="#9A9CB0" />
						</IconButton>
					</Tooltip>
				</Box>
				<Box className="f f-c g12 justify-s-b h100">
					<Box className="f f-c" gap={{ xs: "24px", md: "32px" }} maxWidth="636px">
						<Typography color="#1B1C20" fontSize="16px" fontWeight="400" lineHeight="24px">
							{props.questions[props.currentQuestion].question}
						</Typography>
						<Box className="f f-c" gap={{ xs: "12px", md: "16px" }}>
							<Typography color="#1B1C20" fontSize="14px" fontWeight="500" lineHeight="20px">
								{props.questions[props.currentQuestion].isMultiChoice
									? "Please select all options that apply."
									: "Please select any one option."}
							</Typography>
							<Box className="f f-c" gap={{ xs: "16px", md: "24px" }}>
								{_.map(props.questions[props.currentQuestion].options, (option, index) => {
									const selected = optionsSelected.includes(option.id)
									return (
										<Box
											key={index}
											className="f g12 cursor-pointer"
											onClick={() => {
												const currentItem = props.questions[props.currentQuestion]
												const optionId = option.id
												const isMultiChoice = _.get(currentItem, "isMultiChoice", false)

												if (isMultiChoice) {
													setOptionsSelected((prevOptionsSelected) => {
														return _.xor(prevOptionsSelected, [optionId])
													})
												} else {
													setOptionsSelected([optionId])
												}
											}}
										>
											<Typography
												className="f align-center justify-center b-r8"
												sx={{
													backgroundColor: selected ? "#F2EDFC" : "#F9F9FB",
													border: `1px solid ${selected ? "#814CD6" : "#D9DAE6"}`,
													color: selected ? "#814CD6" : "#717385",
													minHeight: "36px",
													minWidth: "36px",
													maxHeight: "36px",
													maxWidth: "36px",
												}}
												fontSize="16px"
												fontWeight="500"
												lineHeight="26px"
											>
												{intToChar(index)}
											</Typography>
											<Typography
												className="f align-center"
												color={selected ? "#1B1C20" : "#717385"}
												fontSize="16px"
												fontWeight={selected ? "500" : "400"}
												lineHeight="26px"
											>
												{option.value}
											</Typography>
										</Box>
									)
								})}
							</Box>
						</Box>
					</Box>
					<Box className="f align-center justify-s-b g8" paddingBottom="32px">
						<Button
							className="track_button"
							id={props.totalQuestions === props.currentQuestion + 1 ? "submit_quiz" : "next_question"}
							variant="contained"
							color="purple"
							type="button"
							fullWidth={isSM ? false : true}
							disabled={sRLoading || optionsSelected.length === 0}
							onClick={handleOnClick}
						>
							{sRLoading
								? "Please wait..."
								: props.totalQuestions === props.currentQuestion + 1
								? "Submit assessment"
								: "Next question"}{" "}
							<FiArrowRight size="20px" />
						</Button>
						<Box className="align-center" display={{ xs: "none", sm: "none", md: "flex" }}>
							<HelpModalButton />
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	)
}

const mapStateToProps = (state) => ({
	quizId: state.session.quizReducer.quizId,
	startTime: state.session.quizReducer.startTime,
	questions: state.session.quizReducer.questions,
	totalQuestions: state.session.quizReducer.totalQuestions,
	optionSelected: state.session.quizReducer.optionSelected,
	currentQuestion: state.session.quizReducer.currentQuestion,
})

export default connect(mapStateToProps)(Quiz)
