import * as React from "react";
import Drawer from "@mui/material/Drawer";

function SideDrawer(props: {
  isOpen: boolean;
  closeDrawer: () => void;
  children: React.ReactNode;
}) {
  const closeDrawer = () => () => {
    props.closeDrawer();
  };

  return (
    <div>
      <Drawer open={props.isOpen} onClose={closeDrawer} anchor="right">
        {props.children}
      </Drawer>
    </div>
  );
}

export default SideDrawer;
