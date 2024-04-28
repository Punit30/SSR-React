import { Button as MUIButton } from "@mui/material"
import { createStyles, makeStyles } from "@mui/styles"
import { capitalize } from "lodash"
import React from "react"

export const makeColor = ({
	bgColor,
	bgHoverColor,
	borderColor,
	borderHoverColor,
	color,
	colorHover,
	shadowColor,
	disbabledBgColor,
	disabledBorderColor,
	disabledColor,
}) => {
	return {
		background: bgColor,
		border: `1px solid ${borderColor}`,
		color: color,

		"&:hover": {
			color: colorHover,
			background: bgHoverColor,
			border: `1px solid ${borderHoverColor}`,
			boxShadow: "none",
		},

		"&:active": {
			boxShadow: shadowColor !== "none" ? `0px 0px 0px 4px ${shadowColor}` : "none",
		},

		"&.Mui-disabled": {
			background: disbabledBgColor,
			border: `1px solid ${disabledBorderColor}`,
			color: disabledColor,
		},
	}
}

const STYLES = {
	textPurple: makeColor({
		bgColor: "transparent",
		bgHoverColor: "transparent",
		borderColor: "transparent",
		borderHoverColor: "transparent",
		color: "#814CD6",
		colorHover: "#6728CC",
		shadowColor: "none",
		disbabledBgColor: "transparent",
		disabledBorderColor: "transparent",
		disabledColor: "#B1B3C4",
	}),
	textDanger: makeColor({
		bgColor: "transparent",
		bgHoverColor: "transparent",
		borderColor: "transparent",
		borderHoverColor: "transparent",
		color: "#EF4444",
		colorHover: "#DC2626",
		shadowColor: "none",
		disbabledBgColor: "transparent",
		disabledBorderColor: "transparent",
		disabledColor: "#F87171",
	}),
	outlinedPurple: makeColor({
		bgColor: "transparent",
		bgHoverColor: "#F2EDFC",
		borderColor: "#814CD6",
		borderHoverColor: "#6728CC",
		color: "#814CD6",
		colorHover: "#6728CC",
		shadowColor: "#ECE4FB",
		disbabledBgColor: "transparent",
		disabledBorderColor: "#B1B3C4",
		disabledColor: "#B1B3C4",
	}),
	outlinedGray: makeColor({
		bgColor: "transparent",
		bgHoverColor: "transparent",
		borderColor: "#B1B3C4",
		borderHoverColor: "#814CD6",
		color: "#B1B3C4",
		colorHover: "#814CD6",
		shadowColor: "#ECE4FB",
		disbabledBgColor: "transparent",
		disabledBorderColor: "#B1B3C4",
		disabledColor: "#B1B3C4",
	}),
	outlinedDanger: makeColor({
		bgColor: "transparent",
		bgHoverColor: "#FFF1F3",
		borderColor: "#F87171",
		borderHoverColor: "#DC2626",
		color: "#F87171",
		colorHover: "#DC2626",
		shadowColor: "#FFDCDC",
		disbabledBgColor: "transparent",
		disabledBorderColor: "#F87171",
		disabledColor: "#F87171",
	}),
	containedPurple: makeColor({
		bgColor: "#814CD6",
		bgHoverColor: "#6728CC",
		borderColor: "#814CD6",
		borderHoverColor: "#6728CC",
		color: "#FFFFFF",
		colorHover: "#FFFFFF",
		shadowColor: "#ECE4FB",
		disbabledBgColor: "#D9DAE6",
		disabledBorderColor: "#D9DAE6",
		disabledColor: "#FFFFFF",
	}),
	containedDanger: makeColor({
		bgColor: "#EF4444",
		bgHoverColor: "#DC2626",
		borderColor: "#EF4444",
		borderHoverColor: "#DC2626",
		color: "#FFFFFF",
		colorHover: "#FFFFFF",
		shadowColor: "#FFDCDC",
		disbabledBgColor: "#FFDCDC",
		disabledBorderColor: "#FFDCDC",
		disabledColor: "#FFFFFF",
	}),
}

function Button(props) {
	const { color, sx, customColor, ...rest } = props
	const buttonColor = STYLES?.[`${props.variant ?? "contained"}${capitalize(color ?? "purple")}`]

	return <MUIButton sx={{ ...(customColor ?? buttonColor), ...sx }} {...rest} />
}

export default Button
