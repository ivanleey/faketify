import React from "react";
import { useLocation, useNavigate } from "react-router";
import "./header.scss";
import { BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { getSearchResults } from "../../actions/searchAction";
export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      getSearchResults(e.target.value)(dispatch);
    }
  };

  return (
    <div className="header">
      <div className="fb-button">
        <div
          className="back"
          onClick={() => {
            navigate(-1);
          }}
        >
          <svg
            width="16px"
            height="16px"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z"
              fill="#ffffff"
            />
          </svg>
        </div>
        <div
          className="forward"
          onClick={() => {
            navigate(1);
          }}
        >
          <svg
            width="16px"
            height="16px"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z"
              fill="#ffffff"
            />
          </svg>
        </div>
        {pathname === "/search" ? (
          <div>
            <input
              type="text"
              className="searchInput"
              placeholder="What do you want to listen to?"
              onKeyDown={(e) => {
                handleSearch(e);
              }}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="right-items">
        <div className="signUp">Sign up</div>
        <div className="login">Log in</div>
      </div>
    </div>
  );
}
