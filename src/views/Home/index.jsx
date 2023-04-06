import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  getRecommendListFromNetease,
  getNewSongListFromNetease,
} from "../../actions/neteaseAction";
import HomeCard from "../../components/Card";
import "./home.scss";
import TitleContainer from "../../components/TitleContainer";
import { useNavigate } from "react-router";
export default function Home() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [elementId, setElementId] = useState("");
  const recommendList = useSelector(
    (state) => state.neteaseReducer.recommendList
  );
  const newSongList = useSelector((state) => state.neteaseReducer.newSongList);
  const navigate = useNavigate();
  let ti;
  const getRecommendList = async () => {
    await getRecommendListFromNetease(6)(dispatch);
  };
  const getNewSongList = async () => {
    await getNewSongListFromNetease()(dispatch);
  };

  useEffect(() => {
    setLoading(true);
    getRecommendList();
    getRecommendList();
    getNewSongList();
    setLoading(false);
    return () => {
      clearTimeout(ti);
    };
  }, [loading]);

  return (
    <div>
      <div className="recommendListContainer">
        <TitleContainer
          name="Recommend list"
          onclick={() => {
            navigate("/recommendAllList");
          }}
        />
        <div
          className="homeCardContainer"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
            flexWrap: "wrap",
            marginLeft: 50,
          }}
        >
          {loading === true ? (
            <>
              <HomeCard loading={loading} /> <HomeCard loading={loading} />
            </>
          ) : (
            recommendList.map((element) => {
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
                    loading={loading}
                    name={name}
                    picUrl={picUrl}
                    isHover={id === elementId}
                    id={id}
                    type="list"
                  />
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="newSongs">
        <TitleContainer name="New song" />
        <div
          className="homeCardContainer"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
            flexWrap: "wrap",

            marginLeft: 50,
          }}
        >
          {newSongList.map((element) => {
            const { name, id, album } = element;
            const { picUrl, artists } = album;
            const singerName = artists[0].name;
            // console.log(id);
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
                  loading={loading}
                  name={name}
                  id={id}
                  picUrl={picUrl}
                  singerName={singerName}
                  isHover={id === elementId}
                  type="song"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="recommendRadioContainer"></div>
    </div>
  );
}
