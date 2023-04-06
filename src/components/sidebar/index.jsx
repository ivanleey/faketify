import React, { useEffect, useState } from "react";
import "./index.scss";
import sideBarList from "../../constant/sidebarList";
import spotifyLogo from "../../assets/logo/spotifyLogo.svg";
import { GlobalOutlined } from "@ant-design/icons";
import {
  BrowserRouter,
  useRoutes,
  Navigate,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
export default function SideBar() {
  const [choose, setChoose] = useState(0);

  const navigate = useNavigate();
  const mapLink = {
    0: "/home",
    1: "/search",
  };

  return (
    <div className="sidebarContainer">
      <div className="logo">
        <img
          src={spotifyLogo}
          alt="Faketify"
          width="130px"
          style={{ marginBottom: 18 }}
        />
      </div>
      {sideBarList.map((element, index) => {
        return (
          <div
            key={index}
            className="navItem"
            onClick={() => {
              setChoose(index);
              navigate(mapLink[index]);
            }}
          >
            {index === choose ? (
              <div className="itemIcon">{element.activeIcon}</div>
            ) : (
              <div className="itemIcon">{element.icon}</div>
            )}
            {/* <div className="itemIcon">{element.icon}</div> */}
            <div
              className={"itemName" + (index === choose ? "" : " itemDeactive")}
            >
              {element.name}
            </div>
          </div>
        );
      })}

      <div className="bottom-part">
        <div className="first-line">
          <div>Legal</div>
          <div>Privacy center</div>
        </div>

        <div className="first-line">
          <div>Privacy Policy</div>
          <div>Cookies</div>
        </div>
        <div className="first-line">
          <div>About Ads</div>
        </div>
        <div className="first-line">
          <div>Cookies</div>
        </div>

        <div className="language">
          <GlobalOutlined style={{ marginRight: 8 }} />
          English
        </div>
      </div>
    </div>
  );
}
