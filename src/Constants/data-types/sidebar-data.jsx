import { Typography } from "@mui/material"
import { FiBookOpen, FiBookmark, FiCheckSquare, FiGitPullRequest, FiSettings } from "react-icons/fi"
import { TbHeartPlus, TbStethoscope } from "react-icons/tb"
import QuizSvg from "../svgs/QuizSvg"
import { SlGraph } from "react-icons/sl"

export const NAV_MENU = {
	PROVIDER: [
		{
			icon: <FiCheckSquare size="24px" />,
			name: "To do",
			redirect: "/dashboard/provider",
			activeLinks: ["/dashboard/provider"],
		},
		{
			icon: <FiBookOpen size="24px" />,
			name: "CME library",
			redirect: "/dashboard/provider/cme-library",
			activeLinks: ["/dashboard/provider/cme-library"],
		},
		{
			icon: <SlGraph size="24px" />,
			name: "CME tracker",
			redirect: "/dashboard/provider/cme-tracker",
			activeLinks: ["/dashboard/provider/cme-tracker"],
		},
		{
			icon: <FiSettings size="24px" />,
			name: "Settings",
			redirect: "/dashboard/provider/settings",
			activeLinks: ["/dashboard/provider/settings", "/dashboard/provider/settings/professional", "/dashboard/provider/settings/practice", "/dashboard/provider/settings/change-password", "/dashboard/provider/settings/profile-view"],
		},
	],
	ADMIN: [
		{
			icon: <TbHeartPlus size="24px" />,
			name: "Patients",
			redirect: "/dashboard/admin",
			activeLinks: ["/dashboard/admin"],
		},
		{
			icon: <TbStethoscope size="24px" />,
			name: "Providers",
			redirect: "/dashboard/admin/providers",
			activeLinks: ["/dashboard/admin/providers", "/dashboard/admin/providers/pre-registered"],
		},
		{
			icon: <FiGitPullRequest size="24px" />,
			name: "Onboarding flow",
			redirect: "/dashboard/admin/on-boarding",
			activeLinks: ["/dashboard/admin/on-boarding"],
		},
		{
			icon: (
				<Typography fontSize="24px" lineHeight="0px">
					<QuizSvg />
				</Typography>
			),
			name: "Quiz",
			redirect: "/dashboard/admin/quiz",
			activeLinks: ["/dashboard/admin/quiz", "/dashboard/admin/quiz/topics"],
		},
		{
			icon: <FiBookmark size="24px" />,
			name: "CME library",
			redirect: "/dashboard/admin/cme-library",
			activeLinks: ["/dashboard/admin/cme-library", "/dashboard/admin/cme-library/topics"],
		},
	],
}
