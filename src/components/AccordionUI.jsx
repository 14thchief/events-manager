import { styled } from "@mui/material/styles";
// import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import Accordion, { accordionClasses } from "@mui/material/Accordion";
import AccordionSummary, {
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { FaPlus } from "react-icons/fa";

const StyledAccordion = styled((props) => (
  <Accordion disableGutters elevation={0} square {...props}>
    {props.children}
  </Accordion>
))(({ theme }) => ({
  [`&.${accordionClasses.root}`]: {
    backgroundColor: "transparent",
  },
  [`&.${accordionClasses.expanded}`]: {
    backgroundColor: "#b49c4f20",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  "&::before": {
    display: "none",
  },
}));

const StyledAccordionSummary = styled((props) => (
  <AccordionSummary
    expandIcon={
      <div className="bg-[#b49c4f] rounded-full h-5 w-5 flex justify-center items-center">
        <FaPlus size={10} color="white" />
      </div>
    }
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
      transform: "rotate(90deg)",
    },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
    // padding: theme.spacing(2),
  },
  // ...theme.applyStyles("dark", {
  //   backgroundColor: "rgba(255, 255, 255, .05)",
  // }),
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  paddingLeft: theme.spacing(5.5),
  backgroundColor: "transparent",
}));

export default function AccordionUI({ title, content, expanded, onExpanded }) {
  return (
    <div className="shadow-sm rounded-md">
      <StyledAccordion expanded={expanded} onChange={() => onExpanded(title)}>
        <StyledAccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          expanded={expanded}
        >
          <Typography component="span">{title}:</Typography>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <Typography className="!whitespace-pre-wrap !text-sm !font-light !p-0">
            {content}
          </Typography>
        </StyledAccordionDetails>
      </StyledAccordion>
    </div>
  );
}
