import api from "../api/netease";
import {
  getRecommendList,
  getNewSongList,
  getPlayListDetails,
  addSongsInPlayList,
} from "../reducers/netease/neteaseReducer";

//get recommend list
export const getRecommendListFromNetease = (amount) => async (dispatch) => {
  await api.get(`/personalized?limit=${amount}`).then((res) => {
    console.log(res);
    dispatch(getRecommendList(res.data.result));
  });
};

//get new Song list

export const getNewSongListFromNetease = () => async (dispatch) => {
  await api.get("/top/song?type=96").then((res) => {
    console.log("new song", res.data.data);
    dispatch(getNewSongList(res.data.data));
    // dispatch(getNewSongList)
  });
};

export const getPlayListDetailsFromNetease = (id) => async (dispatch) => {
  await api.get(`playlist/detail?id=${id}`).then((res) => {
    console.log("playlistdetailsssss", res.data);
    dispatch(getPlayListDetails(res.data));
  });
};

export const addSongsInPlayListAction = (data) => async (dispatch) => {
  dispatch(addSongsInPlayList(data));
};
