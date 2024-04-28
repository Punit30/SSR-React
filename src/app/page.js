import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import { CssBaseline, Stack } from "@mui/material";
import Hero from "./panels/Hero";
import WhoWeAre from "./panels/WhoWeAre";
import Services from "./panels/Services";
import Supporters from "./panels/Supporters";
import Ending from "./panels/Ending";

export default function Home() {
  return (
    <>
      <CssBaseline />
      <NavBar />
			<Stack>
				<Hero />
				<WhoWeAre />
				<Services />
				<Supporters />
				<Ending />
			</Stack>
      <Footer />
    </>
  );
}
