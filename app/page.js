import { Container } from "@mui/material";
import Dashboard from "./Dashboard";
import Header from "./Header";


export default function Home() {
  
  return (
    <Container
      maxWidth="xl"
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#000008",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Header />
      <Dashboard/>
    </Container>
  );
}
