import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const WebsiteNavbar = () => {
  return (
    <>
      <Navbar
        variant="dark"
        expand="lg"
        sticky="top"
        style={{ padding: "40px 100px 20px 40px", backgroundColor: "#008080" }}
      >
        <Container fluid>
          <Navbar.Brand href="/">
            <h3>Restaurants Sales Tracker</h3>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav"></Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default WebsiteNavbar;
