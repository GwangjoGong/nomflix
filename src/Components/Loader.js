import React from "react";
import styled from "styled-components";
import Loading from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #7f8c8d;
  font-size: 30px;
`;

const Loader = () => (
  <Container>
    <Loading
      type="Rings"
      color="#fff"
      height={100}
      width={100}
      timeout={3000}
    />
  </Container>
);

export default Loader;
