import { combineReducers } from "@reduxjs/toolkit";
import { stableDiffusionReducer } from "./stableDiffusion";

const rootReducer = combineReducers({
  stableDiffusion: stableDiffusionReducer,
});

export default rootReducer;
