import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "searchReducer",
  initialState: {
    keyword: "",
    results: [],
  },
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    setResults: (state, action) => {
      //   if (action.payload === undefined || action.payload === null) {
      //     state.results = [
      //       {
      //         artists: [
      //           {
      //             name: "not found",
      //             img1v1Url:
      //               "https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
      //           },
      //         ],
      //         duration: 0,
      //         id: "not found",
      //         name: "not found",
      //       },
      //     ];
      //   }
      state.results = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setKeyword, setResults } = searchSlice.actions;

export default searchSlice.reducer;
