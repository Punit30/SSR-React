"use client"
import ElementPlus from "@/Constants/svgs/ElementPlus"
import HelpModalButton from "@/components/common/HelpModalButton"
import { Box, CssBaseline, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import Link from "next/link"
import React from "react"

const logo = "/images/logo-black.png"

const useStyles = makeStyles({
	link: {
		color: "#814CD6",
		fontSize: "14px",
		fontWeight: "500",
		lineHeight: "20px",
		textDecoration: "none",

		"&:hover": {
			textDecoration: "underline",
		},
	},
})

function AuthLayout({ children }) {
	const classes = useStyles()

	return (
		<Box className="f" height="var(--window-height)">
			<CssBaseline />
			<Box
				className="f-c g12 w100 h100"
				minHeight="360px"
				// height="var(--window-height)"
				padding="16px"
				flex={1.5}
				maxWidth="448px"
				display={{ xs: "none", md: "flex" }}
				sx={{ backgroundColor: "#f2edfc" }}
			>
				<Box className="f f-c h100 align-center justify-center" gap="48px">
					<Link href="/" aria-label="landing-page">
						<Box
							padding="24px"
							className="f align-center justify-center b-r16"
							border="1px solid  #FFF"
							sx={{ backgroundColor: "#FAF8FE" }}
							boxShadow="6px 6px 32px 0px rgba(216, 207, 233, 0.71), -5px -5px 12px 0px #FFF"
						>
							<ElementPlus size="64px" />
						</Box>
					</Link>
					<Typography
						color="#1B1C20"
						textAlign="center"
						fontFamily="Poppins"
						fontSize="28px"
						fontWeight="600"
						lineHeight="36px"
					>
						Welcome to inclusive+
					</Typography>
				</Box>
				<Box className="f f-c align-center justify-center" paddingBottom="48px">
					<Typography color="#B1B3C4" textAlign="center" fontSize="14px" fontWeight="400" lineHeight="20px">
						© 2024 Inclusiveplus.co
					</Typography>
					<Box className="align-center g6" display="inline-flex">
						<Link href="/privacy-policy" className={classes.link}>
							Privacy Policy
						</Link>
						<Typography
							color="#B1B3C4"
							textAlign="center"
							fontSize="14px"
							fontWeight="400"
							lineHeight="20px"
						>
							and
						</Typography>
						<Link href="/terms-of-use" className={classes.link}>
							Terms of use
						</Link>
					</Box>
				</Box>
			</Box>
			<Box className="f f-c h100" flex={2} >
				<Box
					className="g24 align-center justify-s-b"
					padding={{ xs: "24px 16px", sm: "24px 24px" }}
					display={{ xs: "flex", md: "none" }}
				>
					<Box width="174px" height="30px">
						<Link href="/" style={{ textDecoration: "none" }}>
							<img src={logo} width="100%" height="100%" />
						</Link>
					</Box>
					<HelpModalButton />
				</Box>
				{children}
			</Box>
		</Box>
	)
}

export default AuthLayout
