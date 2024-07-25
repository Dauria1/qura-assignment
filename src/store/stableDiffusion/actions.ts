import { createAction } from "@reduxjs/toolkit";
import type { GalleryImage, StableDiffusionRequest } from "./types";
import {
  ADD_TO_GALLERY,
  CANCEL_GENERATE_IMAGE,
  GENERATE_IMAGE,
  RESET_STATE,
  SET_COMPLETED,
  SET_ERROR,
  SET_IMAGE,
  SET_LOADING,
  SET_STEP,
} from "./types";

export const setImage = createAction<string>(SET_IMAGE);
export const setStep = createAction<number>(SET_STEP);
export const setCompleted = createAction<boolean>(SET_COMPLETED);
export const setError = createAction<string>(SET_ERROR);
export const setLoading = createAction<boolean>(SET_LOADING);
export const resetState = createAction(RESET_STATE);

export const generateImage = createAction<
  StableDiffusionRequest & { isErrorTest?: boolean }
>(GENERATE_IMAGE);

export const cancelGenerateImage = createAction(CANCEL_GENERATE_IMAGE);

export const addToGallery = createAction<GalleryImage>(ADD_TO_GALLERY);
