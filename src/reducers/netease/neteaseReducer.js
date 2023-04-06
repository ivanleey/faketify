import { createSlice } from "@reduxjs/toolkit";
import playerIcon from "../../assets/logo/playerIcon.png";
import axios from "axios";
export const neteaseSlice = createSlice({
  name: "neteaseReducer",
  initialState: {
    recommendList: [],
    newSongList: [],
    playListDeatils: {
      playlist: {
        description: "",
        subscribedCount: 0,
        trackCount: 0,
        tracks: [],
        coverImgUrl: "",
        name: "",
        subscribers: [],
      },
    },
    playList: [
      {
        name: "",
        id: 0,
        ar: [
          {
            name: "",
          },
        ],
        al: {
          picUrl: playerIcon,
        },
      },
    ],
    idd: 0,
    searchResult: {
      songs: [],
      playlists: [],
    },
  },
  reducers: {
    getRecommendList: (state, action) => {
      state.recommendList = action.payload;
      // console.log(action.payload);
    },
    getNewSongList: (state, action) => {
      state.newSongList = action.payload;
    },
    getPlayListDetails: (state, action) => {
      // console.log(action.payload)
      state.playListDeatils = action.payload;
    },
    addSongsInPlayList: (state, action) => {
      state.playList = [action.payload, ...state.playList];
    },
    setIdd: (state, action) => {
      state.idd = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getRecommendList,
  getNewSongList,
  getPlayListDetails,
  addSongsInPlayList,
  setIdd,
} = neteaseSlice.actions;

export default neteaseSlice.reducer;
