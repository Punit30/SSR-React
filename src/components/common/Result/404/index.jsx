import React from "react"
import NavBar from "../../NavBar"
import Footer from "../../Footer"
import { Box, Typography, useMediaQuery } from "@mui/material"
import Button from "../../../utilities/Button"
import { Link } from "react-router-dom"
import ElementPlus from "../../../../Constants/svgs/ElementPlus"
import { useTheme } from "@emotion/react"

function Page404() {
	const theme = useTheme()
	const isSM = useMediaQuery(theme.breakpoints.up("sm"))
	return (
		<>
			<NavBar />
			<Box className="f f-c justify-center align-center" height="640px" gap="58px" position="relative">
				<Box position="absolute" left="-220px" zIndex={1} display={{ xs: "none", sm: "flex" }}>
					<ElementPlus color="#F2EDFC" size="600px" logo={false} />
				</Box>
				<Box
					className="f f-c"
					gap={{ xs: "24px", md: "58px" }}
					padding={{ xs: "0px 16px", md: "0px 0px 0px 258px" }}
					zIndex={2}
				>
					<Box className="f f-c w100" maxWidth="495px">
						<Typography
							color="#814CD6"
							fontSize="16px"
							fontWeight="600"
							lineHeight="normal"
							letterSpacing="1.28px"
							textTransform="uppercase"
						>
							404 ERROR
						</Typography>
						<Typography
							color="#1B1C20"
							fontFamily="Poppins"
							fontSize={{ xs: "32px", md: "64px" }}
							fontWeight="600"
							lineHeight="normal"
						>
							Page not found
						</Typography>
						<Typography color="#717385" fontSize="18px" fontWeight="400" lineHeight="26px">
							Sorry, the page you are looking for doesn't exist or has been moved. Here are some helpful
							links.
						</Typography>
					</Box>
					<Box className="f g8" flexDirection={{ xs: "column", sm: "row" }}>
						<Button
							fullWidth={isSM ? false : true}
							component={Link}
							to="/contact-us"
							type="button"
							variant="outlined"
							color="gray"
						>
							Contact us
						</Button>
						<Button
							fullWidth={isSM ? false : true}
							component={Link}
							to="/"
							type="button"
							variant="contained"
							color="purple"
						>
							Go to home page
						</Button>
					</Box>
				</Box>
			</Box>
			<Footer />
		</>
	)
}

export default Page404
