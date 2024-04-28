"use client"

import { createTheme, stepConnectorClasses } from "@mui/material"
import { outlinedInputClasses } from "@mui/material/OutlinedInput"
import { FiCheck, FiX } from "react-icons/fi"
import { IoAlert, IoInformation } from "react-icons/io5"

export default createTheme({
	typography: {
		fontFamily: ['Inter', 'Poppins', "sans-serif"].join(","),
	},
	components: {
		MuiBreadcrumbs: {
			styleOverrides: {
				separator: {
					margin: "0px 5px",
					color: "#667085",
					fontSize: "14px",
					fontWeight: 500,
					lineHeight: "20px",
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					fontSize: "14px",
					fontWeight: "400",
					lineHeight: "20px",
					padding: "10px 16px !important",
					height: "fit-content",
					borderRadius: "40px",
					":hover": {
						color: "#6728CC",
						backgroundColor: "#FFF !important",
					},
				},
				label: {
					padding: "0px",
				},
				filled: {
					color: "#6728CC",
					border: "1px solid #6728CC",
					backgroundColor: "#F2EDFC",
				},
				outlined: {
					color: "#1B1C20",
					border: "1px solid #D9DAE6",
					backgroundColor: "#FFF",
				},
			},
		},
		MuiCircularProgress: {
			styleOverrides: {
				root: {
					color: "#814cd6",
				},
			},
		},
		MuiAccordion: {
			styleOverrides: {
				root: {
					boxShadow: "none",
					border: "1px solid #eaebf2",
					":first-of-type": {
						borderTopLeftRadius: "16px",
						borderTopRightRadius: "16px",
					},
					":last-of-type": {
						borderBottomLeftRadius: "16px",
						borderBottomRightRadius: "16px",
					},
				},
			},
		},
		MuiAccordionSummary: {
			styleOverrides: {
				root: {
					color: "#1B1C20",
					fontSize: "14px",
					fontWeight: "600",
					lineHeight: "22px",
					minHeight: "52px",

					"&.Mui-expanded": {
						minHeight: "52px !important",
					},
				},
				content: {
					"&.Mui-expanded": {
						margin: "0px",
					},
				},
				expandIconWrapper: {
					fontSize: "20px",
					color: "#9A9CB0",
				},
			},
		},
		MuiAccordionDetails: {
			styleOverrides: {
				root: {
					padding: "0px",
				},
			},
		},
		MuiTab: {
			styleOverrides: {
				root: {
					color: "#667085",
					opacity: 1,
					textTransform: "capitalize",
					"&.Mui-selected": {
						color: "#814cd6 !important",
						textTransform: "capitalize",
					},
					"& .MuiTouchRipple-root": {
						borderRadius: "12px",
						color: "#814cd6",
					},
				},
			},
		},
		MuiTabs: {
			styleOverrides: {
				indicator: {
					backgroundColor: "#814cd6",
				},
			},
		},
		MuiStep: {
			styleOverrides: {
				root: {
					padding: "0px",
				},
			},
		},
		MuiStepConnector: {
			styleOverrides: {
				root: {
					top: "15px",
					[`&.${stepConnectorClasses.active}`]: {
						[`& .${stepConnectorClasses.line}`]: {
							backgroundColor: "#814CD6",
						},
					},
					[`&.${stepConnectorClasses.completed}`]: {
						[`& .${stepConnectorClasses.line}`]: {
							backgroundColor: "#814CD6",
						},
					},
					[`& .${stepConnectorClasses.line}`]: {
						height: 2,
						border: 0,
						backgroundColor: "#D1D5DB",
						borderRadius: 1,
					},
				},
			},
		},
		MuiStepIcon: {
			styleOverrides: {
				root: {
					color: "#D1D5DB",
					fontSize: "32px",

					"&.Mui-completed": {
						color: "#814CD6",
					},
					"&.Mui-active": {
						color: "#D1D5DB",
					},
				},
			},
		},
		MuiStepLabel: {
			styleOverrides: {
				root: {
					gap: "8px",
				},
				label: {
					marginTop: "0px !important",
					color: "#98A2B3",
					fontSize: "12px",
					fontWeight: "500",
					lineHeight: "18px",
					textTransform: "capitalize",

					"&.Mui-active": {
						color: "#98A2B3",
					},

					"&.Mui-completed": {
						color: "#4F7345",
					},
				},
				labelContainer: {
					display: "none",
				},
			},
		},
		MuiSelect: {
			styleOverrides: {
				icon: {
					color: "#9A9CB0",
				},
			},
		},
		MuiPickersYear: {
			styleOverrides: {
				yearButton: {
					["&.Mui-selected"]: {
						backgroundColor: "#814CD6",
					},
					["&:hover"]: {
						backgroundColor: "#F2EDFC",
					},
					["&:focus"]: {
						backgroundColor: "#814CD6",
					},
					[`&:focus.Mui-selected`]: {
						backgroundColor: "#814CD6",
					},
				},
			},
		},
		MuiPickersDay: {
			styleOverrides: {
				root: {
					["&.Mui-selected"]: {
						backgroundColor: "#814CD6",
					},
					["&:hover"]: {
						backgroundColor: "#F2EDFC",
					},
					["&:focus"]: {
						backgroundColor: "#814CD6",
					},
					[`&:focus.Mui-selected`]: {
						backgroundColor: "#814CD6",
					},
				},
				today: {
					["&:focus"]: {
						backgroundColor: "#814CD6",
						color: "#FFF",
						border: "none",
					},
				},
			},
		},
		MuiDialog: {
			styleOverrides: {
				paper: {
					borderRadius: "12px",
					background: "#FFF",
					boxShadow: "0px 141px 200px -80px rgba(25, 58, 75, 0.30)",
					padding: "0px",
					margin: { xs: "18px", sm: "18px", md: "18px" },
				},
			},
		},
		MuiDialogContent: {
			styleOverrides: {
				root: {
					padding: "0px",
				},
			},
		},
		MuiPaginationItem: {
			styleOverrides: {
				root: {
					color: "#717385",
					"&.Mui-selected": {
						border: "1px solid #814CD6",
						background: "#F2EDFC",
						color: "#814CD6",
						":hover": {
							background: "#F2EDFC",
						},
					},
				},
				ellipsis: {
					height: "64px",
					width: "64px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				},
				outlined: {
					borderRadius: "6px",
					borderColor: "#4F7345",
					color: "#4F7345",
					height: "64px",
					width: "64px",
					textAlign: "center",
					fontSize: "18px",
					fontWeight: 800,

					"&.Mui-selected": {
						color: "#FFF !important",
						backgroundColor: "#4F7345 !important",
					},
				},
			},
		},
		MuiTableContainer: {
			styleOverrides: {
				root: {
					boxShadow: "none",
					borderRadius: "12px",
					border: "1px solid #eaebf2",
				},
			},
		},
		MuiTable: {
			styleOverrides: {
				root: {},
			},
		},
		MuiTableHead: {
			styleOverrides: {
				root: {
					"& .MuiTableCell-root": {
						color: "#717385",
						backgroundColor: "#f9f9fb",
						padding: "8px 24px",
						fontWeight: 500,
						fontSize: "14px",
						lineHeight: "20px",
					},
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					padding: "14px 24px",
					color: "#717385",
					fontSize: "14px",
					fontWeight: "400",
					lineHeight: "20px",
				},
			},
		},
		MuiMenu: {
			styleOverrides: {
				paper: {
					borderRadius: "8px",
					border: "1px solid #EAEDF2",
					boxShadow: "0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0px 20px 24px -4px rgba(16, 24, 40, 0.08)",
					maxWidth: "272px",
					width: "100%",
					marginTop: "4px",
				},
			},
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					gap: "8px",
					borderRadius: "8px",
					padding: "10px 16px",
					color: "#717885",
					fontSize: "14px",
					fontWeight: "500",
					lineHeight: "normal",

					":hover": {
						backgroundColor: "#f2edfc",
						color: "#814cd6",
					},

					["& .MuiListItemIcon-root"]: {
						minWidth: "0px",
						fontSize: "16px",
					},

					["&:hover .MuiListItemIcon-root"]: {
						backgroundColor: "#f2edfc",
						color: "#814cd6",
					},

					"&.Mui-selected": {
						backgroundColor: "#814cd6",
					},

					"&.Mui-selected:hover": {
						backgroundColor: "#814cd6",
					},
				},
			},
		},
		MuiCheckbox: {
			styleOverrides: {
				root: {
					color: "#d9dae6",
					padding: "0px",
					["& .MuiSvgIcon-root"]: {
						borderRadius: "4px",
						height: "24px",
						width: "24px",
						fontSize: "24px",
						background: "#FFF",
					},
					["&.Mui-checked"]: {
						color: "#814cd6",
					},
				},
			},
		},
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					background: "#000000bd",
				},
				arrow: {
					color: "#000000bd",
				},
			},
		},
		MuiAvatar: {
			styleOverrides: {
				rounded: {
					borderRadius: "50%",
					background: "#f2edfc",
					color: "#814cd6",
					fontSize: "20px",
					textTransform: "uppercase",
				},
			},
		},
		MuiFormControlLabel: {
			styleOverrides: {
				label: {
					color: "#717385",
					fontFamily: "Figtree",
					fontSize: "14px",
					fontWeight: 500,
					lineHeight: "20px",
				},
			},
		},
		MuiRadio: {
			styleOverrides: {
				root: {
					["&.Mui-checked"]: {
						color: "#071427",
					},
				},
			},
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					"::before": {
						borderTop: "0.5px solid #eaebf2",
					},
					"::after": {
						borderTop: "0.5px solid #eaebf2",
					},
				},
			},
		},
		MuiAutocomplete: {
			styleOverrides: {
				root: {
					"& .MuiOutlinedInput-root": {
						padding: "6px",
					},
					"& .MuiInputAdornment-positionStart": {
						paddingLeft: "6px",
					},
				},
				paper: {
					borderRadius: "12px",
					fontSize: "14px !important",
					fontWeight: 400,
					color: "#000",
					margin: "6px 0px",
				},
				input: {
					paddingLeft: "0px !important",
					// paddingLeft: "24px",
				},
				tag: {
					fontSize: "14px",
					fontWeight: 400,
					background: "#F2EDFC",
				},
				popupIndicator: {
					color: "#9A9CB0 !important",
				},
				listbox: {
					'& .MuiAutocomplete-option[aria-selected="true"]': {
						backgroundColor: "#F2EDFC",
					},
					'& .MuiAutocomplete-option[aria-selected="true"].Mui-focused': {
						backgroundColor: "#F2EDFC",
					},
				},
			},
		},
		MuiSkeleton: {
			defaultProps: {
				animation: "wave",
				variant: "rounded",
			},
			styleOverrides: {
				root: {
					background: "#eaebf2",
				},
				rounded: {
					borderRadius: "8px",
				},
				caption: {
					borderRadius: "6px",
				},
			},
		},
		MuiListItem: {
			styleOverrides: {
				root: {
					"&.Mui-selected": {
						backgroundColor: "#814CD6 !important",
					},
				},
			},
		},
		MuiListItemButton: {
			styleOverrides: {
				root: {
					display: "flex",
					padding: "12px",
					paddingLeft: "12px !important",
					paddingRight: "12px !important",
					alignItems: "center",
					gap: "8px",
					borderRadius: "8px",

					":hover": {
						backgroundColor: "#f2edfc",
					},
				},
			},
		},
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					minWidth: "0px",
					margin: "0px",
					marginRight: "0px !important",
				},
			},
		},
		MuiListItemText: {
			styleOverrides: {
				root: {
					margin: "0px",
					marginTop: "0px !important",
					marginBottom: "0px !important",
				},
				primary: {
					color: "#717385",
					fontSize: "14px",
					fontWeight: 500,
					lineHeight: "normal",
					textTransform: "capitalize",
				},
			},
		},
		MuiAlert: {
			defaultProps: {
				iconMapping: {
					success: <FiCheck />,
					error: <FiX />,
					warning: <IoAlert />,
					info: <IoInformation />,
				},
			},
			styleOverrides: {
				root: {
					display: "flex",
					alignItems: "center",
					gap: "10px",
					borderRadius: "12px",
					fontSize: "16px",
					fontWeight: 500,
					lineHeight: "22px",
				},
				icon: {
					width: "26px",
					height: "26px",
					minWidth: "26px",
					minHeight: "26px",
					padding: "0px",
					margin: "0px",
					fontSize: "14px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					borderRadius: "50%",
				},
				outlinedSuccess: {
					borderColor: "#73D189",
					background: "#EAFEEF",
					color: "#14882F",

					"& .MuiAlert-icon": {
						background: "#28A745",
						color: "#FFF",
					},
				},
				outlinedError: {
					borderColor: "#F87171",
					background: "#FFF1F3",
					color: "#DC2626",

					"& .MuiAlert-icon": {
						background: "#EF4444",
						color: "#FFF",
					},
				},
				outlinedWarning: {
					borderColor: "#FCD44D",
					background: "#FFF8EA",
					color: "#92400E",

					"& .MuiAlert-icon": {
						background: "#F5B70B",
						color: "#FFF",
					},
				},
				outlinedInfo: {
					borderColor: "#75BBED",
					background: "#DEF1FE",
					color: "#0C456F",

					"& .MuiAlert-icon": {
						background: "#2B7BB4",
						color: "#FFF",
					},
				},
			},
		},
		MuiSlider: {
			styleOverrides: {
				root: {
					color: "#071427",
					height: 4,
				},
				thumb: {
					width: 10,
					height: 10,
					color: "#FFF",
					transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
					"&:before": {
						boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
					},
					"&:hover, &.Mui-focusVisible": {
						boxShadow: "0px 0px 0px 8px rgba(40, 42, 60, 0.10)",
					},
					"&.Mui-active": {
						width: 16,
						height: 16,
					},
				},
				rail: {
					opacity: 0.18,
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				text: {
					borderRadius: "8px",
					textAlign: "center",
					fontSize: "16px",
					fontWeight: 500,
					textTransform: "none",
					display: "flex",
					gap: "8px",
					padding: "0px",
				},
				startIcon: {
					display: "flex",
					alignItems: "center",
					width: "16px",
					height: "16px",
					margin: 0,
				},
				contained: {
					borderRadius: "8px",
					fontSize: "16px",
					fontWeight: 500,
					padding: "8px 18px",
					gap: "8px",
					boxShadow: "none",
					textTransform: "none",
				},
				outlined: {
					borderRadius: "8px",
					fontSize: "16px",
					fontWeight: 500,
					padding: "8px 18px",
					gap: "8px",
					textTransform: "none",
					boxShadow: "none",
				},
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					margin: "0px !important",
					borderRadius: "8px",
					cursor: "pointer",

					[`&.Mui-disabled`]: {
						background: "#d9dae6",
						border: "1px solid #d9dae6",
						color: "#9a9cb0",
						cursor: "not-allowed",
					},
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					"--TextField-brandBorderColor": "#d9dae6",
					"--TextField-brandBorderHoverColor": "#1b1c20",
					"--TextField-brandBorderFocusedColor": "#814cd6",
					"& label.Mui-focused": {
						color: "var(--TextField-brandBorderFocusedColor)",
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					borderRadius: "8px",
					[`&:hover .${outlinedInputClasses.notchedOutline}`]: {
						borderColor: "#1b1c20",
					},
					[`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
						borderWidth: "1px",
						borderColor: "#814cd6",
					},
					[`&.Mui-disabled`]: {
						background: "#F9F9FB",
						color: "#9A9CB0",
					},
					[`&.Mui-disabled .${outlinedInputClasses.notchedOutline}`]: {
						borderColor: "#D9DAE6",
					},
					[`&.Mui-disabled .${outlinedInputClasses.input}`]: {
						backgroundColor: "#f9f9fb",
						cursor: "not-allowed",
					},
					[`&.Mui-error .${outlinedInputClasses.notchedOutline}`]: {
						borderColor: "#ef4444",
					},
				},
				input: {
					borderRadius: "8px",
					backgroundColor: "white",
					padding: "12px",
					color: "#071427",
					fontSize: "14px",
					fontStyle: "normal",
					fontWeight: 400,
					lineHeight: "20px",
				},
				notchedOutline: {
					borderRadius: "8px",
					borderColor: "#d9dae6",
				},
				adornedEnd: {
					[`& .MuiIconButton-root`]: {
						borderRadius: "50%",
						color: "#9A9CB0",
						fontSize: "20px",
					},
				},
				inputAdornedStart: {
					paddingLeft: "0px",
				},
				inputAdornedEnd: {
					paddingRight: "0px",
				},
				adornedStart: {
					fontSize: "22px",
					"& .MuiInputAdornment-root": {
						color: "#9A9CB0",
					},
				},
			},
		},
		MuiFormHelperText: {
			styleOverrides: {
				root: {
					margin: "0px",
					fontSize: "14px",
					fontWeight: 400,
					lineHeight: "20px",
					color: "#ef4444",

					"&.Mui-error": {
						color: "#ef4444",
					},
				},
			},
		},
	},
})
