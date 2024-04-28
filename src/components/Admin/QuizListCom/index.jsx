import { useLazyQuery, useMutation } from "@apollo/client"
import { useTheme } from "@emotion/react"
import { Box, CssBaseline, InputAdornment, Skeleton, TextField, Typography, useMediaQuery } from "@mui/material"
import _ from "lodash"
import { useSnackbar } from "notistack"
import React, { useEffect, useState } from "react"
import { FiFilter, FiSearch } from "react-icons/fi"
import { IoAdd } from "react-icons/io5"
import { dltQuestionMutation } from "../../../gql/mutations/Quiz"
import { getAllQuestionsQuery } from "../../../gql/queries/Quiz"
import useSpecialty from "../../../helpers/hooks/useSpecialty"
import { TrackForm } from "../../../app/GlobalObjects/store/actions/TrackForm"
import Delete from "../../common/Modals/Delete"
import Button from "../../utilities/Button"
import FilterDropDown from "../../utilities/FilterDropDown"
import AddEdit from "./Modal/AddEdit"
import QuizCard from "./widgets/QuizCard"

function QuizListComp() {
	const { enqueueSnackbar } = useSnackbar()
	const theme = useTheme()
	const isMD = useMediaQuery(theme.breakpoints.up("md"))
	const [specialtyFilter, setSpecialtyFilter] = useState([])
	const [tagsFilter, setTagsFilter] = useState([])
	const [searchValue, setSearchValue] = useState("")
	const [questions, setQuestions] = useState([])
	const [selectedQues, setSelectedQues] = useState(null)
	const [addEditModal, setAddEditModal] = useState(false)
	const [dltModal, setDltModal] = useState(false)

	const { data: specialtyData, loading: specialtyLoading } = useSpecialty()

	const [GetAllQuestion, { loading }] = useLazyQuery(getAllQuestionsQuery, { fetchPolicy: "network-only" })
	const [DltQuestion, { loading: dltLoading }] = useMutation(dltQuestionMutation)

	useEffect(() => {
		fetchQuestions()
	}, [])

	const fetchQuestions = async () => {
		try {
			const res = await GetAllQuestion()
			setQuestions(res.data.getAllQuestions)
		} catch (e) {
			_.forEach(_.get(e, "graphQLErrors", []), ({ message }) =>
				enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
			)
		}
	}

	const filteredQuestions = questions.filter((item) => {
		const containsSearchValue = item.question.toLowerCase().includes(searchValue.toLowerCase())

		const matchesSpecialties =
			_.isEmpty(specialtyFilter) ||
			_.intersection(
				item.specialities.map((s) => s.toLowerCase()),
				specialtyFilter.map((sf) => sf.toLowerCase())
			).length > 0

		const matchesTags =
			_.isEmpty(tagsFilter) ||
			_.intersection(
				item.tags.map((t) => t.toLowerCase()),
				tagsFilter.map((tf) => tf.toLowerCase())
			).length > 0

		return containsSearchValue && matchesSpecialties && matchesTags
	})

	const clearAllFilter = () => {
		setTagsFilter([])
		setSpecialtyFilter([])
		setSearchValue("")
	}

	const handleEdit = (question) => {
		setSelectedQues(question)
		setAddEditModal(true)
	}

	const handleDlt = (question) => {
		setSelectedQues(question)
		setDltModal(true)
	}

	const handleDltFunc = async () => {
		try {
			await DltQuestion({ variables: { id: selectedQues.id } })
			fetchQuestions()
			setSelectedQues(null)
			setDltModal(false)
			enqueueSnackbar("Question deleted successfully", { variant: "mui-alert", color: "success" })
			TrackForm({ formId: "question_delete", variant: "success" })
		} catch (e) {
			TrackForm({ formId: "question_delete", variant: "danger" })
			_.forEach(_.get(e, "graphQLErrors", []), ({ message }) =>
				enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
			)
		}
	}

	return (
		<>
			<CssBaseline />
			<AddEdit
				open={addEditModal}
				selectedQues={selectedQues}
				handleClose={() => {
					setAddEditModal(false)
					setSelectedQues(null)
				}}
				refreshData={fetchQuestions}
				isEdit={selectedQues !== null}
			/>
			<Delete
				title="Delete question?"
				open={dltModal}
				isSubmitting={dltLoading}
				handleClose={() => setDltModal(false)}
				handleSubmit={handleDltFunc}
			/>
			<Box className="f f-c" gap={{ xs: "16px", md: "24px" }}>
				<Box className="f flex-wrap g12 justify-s-b align-center">
					<Box className="f g6 flex-wrap align-center" width={{ xs: "100%", sm: "fit-content" }}>
						<Typography className="f align-center g6" fontWeight="500" fontSize="14px" color="#717385">
							<FiFilter size="18px" /> Filters
						</Typography>
						<FilterDropDown
							title="Specialty"
							state={specialtyFilter}
							loading={specialtyLoading}
							setState={setSpecialtyFilter}
							dropdownList={_.map(specialtyData, (item) => item.name)}
						/>
						<FilterDropDown
							title="Tag"
							state={tagsFilter}
							loading={false}
							setState={setTagsFilter}
							dropdownList={["Cultural", "Medical"]}
						/>
						<Box display={{ xs: "none", sm: "flex" }}>
							{specialtyFilter.length !== 0 || tagsFilter.length !== 0 || searchValue !== "" ? (
								<Button
									variant="text"
									color="purple"
									onClick={clearAllFilter}
									sx={{ fontSize: "14px" }}
								>
									Clear filter
								</Button>
							) : null}
						</Box>
					</Box>
					<Box className="f g8 align-center flex-wrap" width={{ xs: "100%", sm: "fit-content" }}>
						<Box minWidth="198px" maxWidth={{ xs: "none", sm: "198px" }} width="100%">
							<TextField
								fullWidth
								type="text"
								placeholder="Search by question"
								variant="outlined"
								onChange={(e) => setSearchValue(e.target.value)}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<FiSearch color="#9a9cb0" />
										</InputAdornment>
									),
								}}
							/>
						</Box>
						<Box className="f align-center g8 justify-s-b" width={{ xs: "100%", sm: "fit-content" }}>
							<Button
								sx={{ padding: "10px 16px", fontSize: "14px", gap: "6px", lineHeight: 1.5 }}
								variant="contained"
								color="purple"
								onClick={() => setAddEditModal(true)}
							>
								<IoAdd size="16px" /> Add new question
							</Button>
							<Box display={{ xs: "flex", sm: "none" }}>
								{specialtyFilter.length !== 0 || tagsFilter.length !== 0 || searchValue !== "" ? (
									<Button
										variant="text"
										color="purple"
										onClick={clearAllFilter}
										sx={{ fontSize: "14px" }}
									>
										Clear filter
									</Button>
								) : null}
							</Box>
						</Box>
					</Box>
				</Box>
				<Box
					className="f f-c g12"
					sx={{ overflowY: "auto", scrollbarWidth: "none" }}
					height={{ xs: "540px", md: `calc(var(--window-height) - ${isMD ? "270px" : "320px"})` }}
				>
					{loading ? (
						_.times(10, (index) => <Skeleton key={index} height="180px" sx={{ minHeight: "180px" }} />)
					) : filteredQuestions.length !== 0 ? (
						_.map(filteredQuestions, (question, index) => (
							<QuizCard
								question={question}
								handleDlt={handleDlt}
								handleEdit={handleEdit}
								index={index}
								key={index}
							/>
						))
					) : (
						<Typography
							className="f align-center justify-center w100 h100 b-r12"
							border="1px solid #d9dae6"
							fontWeight="500"
							fontSize="14px"
							lineHeight="20px"
							color="#b1b3c4"
							minHeight="200px"
						>
							No question available
						</Typography>
					)}
				</Box>
			</Box>
		</>
	)
}

export default QuizListComp
