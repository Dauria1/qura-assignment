export const BASE = "stableDiffusion";
export const SET_IMAGE = `${BASE}/setImage`;
export const SET_STEP = `${BASE}/setStep`;
export const SET_COMPLETED = `${BASE}/setCompleted`;
export const SET_ERROR = `${BASE}/setError`;
export const RESET_STATE = `${BASE}/resetState`;
export const GENERATE_IMAGE = `${BASE}/generateImage`;
export const CANCEL_GENERATE_IMAGE = `${BASE}/cancelGenerateImage`;
export const SET_LOADING = `${BASE}/setLoading`;
export const ADD_TO_GALLERY = `${BASE}/addToGallery`;

export type GalleryImage = {
  id: string;
  image: string;
  prompt: string;
  createdAt?: string;
};

export type StableDiffusionRequest = {
  prompt: string;
  negative_prompt?: string;
  image_size?: [number, number];
  steps?: number;
  guidance_scale?: number;
};

export interface StableDiffusionState {
  image: string | null;
  step: number;
  completed: boolean;
  error: string | null;
  loading: boolean;
  gallery: GalleryImage[];
}
