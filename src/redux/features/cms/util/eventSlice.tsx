import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";

const initialState = {
  highlightedEvent: null,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    highlightEvent: (state, action) => {
      state.highlightedEvent = action.payload;
    },
  },
});

export const { highlightEvent } = eventSlice.actions;
export const selectEvent = (store: RootState) => store.event;

export default eventSlice.reducer;
