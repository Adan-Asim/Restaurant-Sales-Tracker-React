import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Container, Button, Toast } from "react-bootstrap";
import {
  getAllItems,
  deleteItem,
  updateItem,
} from "../../services/FirebaseServices";
import EditOptionsModal from "./EditOptionsModal";

const TOAST_STATE = {
  SUCCESS: "success",
  FAILURE: "failure",
};

const DeleteButton = ({ onDeleteClick, id }) => {
  const handleDeleteClick = () => {
    onDeleteClick(id);
  };

  return (
    <Button variant="danger" size="sm" onClick={handleDeleteClick}>
      Delete
    </Button>
  );
};

const OptionsRenderer = ({ options }) => {
  return (
    <div className="flex flex-row overflow-x-auto">
      {options?.map((option) => (
        <div key={option.id}>
          <strong>{option.title}</strong>: Price - {option.price}, Cost -{" "}
          {option.cost}, Stock - {option.stock}
        </div>
      ))}
    </div>
  );
};

const ViewInventoryStatus = () => {
  const [existingItems, setExistingItems] = useState([]);
  const [toastInfo, setToastInfo] = useState({
    show: false,
    state: "",
    message: "",
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditOptionsModalOpen, setEditOptionsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const columnDefs = [
    { headerName: "Category", field: "category", editable: true, flex: 1.5 },
    { headerName: "Name", field: "name", editable: true, flex: 1.5 },
    { headerName: "Price", field: "price", editable: true, flex: 1 },
    { headerName: "Cost", field: "cost", editable: true, flex: 1 },
    {
      headerName: "Amount in Stock",
      field: "stock",
      editable: true,
      flex: 1.5,
    },
    {
      headerName: "Options",
      field: "options",
      editable: true,
      flex: 3,
      cellRenderer: (params) => <OptionsRenderer options={params.value} />,
    },
    {
      headerName: "Action",
      cellRenderer: (params) => (
        <DeleteButton onDeleteClick={handleDeleteRow} id={params.data.id} />
      ),
    },
  ];

  const gridOptions = {
    defaultColDef: {
      sortable: true,
      resizable: true,
      filter: true,
    },
    onGridReady: (params) => {
      params.api.sizeColumnsToFit();
    },
    onCellValueChanged: (params) => {
      handleEditRow(params.data);
    },
    domLayout: "autoHeight",
    getRowHeight: (params) => params.data.options?.length * 30 + 25,
    onCellClicked: (params) => {
      if (params.colDef.field === "options") {
        handleEditOptions(params.data);
      }
    },
  };

  const fetchData = () => {
    getAllItems()
      .then((items) => {
        const itemsArray = Object.keys(items || {}).map((key) => ({
          id: key,
          key: key,
          ...items[key],
        }));
        setExistingItems(itemsArray);
      })
      .catch((error) => {
        showToast(
          true,
          TOAST_STATE.FAILURE,
          "Error fetching data because" + error.message,
        );
      });
  };

  const handleEditRow = (editedItem) => {
    updateItem(editedItem.id, editedItem)
      .then(() => {
        fetchData();
        showToast(true, TOAST_STATE.SUCCESS, "Item updated successfully");
      })
      .catch((error) => {
        showToast(
          true,
          TOAST_STATE.FAILURE,
          "Error updating item because" + error.message,
        );
      });
  };

  const handleDeleteRow = async (itemId) => {
    try {
      await deleteItem(itemId);
      fetchData();
    } catch (error) {
      showToast(true, TOAST_STATE.FAILURE, "Error deleting item because" + error.message)
    }
  };

  const showToast = (show, state, message) => {
    setToastInfo({
      show: show,
      state: state,
      message: message,
    });
  };

  const handleEditOptions = (item) => {
    setSelectedItem(item);
    setEditOptionsModalOpen(true);
  };

  return (
    <Container className="mt-5">
      <h2>View Inventory Status</h2>

      <div
        className="ag-theme-alpine mt-3"
        style={{ height: 600, width: "100%" }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={existingItems}
          gridOptions={gridOptions}
          overlayNoRowsTemplate={"Loading data..."}
        />
      </div>

      <Toast
        show={toastInfo.show}
        onClose={() => showToast(false, "", "")}
        delay={3500}
        animation
        autohide
        style={{
          position: "fixed",
          bottom: "8%",
          left: "40%",
          zIndex: 9999,
          transition: "transform 0.5s ease-in-out",
          transform: toastInfo.show ? "translateY(0)" : "translateY(100%)",
          backgroundColor:
            toastInfo.state === TOAST_STATE.SUCCESS ? "#20B2AA" : "#dc3545",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toast.Body className="text-white font-bold text-center">
          {toastInfo.message}
        </Toast.Body>
      </Toast>

      {isEditOptionsModalOpen && selectedItem && (
        <EditOptionsModal
          selectedItem={selectedItem}
          onClose={() => setEditOptionsModalOpen(false)}
          handleEditRow={handleEditRow}
        />
      )}
    </Container>
  );
};

export default ViewInventoryStatus;
