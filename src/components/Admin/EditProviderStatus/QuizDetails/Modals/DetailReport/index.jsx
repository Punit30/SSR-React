import { Box, CssBaseline, IconButton, Typography } from "@mui/material"
import _ from "lodash"
import React from "react"
import { FiCheck, FiSlash, FiX } from "react-icons/fi"
import CustomDialog from "../../../../../utilities/Dialog"

function DetailReport({ data, open, handleClose = () => {} }) {
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
				<Box
					className="f g12 align-center justify-s-b"
					padding={{ xs: "16px", md: "16px 24px" }}
					boxShadow="0px 1px 18px rgba(167, 173, 198, 0.16)"
				>
					<Typography color="#343A40" fontSize="16px" fontWeight="500" lineHeight="24px">
						Quiz result - Attempt no {data?.attemptNumber}
					</Typography>
					<IconButton onClick={handleClose} sx={{ padding: "4px" }}>
						<FiX size="24px" color="#6C757D" />
					</IconButton>
				</Box>
				<Box className="f f-c g16" height="calc(var(--window-height) - 180px)" sx={{ overflowY: "auto" }}>
					{_.map(data?.quizDetailedReport, (quiz, index) => (
						<Box
							className="f f-c g16"
							padding={{ xs: "16px 16px 24px", md: "16px 24px 24px" }}
							key={index}
							borderBottom="1px solid #EAEBF2"
						>
							<Box className="f g8 align-center">
								<Typography
									className="f align-center justify-center"
									borderRadius="32px"
									sx={{ backgroundColor: "#EAEBF2" }}
									minWidth="22px"
									minHeight="22px"
									maxWidth="22px"
									maxHeight="22px"
									color="#1B1C20"
									fontSize="12px"
									fontWeight="500"
									lineHeight="18px"
								>
									{index + 1}
								</Typography>
								<Typography
									className="f align-center g4 b-r4"
									padding="4px 12px"
									sx={{
										backgroundColor: quiz.isAnswered
											? !quiz.isCorrect
												? "#fff1f3"
												: "#eafeef"
											: "#f9f9fb",
									}}
									color={quiz.isAnswered ? (!quiz.isCorrect ? "#dc2626" : "#14882f") : "#b1b3c4"}
									fontSize="14px"
									fontWeight="500"
									lineHeight="20px"
								>
									{quiz.isAnswered ? (
										!quiz.isCorrect ? (
											<>
												<FiX size="16px" /> Incorrect
											</>
										) : (
											<>
												<FiCheck size="16px" /> Correct
											</>
										)
									) : (
										<>
											<FiSlash size="16px" /> Unanswered
										</>
									)}
								</Typography>
							</Box>
							<Typography color="#1B1C20" fontSize="14px" fontWeight="400" lineHeight="20px">
								{quiz.question}
							</Typography>
							{quiz.isAnswered ? (
								<Box className="f f-c g10">
									<Box className="f g4" flexDirection={{ xs: "column", sm: "row" }}>
										<Typography
											minWidth="120px"
											noWrap
											color="#717385"
											fontSize="12px"
											fontWeight="500"
											lineHeight="18px"
										>
											Selected answers
										</Typography>
										<Box className="f g6">
											<Typography fontSize="16px" color={quiz.isCorrect ? "#14882F" : "#Ef4444"}>
												{quiz.isCorrect ? <FiCheck /> : <FiX />}
											</Typography>
											{quiz.isMulti ? (
												<ul
													style={{
														margin: "0px",
														color: quiz.isCorrect ? "#14882F" : "#Ef4444",
														fontSize: "14px",
														fontWeight: "500",
														lineHeight: "20px",
														paddingInlineStart: "18px",
													}}
												>
													{_.map(quiz.optionsSelected, (option, index) => (
														<li key={index}>{option}</li>
													))}
												</ul>
											) : (
												<Typography
													color={quiz.isCorrect ? "#14882F" : "#Ef4444"}
													fontSize="14px"
													fontWeight="500"
													lineHeight="20px"
												>
													{quiz.optionsSelected?.[0]}
												</Typography>
											)}
										</Box>
									</Box>
									{!quiz.isCorrect ? (
										<Box className="f g4" flexDirection={{ xs: "column", sm: "row" }}>
											<Typography
												minWidth="120px"
												noWrap
												color="#717385"
												fontSize="12px"
												fontWeight="500"
												lineHeight="18px"
											>
												Correct answers
											</Typography>
											<Box className="f g6">
												<Typography fontSize="16px" color="#14882F">
													<FiCheck />
												</Typography>
												{quiz.isMulti ? (
													<ul
														style={{
															margin: "0px",
															color: "#14882F",
															fontSize: "14px",
															fontWeight: "500",
															lineHeight: "20px",
															paddingInlineStart: "18px",
														}}
													>
														{_.map(quiz.correctOptions, (option, index) => (
															<li key={index}>{option}</li>
														))}
													</ul>
												) : (
													<Typography
														color="#14882F"
														fontSize="14px"
														fontWeight="500"
														lineHeight="20px"
													>
														{quiz.correctOptions?.[0]}
													</Typography>
												)}
											</Box>
										</Box>
									) : null}
								</Box>
							) : null}
						</Box>
					))}
				</Box>
			</Box>
		</CustomDialog>
	)
}

export default DetailReport
