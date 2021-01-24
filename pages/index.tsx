import SVGBlob from "components/SVGBlob";
import Nav from "../components/Nav";
import styled from "styled-components";

const BlobContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100vw;
  height: 90vh;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
`;

const Index = () => {
  return (
    <div className="main">
      <Nav currentPage={""} />
      <BlobContainer>
        <SVGBlob amplitude={0.3} count={8} size={400} />
      </BlobContainer>
      <BlobContainer>
        <SVGBlob amplitude={0.3} count={8} size={400} />
      </BlobContainer>
    </div>
  );
};

export default Index;
