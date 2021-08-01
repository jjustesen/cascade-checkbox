import React from "react";
import TreeView from "@material-ui/lab/TreeView";
import CollapseIcon from "@material-ui/icons/ExpandMore";
import ExpandIcon from "@material-ui/icons/ChevronRight";
export const Accordion = ({ children }) => {
  return (
    <TreeView
      defaultCollapseIcon={<CollapseIcon />}
      defaultExpandIcon={<ExpandIcon />}
    >
      {children}
    </TreeView>
  );
};

export default Accordion;
