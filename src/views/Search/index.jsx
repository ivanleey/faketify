import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeCard from "../../components/Card";
import "./search.scss";
import {
  addSongsInPlayListAction,
  getNewSongListFromNetease,
} from "../../actions/neteaseAction";

export default function Search() {
  const newSongList = useSelector((state) => state.neteaseReducer.newSongList);
  const dispatch = useDispatch();

  const keyword = useSelector((state) => state.searchReducer.keyword);
  const songs = useSelector((state) => state.searchReducer.results);

  const getNewSongList = async () => {
    await getNewSongListFromNetease()(dispatch);
  };
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
  const addToPlayList = (element) => {
    const { name, id, artists } = element;

    let data = {
      name,
      id,
      ar: [
        {
          name: artists[0].name,
        },
      ],
      al: {
        picUrl: artists[0].img1v1Url,
      },
    };
    addSongsInPlayListAction(data)(dispatch);
  };
  useEffect(() => {
    getNewSongList();
  }, []);
  return (
    <div className="searchContainer">
      {keyword === "" ? (
        <div style={{ display: "flex", padding: 10, flexWrap: "wrap" }}>
          {newSongList.map((element) => {
            const { name, id, album } = element;
            const { picUrl, artists } = album;
            const singerName = artists[0].name;
            // console.log(id);
            return (
              <HomeCard
                loading={false}
                name={name}
                id={id}
                picUrl={picUrl}
                singerName={singerName}
                type="song"
              />
            );
          })}
        </div>
      ) : (
        <div className="topResultAndSongsContainer">
          <div
            style={{
              width: "400px",
              display: "flex",
              color: "white",
              fontSize: "24px",
              flexDirection: "column",
            }}
          >
            <div>Top Result</div>
            <div className="topResultCard">
              <img
                src={songs[0].artists[0].img1v1Url}
                alt=""
                width="80px"
                height="80px"
              />
              <div className="topResultText" style={{ marginTop: "20px" }}>
                {songs[0].name}
              </div>
            </div>
          </div>
          <div className="searchResultSongsContainer">
            <div style={{ fontSize: 24 }}>Songs</div>
            {songs.map((element) => {
              const { name, duration } = element;
              return (
                <div
                  className="searchResultBar"
                  onClick={() => {
                    addToPlayList(element);
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <img
                      src={songs[0].artists[0].img1v1Url}
                      alt=""
                      width="40px"
                      height="40px"
                    />
                    <div style={{ marginLeft: 10 }}>
                      <div>{name}</div>
                      <div>{element.artists[0].name}</div>
                    </div>
                  </div>
                  <div>{millisToMinutesAndSeconds(duration)}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
