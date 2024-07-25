import { all } from "redux-saga/effects";
import { watchGenerateImage } from "./stableDiffusion/sagas";

export default function* rootSaga() {
  yield all([watchGenerateImage()]);
}
