import Content from "../Content";
import Header from "../Header";
import SideBar from "../sidebar";

import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import "./layout.scss";
import Home from "../../views/Home";

function Layout() {
  return (
    <div className="layout">
      <div
        style={{
          width: "242px",
          height: "100vh",
          // maxWidth: "242px",
          position: "sticky",

          top: 0,
        }}
      >
        <SideBar />
      </div>
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <Header />

        <Content>
          <Outlet />
          {/* contents */}
        </Content>
      </div>
    </div>
  );
}

export default Layout;
