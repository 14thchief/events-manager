import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AccordionUI from "./AccordionUI";
import { fields } from "../constants.tsx";

export default function InfoModal({
  data,
  open,
  setOpen,
  onAccept,
  isAccepted,
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
                  <DialogContentText className="!whitespace-pre-wrap">
                    {data?.overview}
                  </DialogContentText>
                </div>
              )}
              {data?.overview && data?.objectives && <hr />}
              {!!data?.objectives && (
                <div className="space-y-2">
                  <DialogContentText>Objectives:</DialogContentText>
                  <DialogContentText className="!whitespace-pre-wrap">
                    {data?.objectives}
                  </DialogContentText>
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
                  onClick={() => {
                    isAccepted ? onAccept(data.event) : onAccept(data);
                    setOpen(false);
                  }}
                  type="submit"
                  className={
                    "!flex !gap-4 !font-bold !px-4 !items-center !bg-primary !text-white !mx-auto !max-w-max !w-[200px] !h-[50px] text-[16px]"
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
