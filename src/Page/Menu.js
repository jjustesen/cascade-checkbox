import React, { useState } from "react";
import data from "../data.json";
import { dataConverter } from "../helpers/dataConverter";
import CheckBoxTreeClass from "../components/molecules/Checkbox/CheckBoxTreeClass";
import Accordion from "../components/molecules/Accordion/Accordion";
// import CheckBoxTreeHook from "../components/molecules/Checkbox/CheckBoxTreeHook";

const Menu = () => {
  const [item, setItem] = useState(dataConverter(data));
  return (
    <>
      {/* <TreeView>
        <CheckBoxTreeHook
          items={item}
          onChangeHandle={(item) => setItem(item)}
        />
      </TreeView> */}
      <Accordion>
        <CheckBoxTreeClass
          item={item}
          onChangeHandle={(item) => setItem(item)}
        />
      </Accordion>
    </>
  );
};

export default Menu;
