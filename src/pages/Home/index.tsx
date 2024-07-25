import PromptInput from "../../components/PromptInput";
import ImageGenerator from "../../components/ImageGenerator";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home: React.FC = () => {
  return (
    <Container className="text-center justify-content-md-center w-50">
      <Row className="justify-content-center">
        <Col xs={20} md={16} lg={12}>
          <h1 className="mb-4">Qura Frontend Assignment</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <PromptInput />
        <ImageGenerator />
      </Row>
    </Container>
  );
};

export default Home;
