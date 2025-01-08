import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AccordionComponent from "./Accordion";
import AccordionUI from "./AccordionUI";

const fields = [
  { name: "Hotel Benefits", key: "hotel_benefits" },
  { name: "Execution Plan", key: "execution_plan" },
  { name: "Investment ROI", key: "investment_roi" },
  { name: "Expected Outcome", key: "expected_outcome" },
  { name: "Follow-up Strategies", key: "follow_up_strategies" },
  {
    name: "Presentations & Networking Opportunities",
    key: "presentations_networking_opportunities",
  },
  { name: "Prescheduled Meetings", key: "prescheduled_meetings" },
  {
    name: "Strategic Value for Participants",
    key: "strategic_value_for_participants",
  },
  {
    name: "Key Components of the Strategy",
    key: "key_components_of_the_strategy",
  },
  { name: "Roadshow", key: "roadshow" },
  { name: "Strategic Locations", key: "strategic_locations" },
];
export default function InfoModal({
  data,
  open,
  setOpen,
  onAccept,
  isAccepted,
  setError,
  handleSubmit,
  total,
}) {
  const collapsibleFields = fields.filter((x) => data?.[x.key]);

  const handleClose = () => {
    setOpen(false);
  };

  const [expanded, setExpanded] = React.useState(null);
  const handleChange = (panel) => {
    const newExpanded = expanded !== panel;
    setExpanded(newExpanded ? panel : null);
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <div className="!p-2">
          <DialogTitle className="!font-bold text-lg">
            {data?.event}
          </DialogTitle>
          <DialogContent>
            <div className="flex flex-col gap-4">
              {!!data?.overview && (
                <div className="space-y-2">
                  <DialogContentText>Overview:</DialogContentText>
                  <DialogContentText>{data?.overview}</DialogContentText>
                </div>
              )}
              {data?.overview && data?.objectives && <hr />}
              {!!data?.objectives && (
                <div className="space-y-2">
                  <DialogContentText>Objectives:</DialogContentText>
                  <DialogContentText>{data?.objectives}</DialogContentText>
                </div>
              )}
              <hr />
              {collapsibleFields?.map((item, i) => {
                return (
                  <AccordionUI
                    expanded={
                      // (!expanded && collapsibleFields?.length > 1 && i == 0) ||
                      expanded === item.name
                    }
                    onExpanded={handleChange}
                    title={item.name}
                    content={data?.[item.key]}
                    key={i}
                  />
                );
              })}

              <DialogActions>
                <Button
                  onClick={(e) => {
                    onAccept(data);
                    setOpen(false);
                  }}
                  type="submit"
                  className={
                    "!flex !gap-4 !font-bold !px-4 !items-center !bg-[#b49c4f] !text-white !mx-auto !max-w-max !w-[200px] !h-[50px] text-[16px]"
                  }
                >
                  {isAccepted ? "Unaccept" : "Accept"}{" "}
                  <span className="">{total ?? ""}</span>
                </Button>
              </DialogActions>
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
