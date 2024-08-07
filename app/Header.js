"use client";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const pages = {
  //pantry: "Pantry",
  shoppinglist: "Shopping List",
  recipegenerator: "Recipe Generator",
};

export default function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "#003366" }}
    >
      <Toolbar>
        <Link
          href="/"
          style={{ textDecoration: "none" }}
        >
          <Typography
            variant="h4"
            color={"#FFD700"}
            fontFamily={"Courier New Arial"}
          >
            Pantry Tracker
          </Typography>
        </Link>

        <Box
          sx={{ display: "flex", ml: "auto", mr: "auto", flexDirection: "row" }}
        >
          {Object.entries(pages).map(([key, value]) => (
            <Link
              href={`/${key}`}
              key={key}
              style={{ textDecoration: "none" }}
            >
              <Typography
                textAlign="center"
                color={"#FFFFFF"}
                ml={2}
                mr={2}
                fontSize={20}
              >
                {value}
              </Typography>
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
