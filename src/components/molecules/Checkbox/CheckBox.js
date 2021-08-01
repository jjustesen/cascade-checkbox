import { Checkbox } from "@material-ui/core";
import React from "react";
import { Flex } from "../../elements/Flex/Flex";
import AccordionItem from "../AccordionItem/AccordionItem";

const CheckBox = ({ item, handleCheck }) => {
  let childrens = undefined;
  if (item.childrens) {
    childrens = item.childrens.map((child) => {
      return <CheckBox item={child} key={child.id} handleCheck={handleCheck} />;
    });
  }
  return (
    <Flex>
      <Flex alignItems="start">
        <Checkbox
          indeterminate={item.isIndeterminate && !item.checked}
          checked={item.checked}
          onClick={() => handleCheck(item)}
          color="primary"
        />
      </Flex>

      <AccordionItem
        nodeId={item.id}
        label={
          <>
            <label>{item.label}</label>
          </>
        }
      >
        {childrens}
      </AccordionItem>
    </Flex>
  );
};

export default CheckBox;
