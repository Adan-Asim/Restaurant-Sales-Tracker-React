import React, { useState } from "react";
import { Container } from "react-bootstrap";
import AddNewItemForm from "./AddNewItemForm.jsx";

const AddNewItemComponent = () => {
  const [item, setItem] = useState({
    name: "",
    category: "",
    hasOptions: false,
    price: "",
    cost: "",
    stock: "",
    options: [],
  });

  return (
    <Container className="mt-5">
      <h2>Add New Item</h2>
      <AddNewItemForm item={item} setItem={setItem} />
    </Container>
  );
};

export default AddNewItemComponent;
