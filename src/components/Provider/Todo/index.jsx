import { Box, CssBaseline, Skeleton } from "@mui/material"
import React, { useEffect, useState } from "react"
import { getAllTaskByProviderIdQuery } from "../../../gql/queries/Todo"
import { connect, useDispatch } from "react-redux"
import { useLazyQuery } from "@apollo/client"
import _ from "lodash"
import TodoCard from "./widgets/TodoCard"
import ToDoHelp from "./Modals/ToDoHelp"

function ToDo(props) {
	const dispatch = useDispatch()

	const [GetTask, { loading }] = useLazyQuery(getAllTaskByProviderIdQuery, {
		variables: { providerId: props.providerId },
		fetchPolicy: "network-only",
	})
	const [taskList, setTaskList] = useState([])
	const [toDoHelpModal, setToDoHelpModal] = useState(false)
	const [helperText, setHelperText] = useState("")

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const res = await GetTask()
				const tasks = _.get(res, "data.getAllTaskByProviderId", [])
				const data = _.map(tasks, ({ status, task }) => ({
					status,
					id: task.id,
					isActive: task.isActive,
					description: task.description,
					taskName: task.taskName,
					redirectionLink: task.redirectionLink,
					sequenceNumber: task.sequenceNumber,
					isOptional: task.isOptional,
					helperText: task.helperText,
				}))

				setTaskList(data)
			} catch (e) {
				_.forEach(_.get(e, "graphQLErrors", []), ({ message }) =>
					enqueueSnackbar(message, { variant: "mui-alert", color: "error" })
				)
			}
		}

		fetchTasks()
	}, [])

	return (
		<>
			<CssBaseline />
			<ToDoHelp open={toDoHelpModal} handleClose={() => setToDoHelpModal(false)} helperText={helperText} />
			{loading
				? _.times(5, (index) => <Skeleton height="118px" sx={{ maxWidth: "924px" }} key={index} />)
				: taskList.length !== 0
				? _.map(taskList, (task, index) => (
						<TodoCard
							task={task}
							index={index}
							key={index}
							openHelpModal={() => setToDoHelpModal(true)}
							setHelpText={setHelperText}
						/>
				  ))
				: null}
		</>
	)
}

const mapStateToProps = (state) => ({
	providerId: state.local.providerReducer.providerId,
})

export default connect(mapStateToProps)(ToDo)
