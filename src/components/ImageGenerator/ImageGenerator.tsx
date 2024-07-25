import { useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import ProgressBar from "react-bootstrap/ProgressBar";

import placeholder from "../../assets/placeholder.svg";
import { useStableDiffusion } from "../../hooks/useGenerateImage";
import type { GalleryImage } from "../../store/stableDiffusion/types";

const ErrorAlert: React.FC<{ message: string; onClose: () => void }> = ({
  message,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <Alert variant="danger" dismissible onClose={onClose}>
      {message}
    </Alert>
  );
};

const Loading: React.FC<{ percentage: number }> = ({ percentage }) => (
  <Alert variant="light">
    <span>Generation progress: {percentage || 0}%</span>
    <ProgressBar now={percentage} variant="success" />
  </Alert>
);

const PlaceholderAlert: React.FC = () => (
  <div className="d-flex p-3" style={{ background: "transparent" }} />
);

const Gallery: React.FC<{ images: GalleryImage[] }> = ({ images }) => {
  return (
    <Carousel indicators={images.length > 1} controls={images.length > 1}>
      {images.map((item) => (
        <Carousel.Item key={item.id}>
          <Image
            src={`data:image/png;base64,${item.image}`}
            alt={item.prompt}
            thumbnail
            className="img-fluid"
            sizes="512px"
          />
          <Carousel.Caption className="bg-dark bg-opacity-50 rounded">
            <h5 className="text-white">{item.prompt}</h5>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

const ImageGenerator: React.FC = () => {
  const { step, error, loading, handleReset, gallery } = useStableDiffusion();

  return (
    <div style={{ height: 512, width: 512 }}>
      {!error && !loading && <PlaceholderAlert />}
      {error && <ErrorAlert message={error} onClose={handleReset} />}
      {loading && <Loading percentage={step} />}

      {gallery.length === 0 ? (
        <Image
          src={placeholder}
          alt="Placeholder Generated Image"
          thumbnail
          className="img-fluid"
        />
      ) : (
        <Gallery images={gallery} />
      )}
    </div>
  );
};

export default ImageGenerator;
