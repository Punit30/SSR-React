import React from "react"
import Select from "react-select"
import { styled } from "@mui/styles"
import { Typography } from "@mui/material"

const CustomSelect = (props) => {
	const selectTheme = (theme) => {
		return {
			...theme,
			borderRadius: "8px",
			colors: {
				...theme.colors,
				primary50: "#EFE9FC",
				primary25: "#F9F9FB",
				primary: "#EFE9FC",
				danger: "#EF4444",
				neutral20: "#9A9CB0",
				neutral50: "#9A9CB0",
				neutral80: "#000000",
			},
		}
	}

	const colourStyles = {
		menuPortal: (base) => ({ ...base, zIndex: 9999 }),
		control: (styles, { isDisabled }) => ({
			...styles,
			backgroundColor: isDisabled ? "#F9F9FB" : "white",
			minHeight: "44px",
			height: "fit-content",
			outline: "0",
			paddingLeft: `${props.lefticon ? "28px" : "0px"}`,
			fontSize: "14px",
			fontFamily: "Inter, sans-serif",
			fontWeight: "400",
			lineHeight: "20px",
			width: `${props.width ? props.width : "100%"}`,
			border: `1px solid ${
				(props.meta && props.meta.error && props.meta.touched) || props.error ? "#ef4444" : "#d9dae6"
			}`,
			":focus-within": {
				border: `1px solid ${
					(props.meta && props.meta.error && props.meta.touched) || props.error ? "#ef4444" : "#814cd6"
				} !important`,
			},
			":hover": {
				border: `1px solid ${
					(props.meta && props.meta.error && props.meta.touched) || props.error ? "#ef4444" : "#1b1c20"
				}`,
			},
		}),
		option: (styles, { isDisabled }) => {
			return {
				...styles,
				color: isDisabled ? "#9A9CB0" : "#000",
				cursor: isDisabled ? "not-allowed" : "pointer",
				fontSize: "14px",
				fontFamily: "Inter, sans-serif",
				fontWeight: "400",
				lineHeight: "20px",
			}
		},
		multiValue: (styles) => {
			return {
				...styles,
				backgroundColor: "#F2EDFC",
				color: "#B592F6",
				borderRadius: "4px",
				overflow: "hidden",
			}
		},
		multiValueLabel: (styles) => {
			return {
				...styles,
				color: "#814CD6",
				fontFamily: '"Inter",sans-serif',
				fontSize: "14px",
				fontWeight: "500",
				lineHeight: "20px",
			}
		},
		indicatorSeparator: (styles) => {
			return { ...styles, display: "none" }
		},
	}

	const filterOption = (option, searchText) => {
		if (option.data.label.toLowerCase().includes(searchText.toLowerCase())) {
			return true
		} else {
			return false
		}
	}

	return (
		<StyledSelect>
			<Select
				menuPlacement="auto"
				menuPortalTarget={document.body}
				options={props.options}
				styles={colourStyles}
				theme={(theme) => selectTheme(theme)}
				filterOption={filterOption}
				{...props}
			/>
			<Typography className="lefticon" fontSize="20px" color="#9A9CB0" lineHeight="normal">
				{props.lefticon}
			</Typography>
			{props.meta && props.meta.error && props.meta.touched && <span className="error">{props.meta.error}</span>}
		</StyledSelect>
	)
}

const StyledSelect = styled("div")(() => ({
	position: "relative",

	"& .lefticon": {
		position: "absolute",
		top: "12px",
		left: "12px",
		pointerEvents: "none",
	},

	"& .error": {
		color: "#EF4444",
		height: "20px",
		fontFamily: "Inter",
		fontWeight: "400",
		fontSize: "14px",
		lineHeight: "20px",
	},
}))

CustomSelect.defaultProps = {
	options: [
		{ value: "chocolate", label: "Chocolate" },
		{ value: "strawberry", label: "Strawberry" },
		{ value: "vanilla", label: "Vanilla" },
	],
}

export default CustomSelect
