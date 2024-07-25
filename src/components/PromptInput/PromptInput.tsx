import { useRef } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";

import { useStableDiffusion } from "../../hooks/useGenerateImage";

const PromptInput: React.FC = () => {
  const { prompt, setPrompt, handleSubmit, loading } = useStableDiffusion();
  const formRef = useRef<HTMLFormElement>(null);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(event);
  };

  return (
    <Form className="mb-3" ref={formRef} onSubmit={handleFormSubmit}>
      <Form.Group className="mb-3" controlId="promptInput">
        <Form.Control
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
          autoComplete="off"
          autoCorrect="on"
        />
      </Form.Group>
      <ButtonGroup aria-label="Form Controls" className="d-flex w-100">
        <Button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          Generate Image
        </Button>
      </ButtonGroup>
    </Form>
  );
};

export default PromptInput;
