import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebsiteNavbarLayout from "./navbar/WebsiteNavbar.jsx";
import MainPage from "./pages/MainPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WebsiteNavbarLayout />}>
          <Route index element={<MainPage />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
