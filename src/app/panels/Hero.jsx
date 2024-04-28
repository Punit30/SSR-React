"use client"

import { makeColor } from "@/components/utilities/Button"
import { Box, Button, CssBaseline, Typography, keyframes, styled } from "@mui/material"
import React from "react"
import { FiSearch } from "react-icons/fi"
import { useDispatch } from "react-redux"
import { setPrePatientRegisterModal } from "../GlobalObjects/store/reducers/Modal"

const Img1 = "/images/landing/carousel/img-2.webp"
const Img2 = "/images/landing/carousel/img-4.webp"
const Img3 = "/images/landing/carousel/img-5.webp"
const Img4 = "/images/landing/carousel/img-6.webp"
const Img5 = "/images/landing/carousel/img-7.webp"

const buttonColor = {
	...makeColor({
		bgColor: "#FFF",
		bgHoverColor: "#eaebf2",
		borderColor: "#FFF",
		borderHoverColor: "#eaebf2",
		color: "#814CD6",
		colorHover: "#814CD6",
		shadowColor: "#eaebf2",
		disbabledBgColor: "transparent",
		disabledBorderColor: "transparent",
		disabledColor: "transparent",
	}),
	padding: "10px 18px",
	minWidth: "206px",
	lineHeight: "inherit",
}

const FADE_SLIDE = keyframes`
    0% {
        background-image: url(${Img1})
    },
    20% {
        background-image: url(${Img1})
    },
    40% {
        background-image: url(${Img2})
    },
    60%  {
        background-image: url(${Img3})
    },
    80%  {
        background-image: url(${Img4})
    },
    99%  {
        background-image: url(${Img5})
    },
    100% {
        background-image: url(${Img1})
    }
`

const SCarouselCon = styled("div")({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	height: "fit-content",
	width: "100%",
	gap: "16px",

	backgroundSize: "cover",
	backgroundPosition: "center",
	backgroundRepeat: "no-repeat",
	transition: "800",

	padding: "188px 30px 288px 30px",

	animationName: FADE_SLIDE,
	animationDuration: "24s",
	animationIterationCount: "infinite",
	animationTimingFunction: "cubic-bezier(0.1, 1, 0.1, 1)",

	"@media only screen and (max-width: 950px)": {
		padding: "112px 30px 240px 30px",
	},

	"@media only screen and (max-width: 520px)": {
		padding: "72px 30px 140px 30px",
	},
})

function Hero() {
	const dispatch = useDispatch()

	return (
		<>
			<CssBaseline />
			{/* <Helmet>
				<link rel="preload" as="image" href={Img1} />
				<link rel="preload" as="image" href={Img2} />
				<link rel="preload" as="image" href={Img3} />
				<link rel="preload" as="image" href={Img4} />
				<link rel="preload" as="image" href={Img5} />
			</Helmet> */}
			<Box className="f f-c w100" height="fit-content">
				<SCarouselCon sx={{ gap: { xs: "56px", md: "72px" } }}>
					<Box className="f f-c g16" maxWidth="1180px">
						<Typography
							textAlign="center"
							color="#fff"
							fontWeight="700"
							fontSize={{ xs: "30px", sm: "50px", md: "68px" }}
							lineHeight="120%"
							textTransform="capitalize"
						>
							LGBTQIA+ Focused Healthcare
						</Typography>
						<Typography
							textAlign="center"
							color="#fff"
							fontWeight="400"
							fontSize={{ xs: "16px", md: "18px" }}
							lineHeight={{ xs: "26px", md: "28px" }}
						>
							Connecting you with providers you can trust
						</Typography>
					</Box>
					<Button
						id="find_a_provider"
						className="track_button"
						sx={buttonColor}
						type="button"
						onClick={() => dispatch(setPrePatientRegisterModal(true))}
					>
						<FiSearch /> Find a provider
					</Button>
				</SCarouselCon>
			</Box>
		</>
	)
}

export default Hero
