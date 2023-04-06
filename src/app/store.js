import { configureStore } from "@reduxjs/toolkit";
import neteaseSlice from "../reducers/netease/neteaseReducer";
import searchSlice from "../reducers/search/searchReducer";

export default configureStore({
  reducer: {
    neteaseReducer: neteaseSlice,
    searchReducer: searchSlice,
  },
});
