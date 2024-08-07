"use client";
import { Button, Container, TextField } from "@mui/material";
import React, { useState } from "react";

export default function ChatbotSearch({ onRecipeNameChange }) {
  const [recipe, setRecipe] = useState("");
  const handleChange = (newName) => {
    setRecipe(newName);
  };
  return (
    <Container>
      <TextField
        id="outlined-basic"
        label="Enter Recipe Name"
        variant="filled"
        onChange={(e) => handleChange(e.target.value)}
        sx={{
          mt: 5,
          backgroundColor: "white",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "lightgray",
            },
            "&.Mui-focused fieldset": {
              borderColor: "gray",
            },
          },
          "& .MuiInputLabel-root": {
            color: "gray",
          },
          "& .MuiInputBase-input": {
            color: "black",
          },
        }}
      />
      <Button
        onClick={() => onRecipeNameChange(recipe)}
        sx={{
          mt: 6,
          backgroundColor: "white",
          color: "black",
          "&:hover": {
            backgroundColor: "lightgray",
          },
          marginLeft: 2,
        }}
      >
        Search
      </Button>
    </Container>
  );
}
