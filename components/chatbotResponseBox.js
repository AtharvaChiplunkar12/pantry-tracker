import splitStringUsingRegex from "../utils/splitTextUsingRegex";
import React from "react";
import { motion } from "framer-motion";

export default function ChatbotResponseBox({ text }) {
  const splitText = splitStringUsingRegex(text);
  console.log(splitText);

  const charVariant = {
    hidden: {
      opacity: 0,
    },
    reveal: {
      opacity: 1,
    },
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate="reveal"
        variants={charVariant}
        transition={{ staggerChildren: 0.0015 }}
      >
        {splitText.map((char, index) => {
          if (char === "\n") {
            return <br key={`br_${index}`} />;
          }
          return (
            <motion.span
              key={`char_${index}`}
              variants={charVariant}
            >
              {char}
            </motion.span>
          );
        })}
      </motion.div>
    </>
  );
}
