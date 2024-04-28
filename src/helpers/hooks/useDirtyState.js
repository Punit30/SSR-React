import _ from "lodash"
import { useEffect, useState } from "react"

export default function useDirtyState(initialValue) {
	const [value, setValue] = useState(_.cloneDeep(initialValue))
	const [initialState, setInitialState] = useState(_.cloneDeep(initialValue))
	const [isDirty, setIsDirty] = useState(false)

	useEffect(() => {
		setInitialState(_.cloneDeep(initialValue))
		setValue(_.cloneDeep(initialValue))
	}, [])

	useEffect(() => {
		setIsDirty(JSON.stringify(value) !== JSON.stringify(initialState))
	}, [value, initialState])

	const updateValue = (newValue) => {
		setValue(_.cloneDeep(newValue))
	}

	const reset = () => {
		setValue(_.cloneDeep(initialState))
	}

	const resetInitial = (newInitialValue) => {
		setInitialState(_.cloneDeep(newInitialValue ?? value))
	}

	return [value, updateValue, isDirty, reset, resetInitial, initialState]
}
