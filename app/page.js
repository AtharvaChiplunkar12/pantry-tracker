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
  Table,
  TableHead,
  TableCell,
  TableRow,
  TextField,
  Typography,
  TableBody,
  TableContainer,
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
  const [buttonValue, setButtonValue] = useState(0);

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
  const deleteItem = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    await deleteDoc(docRef);
    await getPantry();
  };
  const handleOpen = (val) => {
    setButtonValue(val);
    setOpen(true);
  };

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
      maxWidth="xl"
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#003366",
        width: "100vw",
        height: "100vh",
      }}
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
            {buttonValue === 0 ? "Add Item" : "Search Item"}
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
      <Typography
        variant="h1"
        color={"#FFD700"}
      >
        Pantry Tracker
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: "center", mt: 2, mb: 2 }}
      >
        <Button
          variant="contained"
          onClick={()=>handleOpen(0)}
        >
          Add
        </Button>
        <Button variant="contained">Add by Photo</Button>
        <Button variant="contained">Remove by Photo</Button>
        <Button
          variant="contained"
          onClick={()=>handleOpen(1)}
        >
          Search Item
        </Button>
      </Stack>

      <Box
        border={"1px solid #333"}
        sx={{}}
      >
        <TableContainer
          component={Paper}
          sx={{ maxHeight: 400, bgcolor: "#D3D3D3", color: "#F0F8FF" }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h6">Item Name</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Quantity</Typography>
                </TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pantry.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ border: 2 }}
                >
                  <TableCell align="center">
                    <Typography variant="h8">{item.name}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => addItem(item.name)}
                      >
                        +
                      </Button>
                      <Typography
                        variant="body1"
                        sx={{ mx: 2 }}
                      >
                        {item.count}
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => removeItem(item.name)}
                      >
                        -
                      </Button>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => deleteItem(item.name)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
