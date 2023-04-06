import React from "react";
import "./titlecontainer.scss";
export default function TitleContainer(props) {
  const { name, onclick } = props;
  return (
    <div className="homeTitleContainer">
      <div style={{ fontSize: 24 }}>{name}</div>
      <div
        className="showAll"
        style={{ color: "#B3B3B3", fontSize: 14 }}
        onClick={onclick}
      >
        Show all
      </div>
    </div>
  );
}
