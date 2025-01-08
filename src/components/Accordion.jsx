import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

export default function AccordionComponent({ title, content }) {
  return (
    <div>
      <Accordion elevation={0}>
        <AccordionSummary
          expandIcon={<FaPlusCircle />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">{title}</Typography>
        </AccordionSummary>
        <AccordionDetails className="!bg-[#F0F0F0]">
          <Typography>{content}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
