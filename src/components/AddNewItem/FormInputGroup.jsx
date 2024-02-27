import React from "react";
import { Form } from "react-bootstrap";

const FormInputGroup = ({ id, label, ref, error, onChange }) => (
  <Form.Group controlId={id} style={{ marginBottom: "15px" }}>
    <Form.Label>{label}</Form.Label>
    <Form.Control
      type="text"
      placeholder={`Enter ${label?.toLowerCase()}`}
      {...ref}
      isInvalid={!!error}
      onChange={onChange}
    />
    {error && (
      <Form.Control.Feedback type="invalid">
        {error.message}
      </Form.Control.Feedback>
    )}
  </Form.Group>
);

export default FormInputGroup;
