import React from "react"
import { CssBaseline } from "@mui/material"
import EntryFormLayout from "@/layouts/EntryFormLayout"
import ContactUsForm from "@/components/common/Forms/ContactUs"

function ContactUsPage() {
	return (
		<>

			<CssBaseline />
			<EntryFormLayout
				title="We'd love to hear from you!"
				description="Please enter the following details to get in touch with us."
			>
				<ContactUsForm />
			</EntryFormLayout>
		</>
	)
}

export default ContactUsPage
