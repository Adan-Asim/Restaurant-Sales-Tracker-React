import React from "react";
import { Form, Button } from "react-bootstrap";

const OptionsInput = ({
  item,
  handleOptionChange,
  handleRemoveOption,
  handleAddOption,
}) => (
  <div className="option-inputs">
    {item?.options?.map((option, index) => (
      <div key={index}>
        <h4 className="my-3">Option #{index + 1}: </h4>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder={`Enter Title`}
            value={option.title}
            onChange={(e) => handleOptionChange(index, "title", e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            placeholder={`Enter Price`}
            value={option.price}
            onChange={(e) => handleOptionChange(index, "price", e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Cost</Form.Label>
          <Form.Control
            type="text"
            placeholder={`Enter Cost`}
            value={option.cost}
            onChange={(e) => handleOptionChange(index, "cost", e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="text"
            placeholder={`Enter Stock`}
            value={option.stock}
            onChange={(e) => handleOptionChange(index, "stock", e.target.value)}
          />
        </Form.Group>

        <Button
          variant="danger"
          size="sm"
          onClick={() => handleRemoveOption(option)}
          className="float-end ms-3"
        >
          Remove Option
        </Button>
      </div>
    ))}
    <Button
      variant="primary"
      size="sm"
      onClick={handleAddOption}
      className="float-end px-3"
    >
      Add Option
    </Button>
  </div>
);

export default OptionsInput;
