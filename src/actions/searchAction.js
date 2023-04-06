import api from "../api/netease";
import { setKeyword, setResults } from "../reducers/search/searchReducer";

export const getSearchResults = (keyword) => async (dispatch) => {
  await api.get(`/search/suggest?keywords=${keyword}`).then((res) => {
    console.log(res);
    dispatch(setKeyword(keyword));
    dispatch(setResults(res.data.result.songs));
  });
};
