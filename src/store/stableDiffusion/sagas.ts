import type { EventChannel, SagaIterator } from "redux-saga";
import { eventChannel } from "redux-saga";
import { call, put, take, takeLatest, cancel, fork } from "redux-saga/effects";
import {
  setImage,
  setStep,
  setCompleted,
  setError,
  generateImage,
  cancelGenerateImage,
  setLoading,
  addToGallery,
} from "./actions";
import { env } from "../../env/env";

type WebSocketPayload = {
  image: string;
  step: number;
  completed: boolean;
};

const errorMessages: { [key: number]: string } = {
  1000: "Normal closure after successful image generation.",
  1003: "Invalid request format or invalid JSON.",
  3000: "Unauthorized access due to missing or invalid API key.",
  3003: "Invalid endpoint path.",
  1011: "Internal server error.",
  1013: "Service unavailable; all GPUs are in use or GPU had to be offloaded.",
  3008: "Request timed out; image generation took too long.",
};

function createWebSocketChannel(
  socket: WebSocket
): EventChannel<WebSocketPayload | Error> {
  return eventChannel((emit) => {
    socket.onmessage = (event) => {
      const data: WebSocketPayload = JSON.parse(event.data);
      emit(data);
    };

    socket.onerror = (event) => {
      if (event instanceof ErrorEvent) {
        emit(new Error(`Socket error: ${event.message}`));
      }
      emit(new Error("Unknown socket error"));
    };

    socket.onclose = (event: CloseEvent) => {
      const message = errorMessages[event.code] || "Unknown socket close error";
      emit(new Error(message));
    };

    return () => {
      socket.close();
    };
  });
}

function* handleWebSocketMessages(
  channel: EventChannel<WebSocketPayload | Error>,
  prompt: string
): SagaIterator {
  yield put(setLoading(true));
  try {
    while (true) {
      const payload = yield take(channel);

      if (payload instanceof Error) {
        yield put(setError(payload.message));
        yield put(setLoading(false));
        break;
      }

      yield put(setImage(payload.image));
      yield put(setStep(payload.step));
      yield put(setCompleted(payload.completed));
      yield put(setLoading(payload.step < 0 || !payload.completed));

      if (payload.completed) {
        yield put(
          addToGallery({
            id: Date.now().toString(),
            image: payload.image,
            prompt,
          })
        );
        yield put(setStep(0));
        break;
      }
    }
  } catch (err) {
    yield put(setError("Error processing WebSocket message"));
  } finally {
    yield put(setLoading(false));
    yield put(setCompleted(true));
  }
}

function* generateImageFromSocket(
  action: ReturnType<typeof generateImage>
): SagaIterator {
  if (action.payload.isErrorTest) {
    yield put(setError("Error triggered by user request"));
    return;
  }

  const BASE_URI = env.STABLE_DIFFUSION_WS_URI;
  const socket = new WebSocket(
    `${BASE_URI}/generate?token=${env.STABLE_DIFFUSION_API_KEY}`
  );

  socket.onopen = () => {
    socket.send(JSON.stringify(action.payload));
  };

  const channel = yield call(createWebSocketChannel, socket);
  const task = yield fork(
    handleWebSocketMessages,
    channel,
    action.payload.prompt
  );

  yield take(cancelGenerateImage.type);
  yield cancel(task);
  channel.close();
  socket.close();
}

export function* watchGenerateImage() {
  yield takeLatest(generateImage.type, generateImageFromSocket);
}
