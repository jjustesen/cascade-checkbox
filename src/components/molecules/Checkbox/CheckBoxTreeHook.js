import React, { useState, useEffect } from "react";
import CheckBox from "./CheckBox";

const CheckBoxTreeHook = (props) => {
  const [checkItems, setCheckItems] = useState(props.items);
  let id = 0;

  useEffect(() => {
    const setCompleteJson = (props) => {
      const packageWithId = makePackageWithId(props.items);

      const tempItem = { id: -1, childrens: packageWithId };
      let parent = { id: -2 };
      let nodeArray = findLastestNode(packageWithId, []);

      for (let i = 0; i < nodeArray.length; i++) {
        let node = nodeArray[i];
        parent = { id: -2 };
        while (parent.id !== -1) {
          parent = findParent(tempItem, node);
          parent = setParentStatus(parent);
          node = parent;
        }
      }

      setCheckItems(packageWithId);
    };

    setCompleteJson(props);
    // eslint-disable-next-line
  }, [checkItems, props]);

  const makePackageWithId = (item) => {
    for (let i = 0; i < item.length; i++) {
      if (item[i].checked === undefined) {
        item[i].checked = false;
      }
      if (item[i].isIndeterminate === undefined) {
        item[i].isIndeterminate = false;
      }
      item[i].id = id++;
      if (item[i].childrens) {
        makePackageWithId(item[i].childrens);
      }
    }
    return item;
  };

  const findLastestNode = (node, array) => {
    for (let i = 0; i < node.length; i++) {
      if (node[i].childrens) {
        findLastestNode(node[i].childrens, array);
      } else {
        array.push(node[i]);
      }
    }
    return array;
  };

  const findParent = (parent, node) => {
    if (parent.childrens) {
      for (let i = 0; i < parent.childrens.length; i++) {
        if (parent.childrens[i].id === node.id) {
          return parent;
        }
        if (parent.childrens[i].childrens) {
          const result = findParent(parent.childrens[i], node);
          if (result !== null) {
            return result;
          }
        }
      }
    }
    return null;
  };

  const setParentStatus = (parent) => {
    let allChecked = true;
    let isIndeterminate = false;
    for (let i = 0; i < parent.childrens.length; i++) {
      if (!parent.childrens[i].checked) {
        allChecked = false;
      } else {
        isIndeterminate = true;
      }
      if (parent.childrens[i].isIndeterminate) {
        isIndeterminate = true;
      }
    }

    if (!allChecked && isIndeterminate) {
      parent.checked = false;
      parent.isIndeterminate = true;
    } else {
      parent.checked = allChecked;
      parent.isIndeterminate = false;
    }

    return parent;
  };

  const handleCheck = (node) => {
    const item = checkItems;
    node.checked = !node.checked;
    if (node.checked) {
      node.isIndeterminate = false;
    }
    const status = node.checked;

    if (node.childrens) {
      setChildrenChecked(node.childrens, status);
    }

    const tempItem = { id: -1, childrens: item };
    let parent = { id: -2 };
    while (parent.id !== -1) {
      parent = findParent(tempItem, node);
      parent = setParentStatus(parent);
      node = parent;
    }

    const newItem = changeItem(item, node);
    setCheckItems(newItem);

    props.onChangeHandle(newItem);
  };

  const setChildrenChecked = (childrens, status) => {
    for (let i = 0; i < childrens.length; i++) {
      childrens[i].checked = status;
      if (status) {
        childrens[i].isIndeterminate = false;
      }
      if (childrens[i].childrens) {
        setChildrenChecked(childrens[i].childrens, status);
      }
    }
  };

  const changeItem = (item, node) => {
    for (let i = 0; i < item.length; i++) {
      if (item[i].id === node.id) {
        item[i] = node;
        return item;
      } else {
        if (item[i].childrens) {
          changeItem(item[i].childrens, node);
        }
      }
    }
    return item;
  };
  return (
    <>
      {checkItems.map((item) => (
        <CheckBox key={item.id} item={item} handleCheck={handleCheck} />
      ))}
    </>
  );
};

export default CheckBoxTreeHook;
