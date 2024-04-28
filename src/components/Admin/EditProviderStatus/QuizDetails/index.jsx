import { useLazyQuery, useMutation } from "@apollo/client"
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	CssBaseline,
	Divider,
	Grid,
	IconButton,
	Skeleton,
	Typography,
} from "@mui/material"
import _ from "lodash"
import moment from "moment"
import { useSnackbar } from "notistack"
import React, { useEffect, useState } from "react"
import { FiAward, FiCheck, FiChevronDown, FiMaximize2, FiX } from "react-icons/fi"
import { resetQuizMutation } from "../../../../gql/mutations/Quiz"
import {
	getAllQuizByProviderIdQuery,
	getQuizDetailedReportQuery,
	getQuizReportQuery,
} from "../../../../gql/queries/Quiz"
import { TrackForm } from "../../../../app/GlobalObjects/store/actions/TrackForm"
import Button from "../../../utilities/Button"
import DetailReport from "./Modals/DetailReport"
import { default as ResetQuizModal } from "./Modals/ResetQuiz"
import { normalizeData } from "./utility/dataFunc"

function QuizDetails({ id }) {
	const { enqueueSnackbar } = useSnackbar()
	const [loading, setLoading] = useState(true)
	const [quizData, setQuizData] = useState([])
	const [selectedQuiz, setSelectedQuiz] = useState(null)

	const [resetQuizModal, setResetQuizModal] = useState(false)
	const [detailReportMdoal, setDetailReportModal] = useState(false)

	const [GetAllQuizByProviderId] = useLazyQuery(getAllQuizByProviderIdQuery, { fetchPolicy: "network-only" })
	const [GetQuizReport] = useLazyQuery(getQuizReportQuery, { fetchPolicy: "network-only" })
	const [GetQuizDetailedReport] = useLazyQuery(getQuizDetailedReportQuery, { fetchPolicy: "network-only" })

	const [ResetQuiz, { loading: resetLoading }] = useMutation(resetQuizMutation)

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		setLoading(true)
		try {
			const allQuiz = await GetAllQuizByProviderId({ variables: { providerId: id } })

			const finalReport = await Promise.all(
				allQuiz.data.getAllQuizByProviderId.map(async (item) => {
					const [quizReport, quizDetailedReport] = await Promise.all([
						GetQuizReport({ variables: { quizId: item.id } }),
						GetQuizDetailedReport({ variables: { quizId: item.id } }),
					])

					const normalizedData = normalizeData(_, quizDetailedReport.data.getQuizDetailedReport)

					return {
						id: item.id,
						score: item.score,
						endTime: item.endTime,
						attemptNumber: item.attemptNumber,
						createdDateTime: item.createdDateTime,
						startTime: item.startTime,
						status: item.status,
						result: item.result,
						totalScore: item.totalScore,
						answeredQuestion: normalizedData.answeredQuestion,
						unAnsweredQuestion: normalizedData.unAnsweredQuestion,
						correctAnswered: normalizedData.correctAnswered,
						wrongAnswered: normalizedData.wrongAnswered,
						quizTagReport: {
							id: quizReport.data.getQuizReport.id,
							attributes: quizReport.data.getQuizReport.attributes,
						},
						quizDetailedReport: normalizedData.detailedReport,
					}
				})
			)
			setQuizData(finalReport)
		} catch (e) {
			_.forEach(_.get(e, "graphQLErrors", []), ({ message }) =>
				enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
			)
		}
		setTimeout(() => setLoading(false), 2000)
	}

	const handleQuizReset = async () => {
		try {
			await ResetQuiz({
				variables: {
					providerId: id,
					quizId: selectedQuiz.id,
				},
			})
			fetchData()
			setSelectedQuiz(null)
			setResetQuizModal(false)
			TrackForm({ formId: "reset_quiz", variant: "success" })
			enqueueSnackbar("Quiz reset successfully.", { variant: "mui-alert", color: "success" })
		} catch (e) {
			TrackForm({ formId: "reset_quiz", variant: "danger" })
			_.forEach(_.get(e, "graphQLErrors", []), ({ message }) =>
				enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
			)
		}
	}

	const QuizDetailCon = ({ title, value }) => (
		<Box className="f f-c g4">
			<Typography color="#717385" fontSize="12px" fontWeight="400" lineHeight="18px">
				{title}
			</Typography>
			<Typography color="#1B1C20" fontSize="14px" fontWeight="400" lineHeight="20px">
				{value}
			</Typography>
		</Box>
	)

	return (
		<>
			<CssBaseline />
			<DetailReport
				data={selectedQuiz}
				open={detailReportMdoal}
				handleClose={() => {
					setDetailReportModal(false)
					setSelectedQuiz(null)
				}}
			/>
			<ResetQuizModal
				open={resetQuizModal}
				handleClose={() => {
					setDetailReportModal(false)
					setResetQuizModal(false)
				}}
				isSubmitting={resetLoading}
				handleSubmit={handleQuizReset}
			/>
			<Box>
				<Accordion>
					<AccordionSummary expandIcon={<FiChevronDown />} aria-controls="panel1-content" id="panel1-header">
						Quiz report
					</AccordionSummary>
					<Divider />
					<AccordionDetails>
						<Box
							className="f f-c"
							padding="15px 0px 0px 15px"
							minHeight="280px"
							height="280px"
							sx={{ overflowY: "auto" }}
						>
							<Grid container columns={12} columnSpacing="16px" rowSpacing="16px">
								{loading ? (
									_.times(4, (index) => (
										<Grid
											item
											xs={12}
											sm={12}
											md={12}
											key={index}
											padding="0px 16px 16px 0px"
											boxShadow="1px 1px #eaebf2"
										>
											<Skeleton height="180px" sx={{ minHeight: "180px" }} />
										</Grid>
									))
								) : quizData.length !== 0 ? (
									_.map(quizData, (quiz, index) => (
										<Grid
											item
											xs={12}
											sm={12}
											md={12}
											key={index}
											padding="0px 16px 16px 0px"
											boxShadow="1px 1px #eaebf2"
										>
											<Box className="f f-c g24">
												<Box className="f g8 align-center justify-s-b flex-wrap">
													<Typography
														color="#1B1C20"
														fontSize="14px"
														fontWeight="500"
														lineHeight="20px"
													>
														Attemp no. {quiz.attemptNumber}
													</Typography>
													<Box className="f g8 align-center">
														<Typography
															className="f align-center g4 b-r4"
															padding="4px 12px"
															sx={{
																backgroundColor:
																	quiz.result === "FAIL" ? "#fff1f3" : "#eafeef",
															}}
															color={quiz.result === "FAIL" ? "#dc2626" : "#14882f"}
															fontSize="14px"
															fontWeight="500"
															lineHeight="20px"
														>
															{quiz.result === "FAIL" ? (
																<>
																	<FiX size="16px" /> Failed
																</>
															) : (
																<>
																	<FiCheck size="16px" /> Passed
																</>
															)}
														</Typography>
														<Typography
															className="f align-center g4 b-r4"
															padding="4px 12px"
															sx={{ backgroundColor: "#FFF8EA" }}
															color="#E8930B"
															fontSize="14px"
															fontWeight="500"
															lineHeight="20px"
														>
															<FiAward size="16px" /> {quiz.score}/{quiz.totalScore}
														</Typography>
														<Button
															variant="outlined"
															color="gray"
															sx={{
																padding: "3px 12px",
																fontSize: "14px",
																lineHeight: "20px",
															}}
															onClick={() => {
																setSelectedQuiz(quiz)
																setResetQuizModal(true)
															}}
														>
															Reset
														</Button>
														<IconButton
															sx={{ padding: "4px" }}
															onClick={() => {
																setSelectedQuiz(quiz)
																setDetailReportModal(true)
															}}
														>
															<FiMaximize2 size="18px" color="#9A9CB0" />{" "}
														</IconButton>
													</Box>
												</Box>
												<Box className="f g4 justify-s-b">
													<Box className="f f-c g16">
														<QuizDetailCon title="Answered" value={quiz.answeredQuestion} />
														<QuizDetailCon
															title="Unanswered"
															value={quiz.unAnsweredQuestion}
														/>
													</Box>
													<Box className="f f-c g16">
														<QuizDetailCon title="Correct" value={quiz.correctAnswered} />
														<QuizDetailCon title="Incorrect" value={quiz.wrongAnswered} />
													</Box>
													<Box className="f f-c g16">
														<QuizDetailCon
															title="Start time"
															value={moment(quiz.startTime).format("LLL")}
														/>
														<QuizDetailCon
															title="End time"
															value={moment(quiz.endTime).format("LLL")}
														/>
													</Box>
												</Box>
											</Box>
										</Grid>
									))
								) : (
									<Grid item columns={12} xs={12}>
										<Typography
											className="f align-center justify-center w100"
											minHeight="200px"
											fontWeight="500"
											fontSize="14px"
											lineHeight="20px"
											color="#b1b3c4"
										>
											No quiz given by the user yet
										</Typography>
									</Grid>
								)}
							</Grid>
						</Box>
					</AccordionDetails>
				</Accordion>
			</Box>
		</>
	)
}

export default QuizDetails
