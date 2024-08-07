"use client";
import { firestore } from "../../firebase";
import styled from "@emotion/styled";
import PageviewIcon from "@mui/icons-material/Pageview";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Link from "next/link";
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
  where,
  addDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function ListPage() {
  const [pantry, setPantry] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [buttonValue, setButtonValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const getPantry = async () => {
    let snapshot;
    if (searchQuery) {
      snapshot = query(
        collection(firestore, "pantry"),
        where("name", ">=", searchQuery),
        where("name", "<=", searchQuery + "\uf8ff")
      );
    } else {
      snapshot = query(collection(firestore, "pantry"));
    }
    const querySnapshot = await getDocs(snapshot);
    const pantryList = [];

    querySnapshot.forEach((doc) => {
      pantryList.push({ id: doc.id, ...doc.data() });
    });
    setPantry(pantryList);
  };
  const addItem = async (item) => {
    try {
      const snapshot = query(
        collection(firestore, "pantry"),
        where("name", "==", item.name)
      );
      const querySnapshot = await getDocs(snapshot);
      if (querySnapshot.docs.length > 0) {
        const docSnap = querySnapshot.docs[0];
        const docRef = doc(firestore, "pantry", docSnap.id);
        const { quantity } = docSnap.data();
        await setDoc(docRef, { quantity: quantity + 1 }, { merge: true });
      } else {
        await addDoc(collection(firestore, "pantry"), { ...item, quantity: 1 });
      }
    } catch (error) {
      console.error("Error adding item: ", error);
    }
    await getPantry();
    setItemName("");
    handleClose();
  };
  const handleSearch = async (name) => {
    setSearchQuery(name);
    await getPantry();
    setItemName("");
    handleClose();
  };
  const cancelSearch = async () => {
    setSearchQuery("");
    await getPantry();
  };
  const removeItem = async (id) => {
    const docRef = doc(collection(firestore, "pantry"), id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { name, quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { name: name, quantity: quantity - 1 });
      }
    }
    await getPantry();
  };
  const deleteItem = async (id) => {
    const docRef = doc(collection(firestore, "pantry"), id);
    await deleteDoc(docRef);
    await getPantry();
  };
  const handleOpen = (val) => {
    setButtonValue(val);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setButtonValue(0);
  };

  useEffect(() => {
    getPantry();
  }, [searchQuery]);

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
              onClick={() =>
                buttonValue === 0
                  ? addItem({ name: itemName })
                  : handleSearch(itemName)
              }
            >
              Go
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Stack sx={{ justifyContent: "center", mt: 2, mb: 2 }}>
          <Box>
            <AddCircleOutlineIcon
              onClick={() => handleOpen(0)}
              sx={{
                fontSize: "48px",
                color: "white",
                cursor: "pointer",
              }}
            />
            <Typography
              color={"white"}
              fontSize={12}
            >
              Add
            </Typography>
          </Box>
        </Stack>

        <TableContainer
          component={Paper}
          sx={{
            width: "60%",
            maxHeight: 500,
            bgcolor: "#D3D3D3",
            color: "#000",
          }}
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
                <TableCell
                  align="left"
                  sx={{
                    padding: "4px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        mr: 2,
                      }}
                    >
                      <PageviewIcon
                        onClick={() => handleOpen(1)}
                        sx={{
                          fontSize: "48px",
                          cursor: "pointer",
                        }}
                      />
                      <Typography fontSize={12}>Search</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        ml: 2,
                      }}
                    >
                      <SearchOffIcon
                        onClick={cancelSearch}
                        sx={{
                          fontSize: "40px",
                          cursor: "pointer",
                        }}
                      />
                      <Typography fontSize={12}>Cancel</Typography>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pantry.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ border: 2 }}
                >
                  <TableCell align="center">
                    <Typography variant="body1">{item.name}</Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      padding: "1px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => addItem(item)}
                        sx={{ minWidth: "30px", px: 1 }}
                      >
                        +
                      </Button>
                      <Typography
                        variant="body1"
                        sx={{ mx: 2, minWidth: "20px", textAlign: "center" }}
                      >
                        {item.quantity}
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => removeItem(item.id)}
                        sx={{ minWidth: "30px", px: 1 }}
                      >
                        -
                      </Button>
                    </Box>
                  </TableCell>
                  <TableCell align="left">
                    <DeleteIcon
                      onClick={() => deleteItem(item.id)}
                      sx={{ ":hover": { cursor: "pointer" } }}
                    />
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
