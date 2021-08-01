import React from "react";
import styled from "styled-components";

import TreeItem from "@material-ui/lab/TreeItem";
const AccordionItem = ({ nodeId, label, children }) => {
  const AccordionItemStyled = styled(TreeItem)`
    margin-left: 5px;
    width: 100%;
    .MuiTreeItem-label {
      padding-top: 9px;
      padding-bottom: 9px;
    }
    /* .MuiTreeItem-iconContainer {
      display: none;
    } */
  `;
  return (
    <>
      <AccordionItemStyled nodeId={nodeId} label={label}>
        {children}
      </AccordionItemStyled>
    </>
  );
};

export default AccordionItem;
