import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import OptionsInput from "../AddNewItem/OptionsInput";

const EditOptionsModal = ({ selectedItem, onClose, handleEditRow }) => {
  const [item, setItem] = useState(selectedItem);

  const handleOptionChange = (index, field, value) => {
    const updatedItem = { ...item };
    updatedItem.options[index] = {
      ...updatedItem.options[index],
      [field]: value,
    };
    setItem(updatedItem);
  };

  const handleRemoveOption = (removedOption) => {
    const updatedItem = { ...item };
    updatedItem.options = updatedItem.options.filter(
      (option) => option !== removedOption,
    );
    setItem(updatedItem);
  };

  const handleAddOption = () => {
    const updatedItem = { ...item };
    if (!updatedItem.options) {
      updatedItem.options = [];
    }

    updatedItem.options.push({ title: "", price: "", cost: "", stock: "" });
    setItem(updatedItem);
  };

  const handleSaveChanges = () => {
    if (!selectedItem?.options && !!item?.options) {
      item.price = "";
      item.cost = "";
      item.stock = "";
    }

    handleEditRow(item);
    onClose();
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Options</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "80vh", overflowY: "auto" }}>
        <OptionsInput
          item={item}
          handleOptionChange={handleOptionChange}
          handleRemoveOption={handleRemoveOption}
          handleAddOption={handleAddOption}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditOptionsModal;
