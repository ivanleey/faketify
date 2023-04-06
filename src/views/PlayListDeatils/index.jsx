import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { AiFillPlayCircle, AiOutlineHeart } from "react-icons/ai";
import {
  getPlayListDetailsFromNetease,
  addSongsInPlayListAction,
} from "../../actions/neteaseAction";
import "./playListDetails.scss";
import { useDispatch, useSelector } from "react-redux";
import { setIdd } from "../../reducers/netease/neteaseReducer";

export default function PlayListDetails() {
  const datas = useSelector((state) => state.neteaseReducer.playListDeatils);
  const tref = useRef();
  console.log("datas", datas);
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log("playlist details update");

  useEffect(() => {
    getPlayListDetailsFromNetease(id)(dispatch);
    console.log(tref);
  }, [id]);
  const {
    description,
    subscribedCount,
    trackCount,
    tracks,
    coverImgUrl,
    name,
    subscribers,
  } = datas.playlist;
  const des = description.split("。")[0];
  const addToPlayList = (element) => {
    const { name, id, ar, al } = element;
    dispatch(setIdd(id));
    let data = {
      name,
      id,
      ar: [
        {
          name: ar[0].name,
        },
      ],
      al: {
        picUrl: al.picUrl,
      },
    };
    addSongsInPlayListAction(data)(dispatch);
  };

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  return (
    <div className="pld">
      <div
        className="playListHeader"
        style={{
          backgroundImage: `url(
            ${subscribers[0]?.backgroundUrl}
          )`,
          backgroundSize: "100%",
        }}
      >
        <div>
          <img
            style={{ width: "200px", height: "200px" }}
            src={coverImgUrl}
            alt=""
          />
        </div>
        <div className="playListHeaderDesc">
          <div>Playlist</div>
          <div>{name}</div>
          <div>{des}</div>
          <div>{subscribedCount} likes ● 20+ Songs</div>
        </div>
      </div>
      <div className="controlBar">
        <div style={{ cursor: "pointer" }}>
          <AiFillPlayCircle size={60} color={"#1cdf63"} />
        </div>

        <div style={{ cursor: "pointer" }}>
          <AiOutlineHeart size={40} color={"#ffffff"} />
        </div>
      </div>
      <div className="songList">
        <div className="songListHeader">
          <div style={{ width: "4%", paddingLeft: 5 }}>#</div>
          <div style={{ width: "40%" }}>Title</div>
          <div style={{ width: "40%" }}>Album</div>
          <div style={{ width: "16%" }}>Time</div>
        </div>
        <hr />
        <div className="songRows">
          {tracks.map((element, index) => {
            return (
              <div
                className="songRow"
                key={element.id}
                onClick={() => {
                  addToPlayList(element);
                }}
              >
                <div style={{ width: "4%", paddingLeft: 5 }}>{index + 1}</div>
                <div
                  style={{
                    width: "40%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img src={element.al.picUrl} alt="" width="55px" />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "20px",
                    }}
                  >
                    {element.name}
                    <div>
                      {element.ar.map((ar) => {
                        return <div key={ar.id}>{ar.name}</div>;
                      })}
                    </div>
                  </div>
                </div>
                <div style={{ width: "40%" }}>{element.al.name}</div>
                <div style={{ width: "16%" }}>
                  {millisToMinutesAndSeconds(element.dt)}
                </div>
              </div>
            );
          })}
          <div style={{ height: "66px" }}></div>
        </div>
      </div>
    </div>
  );
}
