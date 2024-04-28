import { Box, IconButton, Typography } from "@mui/material"
import _ from "lodash"
import React from "react"
import { FiEdit2, FiTrash2 } from "react-icons/fi"

function QuizCard({ question, index, handleEdit = (question) => {}, handleDlt = (question) => {} }) {
	return (
		<Box className="f f-c g16 p16 b-r12" border="1px solid #d9dae6">
			<Box className="f f-c g8">
				<Box className="f align-center justify-s-b">
					<Box className="f align-center g8">
						<Typography
							className="f align-center justify-center b-r28"
							padding="2px 10px"
							color="#FFF"
							fontSize="12px"
							fontWeight="500"
							lineHeight="18px"
							sx={{ backgroundColor: "#814CD6", minWidth: "32px" }}
						>
							{index + 1}
						</Typography>
						<Box className="f g8 flex-wrap">
							{_.map(question.tags, (tag, index) => (
								<Box
									className="f align-center justify-center b-r4"
									padding="2px 10px"
									key={index}
									sx={{ backgroundColor: "#FFF8EA" }}
								>
									<Typography
										color="#E8930B"
										textAlign="center"
										fontSize="12px"
										fontWeight="500"
										lineHeight="18px"
										textTransform="capitalize"
									>
										{tag.toLowerCase()}
									</Typography>
								</Box>
							))}
						</Box>
					</Box>
					<Box className="f align-center g4">
						<IconButton sx={{ padding: "6px" }} onClick={() => handleEdit(question)}>
							<FiEdit2 size="16px" color="#717385" />
						</IconButton>
						<IconButton sx={{ padding: "6px" }} onClick={() => handleDlt(question)}>
							<FiTrash2 size="16px" color="#717385" />
						</IconButton>
					</Box>
				</Box>
				{question.specialities.length !== 0 ? (
					<Box className="f g8 flex-wrap">
						{_.map(question.specialities, (specialty, index) => (
							<Box
								className="f align-center justify-center b-r4"
								padding="2px 10px"
								key={index}
								sx={{ backgroundColor: "#F2EDFC" }}
							>
								<Typography
									color="#814CD6"
									textAlign="center"
									fontSize="12px"
									fontWeight="500"
									lineHeight="18px"
									textTransform="capitalize"
								>
									{specialty.toLowerCase()}
								</Typography>
							</Box>
						))}
					</Box>
				) : null}
			</Box>
			<Typography color="#1B1C20" fontSize="14px" fontWeight="400" lineHeight="20px">
				{question.question}
			</Typography>
			{question.topics.length !== 0 ? (
				<Box className="f g8 flex-wrap">
					{_.map(question.topics, (topic, index) => (
						<Box
							className="f align-center justify-center b-r4"
							padding="2px 10px"
							key={index}
							sx={{ backgroundColor: "#EAEBF2" }}
						>
							<Typography
								color="#717385"
								textAlign="center"
								fontSize="12px"
								fontWeight="500"
								lineHeight="18px"
								textTransform="capitalize"
							>
								{topic.toLowerCase()}
							</Typography>
						</Box>
					))}
				</Box>
			) : null}
		</Box>
	)
}

export default QuizCard
