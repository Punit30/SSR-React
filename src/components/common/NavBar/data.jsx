import PatientSVG from "../../../Constants/svgs/PatientSVG"
import ProvidersSVG from "../../../Constants/svgs/ProvidersSVG"
import MedicalGroupsSVG from "../../../Constants/svgs/MedicalGroupsSVG"
import InvestorsSVG from "../../../Constants/svgs/InvestorsSVG"

export const navItems = [
	{
		name: "For Patients",
		link: "/",
	},
	{
		name: "For Providers",
		link: "/providers",
	},
	{
		name: "For medical Groups",
		link: "/medical-groups",
	},
	{
		name: "For Investors",
		link: "/investors",
	},
	{
		name: "Contact us",
		link: "/contact-us",
	},
]

export const drawerItems = [
	{
		name: "For Patients",
		link: "/",
		icon: <PatientSVG />,
	},
	{
		name: "For Providers",
		link: "/providers",
		icon: <ProvidersSVG />,
	},
	{
		name: "For medical Groups",
		link: "/medical-groups",
		icon: <MedicalGroupsSVG />,
	},
	{
		name: "For Investors",
		link: "/investors",
		icon: <InvestorsSVG />,
	},
]

export const drawerStaticLinks = [
	{
		name: "Contact us",
		link: "/contact-us",
	},
	{
		name: "Terms of use",
		link: "/terms-of-use",
	},
	{
		name: "Privacy policy",
		link: "/privacy-policy",
	},
]