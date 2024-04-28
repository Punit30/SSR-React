import { CssBaseline, Stack } from '@mui/material'
import React from 'react'
import Ending from './panels/Ending'
import Hero from './panels/Hero'
import WhyItMatters from './panels/WhyItMatters'
import WhyUs from './panels/WhyUs'

function MedicalGroupsPage() {
  return (
    <>
			<CssBaseline />
			<Stack>
				<Hero />
				<WhyItMatters />
				<WhyUs />
				<Ending />
			</Stack>
		</>
  )
}

export default MedicalGroupsPage
