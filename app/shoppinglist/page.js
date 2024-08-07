import React from "react";
import Header from "../Header";
import { Container } from "@mui/material";
import ListPage from "./ListPage";

export default function ShoppingList() {
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
      <ListPage/>
    </Container>
  );
}
