import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecommendListFromNetease } from "../../actions/neteaseAction";
import HomeCard from "../../components/Card";
export default function RecommendAllList() {
  const [elementId, setElementId] = useState("");
  const dispatch = useDispatch();
  const getRecommendList = async () => {
    await getRecommendListFromNetease(20)(dispatch);
  };
  const allRecommendList = useSelector(
    (state) => state.neteaseReducer.recommendList
  );
  //   const allRecommendList = [];

  useEffect(() => {
    getRecommendList();
  }, []);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        padding: "20px",
      }}
    >
      {allRecommendList.map((element, index) => {
        const { name, picUrl, id } = element;
        return (
          <div
            key={id}
            onMouseOver={() => {
              setElementId(id);
            }}
            onMouseOut={() => {
              setElementId("");
            }}
          >
            <HomeCard
              loading={false}
              name={name}
              picUrl={picUrl}
              isHover={id === elementId}
            />
          </div>
        );
      })}
    </div>
  );
}
