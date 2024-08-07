"use client";
import ChatbotResponseBox from "../../components/chatbotResponseBox";
import ChatbotSearch from "../../components/chatbotSearch";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

export default function GeneratorPage() {
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fetchLLMResponse = async (query) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://127.0.0.1:8000/${query}`);
      console.log(response.data);
      setResponse(response.data);
    } catch (error) {
      console.error("Error fetching LLM Model", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const handleRecipeNameChange = (newName) => {
    fetchLLMResponse(newName);
  };

  return (
    <Container>
      {/* <Stack
        direction="row"
        spacing={2}
        display={"flex"}
        justifyContent={"center"}
        sx={{ mb: 2 }}
      >
        <Button>Customized Recipe</Button>
        <Button>Auto Generate Recipe from Cart</Button>
      </Stack> */}

      <ChatbotSearch onRecipeNameChange={handleRecipeNameChange} />
      <Box
        sx={{
          mt: 4,
          bgcolor: "#D3D3D3",
          maxHeight: "70vh", 
          overflow: "auto",
        }}
      >
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Typography
            variant="body1"
            align="left"
            sx={{ whiteSpace: "pre-wrap", ml: 3, mr: 3}}
          >
            {response}
          </Typography>
        )}
      </Box>
    </Container>
  );
}
