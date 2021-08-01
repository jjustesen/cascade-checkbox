import React, { Component } from "react";
import PropTypes from "prop-types";

import CheckBox from "./CheckBox";

class CheckBoxTreeClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: this.props.item,
    };

    this.id = 0;
  }

  componentDidMount() {
    const packageWithId = this.makePackageWithId(this.props.item);

    const tempItem = { id: -1, childrens: packageWithId };
    let parent = { id: -2 };
    let nodeArray = this.findLastestNode(packageWithId, []);

    for (let i = 0; i < nodeArray.length; i++) {
      let node = nodeArray[i];
      parent = { id: -2 };
      while (parent.id !== -1) {
        parent = this.findParent(tempItem, node);
        parent = this.setParentStatus(parent);
        node = parent;
      }
    }
    this.setState({
      item: packageWithId,
    });
  }

  makePackageWithId = (item) => {
    for (let i = 0; i < item.length; i++) {
      if (item[i].checked === undefined) {
        item[i].checked = false;
      }
      if (item[i].isIndeterminate === undefined) {
        item[i].isIndeterminate = false;
      }
      item[i].id = this.id++;

      if (item[i].childrens) {
        this.makePackageWithId(item[i].childrens);
      }
    }
    return item;
  };

  findLastestNode = (node, array) => {
    for (let i = 0; i < node.length; i++) {
      if (node[i].childrens) {
        this.findLastestNode(node[i].childrens, array);
      } else {
        array.push(node[i]);
      }
    }
    return array;
  };

  findParent = (parent, node) => {
    if (parent.childrens) {
      for (let i = 0; i < parent.childrens.length; i++) {
        if (parent.childrens[i].id === node.id) {
          return parent;
        }
        if (parent.childrens[i].childrens) {
          const result = this.findParent(parent.childrens[i], node);
          if (result !== null) {
            return result;
          }
        }
      }
    }
    return null;
  };

  setParentStatus = (parent) => {
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

  handleCheck = (node) => {
    const item = this.state.item;
    node.checked = !node.checked;
    if (node.checked) {
      node.isIndeterminate = false;
    }
    const status = node.checked;

    if (node.childrens) {
      this.setChildrenChecked(node.childrens, status);
    }

    const tempItem = { id: -1, childrens: item };
    let parent = { id: -2 };
    while (parent.id !== -1) {
      parent = this.findParent(tempItem, node);
      parent = this.setParentStatus(parent);
      node = parent;
    }

    const newItem = this.changeItem(item, node);
    this.setState({
      item: newItem,
    });

    this.props.onChangeHandle(newItem);
  };

  setChildrenChecked = (childrens, status) => {
    for (let i = 0; i < childrens.length; i++) {
      childrens[i].checked = status;
      if (status) {
        childrens[i].isIndeterminate = false;
      }
      if (childrens[i].childrens) {
        this.setChildrenChecked(childrens[i].childrens, status);
      }
    }
  };

  changeItem = (item, node) => {
    for (let i = 0; i < item.length; i++) {
      if (item[i].id === node.id) {
        item[i] = node;
        return item;
      } else {
        if (item[i].childrens) {
          this.changeItem(item[i].childrens, node);
        }
      }
    }
    return item;
  };

  render() {
    return (
      <>
        {this.state.item.map((item) => (
          <CheckBox key={item.id} item={item} handleCheck={this.handleCheck} />
        ))}
      </>
    );
  }
}

CheckBoxTreeClass.propTypes = {
  item: PropTypes.array,
};

export default CheckBoxTreeClass;
