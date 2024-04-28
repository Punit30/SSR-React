export const normalizeData = (_, report) => {
	// Counting answered and unanswered questions
	const { true: answeredQuestion, false: unAnsweredQuestion } = _.countBy(report, "isAnswered")

	// Mapping report details and calculating correct and wrong answers
	const detailedReport = report.map((item) => {
		const tempReport = _.pick(item, ["id", "question", "isAnswered", "marksObtained"])
		if (item.isAnswered) {
			const optionsSelected = _.filter(item.options, (option) => option.isSelected).map((option) => option.value)
			const correctOptions = _.filter(item.options, (option) => option.isCorrect).map((option) => option.value)
			const isCorrect = item.marksObtained !== "0.0"
			const isMulti = correctOptions.length > 1

			return {
				...tempReport,
				isCorrect,
				optionsSelected,
				correctOptions,
				isMulti,
			}
		}
		return tempReport
	})

	// Counting correct and wrong answers
	const { true: correctAnswered, false: wrongAnswered } = _.countBy(detailedReport, "isCorrect")

	return {
		answeredQuestion: answeredQuestion ?? 0,
		unAnsweredQuestion: unAnsweredQuestion ?? 0,
		correctAnswered: correctAnswered ?? 0,
		wrongAnswered: wrongAnswered ?? 0,
		detailedReport: detailedReport,
	}
}
