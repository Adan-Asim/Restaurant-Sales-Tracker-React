import React from "react";
import FormInputGroup from "./FormInputGroup.jsx";

const NoOptionsInput = ({ onChange }) => (
  <>
    {FormInputGroup({
      id: "price",
      label: "Price",
      ref: null,
      error: null,
      onChange: onChange,
    })}
    {FormInputGroup({
      id: "cost",
      label: "Cost",
      ref: null,
      error: null,
      onChange: onChange,
    })}
    {FormInputGroup({
      id: "stock",
      label: "Amount in stock",
      ref: null,
      error: null,
      onChange: onChange,
    })}
  </>
);

export default NoOptionsInput;
