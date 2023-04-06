import React from "react";
import { useSelector } from "react-redux";
import Player from "../Player";
import "./content.scss";
export default function Content({ children }) {
  // const playList = useSelector((state) => state.neteaseReducer.playList);
  console.log("content update");
  return (
    <div className="content">
      {children}

      <Player />
    </div>
  );
}
