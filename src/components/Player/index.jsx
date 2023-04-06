import React, { useEffect, useRef, useState } from "react";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";
import { useSelector } from "react-redux";
import axios from "axios";
import { FiVolume2 } from "react-icons/fi";
import { MdOutlineLyrics } from "react-icons/md";
import "./player.scss";
export default function Player(props) {
  const [songUrl, setSongUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  const songRef = useRef();
  const intervalRef = useRef();
  const countRef = useRef(1);
  const progressBarRef = useRef();
  const songs = useSelector((state) => state.neteaseReducer.playList);
  const idd = useSelector((state) => state.neteaseReducer.idd);
  const { name, ar, al } = songs[songIndex];
  const [tracking, setTracking] = useState({ now: "0:00", dura: "0:00" });
  // useEffect(() => {
  //   console.log("songs list change");
  // }, [songs]);

  const onChangeVolume = (e) => {
    if (!!songRef) {
      songRef.current.volume = e.target.value / 100;
    }
  };

  const handleProgressChange = (e) => {
    songRef.current.currentTime =
      (e.target.value / 100) * songRef.current.duration;
  };
  const trackProgress = () => {
    progressBarRef.current.value =
      (songRef.current.currentTime / songRef.current.duration) * 100;

    setTracking({
      now: millisToMinutesAndSeconds(songRef.current.currentTime * 1000),
      dura: millisToMinutesAndSeconds(songRef.current.duration * 1000),
    });
  };

  const timer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (songRef.current.ended) {
        nextSong();
      } else {
        console.log(1);
        trackProgress();
      }
    }, 1000);
  };
  // const { songs } = props;
  // const songList = props.songs;

  const onPlay = () => {
    if (isPlaying === false) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const nextSong = () => {
    let listLength = songs.length;
    if (songIndex + 1 < listLength) {
      let next = songIndex + 1;
      // clearInterval(intervalRef.current);
      setSongIndex(next);
      setIsPlaying(true);
    } else {
    }
  };

  const previousSong = () => {
    if (songIndex - 1 > -1) {
      let previous = songIndex - 1;
      // clearInterval(intervalRef.current);
      setSongIndex(previous);
      setIsPlaying(true);
    } else {
    }
  };
  const getSongUrl = async (id) => {
    await axios.get(`http://localhost:3000/song/url?id=${id}`).then((res) => {
      setSongUrl(res.data.data[0].url);
    });
  };

  useEffect(() => {
    if (songIndex >= 0) {
      const { id } = songs[songIndex];
      getSongUrl(id);
    }
  }, [songIndex]);

  useEffect(() => {
    if (isPlaying) {
      countRef.current = 8;
      console.log(songRef.current.currentTime);
      // console.log("timer run");
      songRef.current.play();
      timer();
    } else {
      songRef.current.pause();

      clearInterval(intervalRef.current);
    }
  }, [isPlaying]);
  useEffect(() => {
    console.log("they change");
  }, [isPlaying, songIndex]);

  useEffect(() => {
    setSongIndex(0);
    if (countRef.current <= 3) {
    } else {
      setIsPlaying(true);
    }
    countRef.current += countRef.current + 1;
    // console.log("runrunrun");

    if (songIndex >= 0) {
      const { id } = songs[songIndex];
      getSongUrl(id);
    }
  }, [songs]);
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  return (
    <div className="audioPlayerContainer">
      <div className="playerAvatarAndName">
        <img src={al.picUrl} alt="" width="60px" height="60px" />
        <div className="nameAndArtist">
          <div>{name}</div>
          <div>{ar[0].name}</div>
        </div>
      </div>
      <div className="playerControlBar">
        <div className="playControlButtons">
          <div className="playControlButtonPrevious" onClick={previousSong}>
            <BiSkipPrevious size={30} />
          </div>
          <div onClick={onPlay} className="playControlButtonPlay">
            {isPlaying === true ? (
              <AiFillPauseCircle size={45} color={"#1cdf63"} />
            ) : (
              <AiFillPlayCircle size={45} color={"#1cdf63"} />
            )}
          </div>
          <div onClick={nextSong} className="playControlButtonNext">
            <BiSkipNext size={30} />
          </div>
        </div>
        <div className="playerProgressBar">
          <span className="time-current">{tracking.now}</span>
          <input
            type="range"
            className="progressBar"
            ref={progressBarRef}
            defaultValue="0"
            onChange={handleProgressChange}
          />
          <span className="time">{tracking.dura}</span>
        </div>
      </div>
      <div className="playerFunctions">
        <div className="lyricIcon">
          <MdOutlineLyrics size={20} />
        </div>
        <div>
          <FiVolume2 size={20} />
        </div>
        <div>
          <input
            type="range"
            className="volumeBar"
            defaultValue="30"
            onChange={onChangeVolume}
          />
        </div>

        <audio ref={songRef} src={songUrl} autoPlay />
      </div>
    </div>
  );
}
