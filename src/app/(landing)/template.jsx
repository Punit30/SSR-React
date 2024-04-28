import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";

export default function layout({ children }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
