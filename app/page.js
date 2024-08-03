"use client";
import { firestore } from "@/firebase";
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
  // const [pantry, setPantry] = useState([]);
  // const [open, setOpen] = useState(false);
  // const [itemName, setItemName] = useState("");

  // const getPantry = async () => {
  //   const snapshot = query(collection(firestore, "pantry"));
  //   const querySnapshot = await getDocs(snapshot);
  //   const pantryList = [];

  //   querySnapshot.forEach((doc) => {
  //     pantryList.push({ name: doc.id, ...doc.data() });
  //   });
  //   //console.log(pantryList);
  //   setPantry(pantryList);
  // };
  // const addItem = async (item) => {
  //   const docRef = doc(collection(firestore, "pantry"), item);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     const { count } = docSnap.data();
  //     await setDoc(docRef, { count: count + 1 });
  //   } else {
  //     await setDoc(docRef, { count: 1 });
  //   }
  //   await getPantry();
  // };
  // const removeItem = async (item) => {
  //   const docRef = doc(collection(firestore, "pantry"), item);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     const { count } = docSnap.data();
  //     if (count === 1) {
  //       await deleteDoc(docRef);
  //     } else {
  //       await setDoc(docRef, { count: count - 1 });
  //     }
  //   }
  //   await getPantry();
  // };
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // useEffect(() => {
  //   getPantry();
  // }, []);

  // const style = {
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   width: 400,
  //   bgcolor: "white",
  //   border: "2px solid #000",
  //   boxShadow: 24,
  //   p: 4,
  //   display: "flex",
  //   flexDirection: "column",
  //   gap: 3,
  // };

  return (
    <div>Hello</div>
  );
}
