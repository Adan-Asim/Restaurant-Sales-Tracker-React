import React, {useState} from "react";
import { Tabs, Tab } from "react-bootstrap";
import AddNewItem from "../components/AddNewItem/AddNewItem";
import ViewInventoryStatus from "../components/ViewInventoryStatus/ViewInventoryStatus";
import {
  getAllItems,
} from "../firebaseServices/FirebaseServices";

const MainPage = () => {
  const [existingItems, setExistingItems] = useState([]);

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
        console.error("Error fetching items: ", error);
      });
  };

  return (
    <div className="container mt-5 ">
      <Tabs defaultActiveKey="ViewInventoryStatus" id="home-tabs">
        <Tab eventKey="ViewInventoryStatus" title="View Inventory Status">
          <ViewInventoryStatus existingItems={existingItems} fetchData={fetchData}/>
        </Tab>
        <Tab eventKey="AddNewItem" title="Add New Item">
          <AddNewItem fetchData={fetchData} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default MainPage;
