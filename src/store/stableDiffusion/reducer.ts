import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";
import type { StableDiffusionState } from "./types";

const initialState: StableDiffusionState = {
  image: null,
  step: 0,
  completed: false,
  loading: false,
  error: null,
  gallery: [],
};

const stableDiffusionReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.setImage, (state, action) => {
      state.image = action.payload;
    })
    .addCase(actions.setLoading, (state, action) => {
      state.loading = action.payload;
    })
    .addCase(actions.setStep, (state, action) => {
      state.step = action.payload;
    })
    .addCase(actions.setCompleted, (state, action) => {
      state.completed = action.payload;
    })
    .addCase(actions.setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(actions.resetState, (state) => {
      Object.assign(state, initialState);
    })
    .addCase(actions.addToGallery, (state, action) => {
      state.gallery.push({
        ...action.payload,
        createdAt: new Date().toISOString(),
      });
    });
});

export default stableDiffusionReducer;
