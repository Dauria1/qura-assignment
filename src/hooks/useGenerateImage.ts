import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { resetState, generateImage } from "../store/stableDiffusion/actions";

export const useStableDiffusion = () => {
  const [prompt, setPrompt] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { image, step, completed, error, loading, gallery } = useSelector(
    (state: RootState) => state.stableDiffusion
  );

  useEffect(() => {
    if (completed) {
      setPrompt("");
    }
  }, [completed]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() === "Error") {
      dispatch(generateImage({ prompt, isErrorTest: true }));
    } else {
      dispatch(generateImage({ prompt }));
    }
  };

  const handleReset = () => {
    dispatch(resetState());
    setPrompt("");
  };

  return {
    prompt,
    setPrompt,
    image,
    step,
    completed,
    error,
    handleSubmit,
    handleReset,
    loading,
    gallery,
  };
};
