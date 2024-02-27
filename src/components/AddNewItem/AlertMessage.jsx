import React from "react";
import { Alert } from "react-bootstrap";

const AlertMessage = ({ message }) => (
  <Alert variant={message.includes("success") ? "success" : "danger"}>
    {message}
  </Alert>
);

export default AlertMessage;
