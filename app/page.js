"use client";
import { firestore } from "../firebase";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Container,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  collection,
  query,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Home() {
  const [pantry, setPantry] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");

  const getPantry = async () => {
    const snapshot = query(collection(firestore, "pantry"));
    const querySnapshot = await getDocs(snapshot);
    const pantryList = [];

    querySnapshot.forEach((doc) => {
      pantryList.push({ name: doc.id, ...doc.data() });
    });
    //console.log(pantryList);
    setPantry(pantryList);
  };
  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { count } = docSnap.data();
      await setDoc(docRef, { count: count + 1 });
    } else {
      await setDoc(docRef, { count: 1 });
    }
    await getPantry();
  };
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { count } = docSnap.data();
      if (count === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { count: count - 1 });
      }
    }
    await getPantry();
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getPantry();
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: 3,
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ textAlign: "center", display: "flex", flexDirection: "column" }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Add Item
          </Typography>
          <Stack
            width="100%"
            direction={"row"}
            spacing={2}
          >
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                setItemName("");
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Typography variant="h1">Pantry Tracker</Typography>
      <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "center", mt: 2, mb: 2 }}
        >
          <Button
            variant="contained"
            onClick={handleOpen}
          >
            Add
          </Button>
          <Button variant="contained">Add by Photo</Button>
          <Button variant="contained">Remove by Photo</Button>
        </Stack>

        <Box
          border={"1px solid #333"}
          sx={{
            display: "flex",
            bgcolor: "tomato",
            ml: 5,
            mr: 5,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h3">Pantry Items</Typography>
              <Typography variant="h3">Quantity</Typography>
            </Box>
            <Stack sx={{ display: "flex", justifyContent: "space-between" }}>
              {pantry.map(({ name, count }) => (
                <Paper
                  elevation={3}
                  sx={{
                    display: "flex",
                    direction: "row",
                    justifyContent: "space-between",

                    border: "1px solid #333",
                  }}
                >
                  <Typography
                    variant={"h3"}
                    textAlign={"center"}
                  >
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Typography>

                  <Typography
                    variant={"h3"}
                    textAlign={"center"}
                  >
                    {count}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => removeItem(name)}
                  >
                    Remove
                  </Button>
                </Paper>
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
