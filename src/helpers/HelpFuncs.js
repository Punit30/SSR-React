import { remove } from "lodash"

export const IPreferEndMove = (arr) => {
	remove(arr, (value) => value === "I prefer not to answer") // Remove "I prefer not to answer"
	arr.push("I prefer not to answer") // Add "I prefer not to answer" at the end
	return arr
}
