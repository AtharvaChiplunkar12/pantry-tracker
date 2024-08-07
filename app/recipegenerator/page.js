import React from "react";
import Header from "../Header";
import GeneratorPage from "./GeneratorPage";
import { Container } from "@mui/material";


export default function RecipeGenerator() {
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
      <GeneratorPage/>
    </Container>
  );
}
