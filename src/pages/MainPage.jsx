import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import AddNewItem from "../components/AddNewItem/AddNewItem";
import ViewInventoryStatus from "../components/ViewInventoryStatus/ViewInventoryStatus";

const MainPage = () => {
  return (
    <div className="container mt-5 ">
      <Tabs defaultActiveKey="ViewInventoryStatus" id="home-tabs">
        <Tab eventKey="ViewInventoryStatus" title="View Inventory Status">
          <ViewInventoryStatus />
        </Tab>
        <Tab eventKey="AddNewItem" title="Add New Item">
          <AddNewItem getParkingLotState={[]} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default MainPage;
