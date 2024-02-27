import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormInputGroup from "./FormInputGroup.jsx";
import OptionsInput from "./OptionsInput.jsx";
import AlertMessage from "./AlertMessage.jsx";
import CostPriceStockInputs from "./NoOptionsInput.jsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AddNewItemValidationSchema from "../../validations/AddNewItemValidationSchema";
import { createItem } from "../../firebaseServices/FirebaseServices";

const AddNewItemForm = ({ item, setItem, fetchData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddNewItemValidationSchema),
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setItem({ ...item, [e.target.id]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setItem({ ...item, [e.target.id]: e.target.checked });
  };

  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...item.options];
    updatedOptions[index][field] = value;
    setItem({ ...item, options: updatedOptions });
  };

  const handleAddOption = () => {
    setItem({
      ...item,
      options: [...item.options, { title: "", price: "", cost: "", stock: "" }],
    });
  };

  const handleRemoveOption = (removedOption) => {
    const updatedOptions = item.options.filter(
      (option) => option !== removedOption,
    );
    setItem({ ...item, options: updatedOptions });
  };

  const onSubmit = () => {
    const areOptionsValid = item.hasOptions
      ? item.options.every((option) => {
          return (
            option.title.trim() !== "" &&
            !isNaN(option.price) &&
            !isNaN(option.cost) &&
            !isNaN(option.stock)
          );
        })
      : item.price.trim() !== "" &&
        item.cost.trim() !== "" &&
        item.stock.trim() !== "";

    if (!areOptionsValid) {
      setMessage(
        "Error: All fields are required, and make sure they're in a valid format.",
      );
      return;
    }

    setLoading(true);
    setMessage("");

    const updatedItem = {
      name: item.name,
      category: item.category,
    };

    if (!item.hasOptions) {
      updatedItem.price = item.price;
      updatedItem.cost = item.cost;
      updatedItem.stock = item.stock;
    } else {
      updatedItem.options = item.options;
    }

    createItem(updatedItem)
      .then(() => {
        fetchData();
        setMessage("Item submitted successfully.");
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
        setItem({
          name: "",
          category: "",
          hasOptions: false,
          price: "",
          cost: "",
          stock: "",
          options: [],
        });
      });
  };

  return (
    <>
      <Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        {FormInputGroup({
          id: "name",
          label: "Item Name",
          ref: register("name"),
          error: errors.name,
          onChange: handleChange,
        })}
        {FormInputGroup({
          id: "category",
          label: "Category",
          ref: register("category"),
          error: errors.category,
          onChange: handleChange,
        })}
        <Form.Group controlId="hasOptions" style={{ marginBottom: "15px" }}>
          <Form.Check
            type="checkbox"
            label="Has Options"
            checked={item.hasOptions}
            onChange={handleCheckboxChange}
          />
        </Form.Group>

        {!item.hasOptions ? (
          <CostPriceStockInputs onChange={handleChange} />
        ) : (
          <OptionsInput
            item={item}
            handleOptionChange={handleOptionChange}
            handleRemoveOption={handleRemoveOption}
            handleAddOption={handleAddOption}
          />
        )}

        <Button
          variant="primary"
          type="submit"
          className="my-5"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </Form>

      {message && <AlertMessage message={message} />}
    </>
  );
};

export default AddNewItemForm;
