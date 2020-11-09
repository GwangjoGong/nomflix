import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Video = ({ yid }) => (
  <Container>
    <iframe
      title="trailer"
      src={`https://youtube.com/embed/${yid}`}
      width="600px"
      height="400px"
    />
  </Container>
);

Video.propTypes = {
  yid: PropTypes.string.isRequired,
};
export default Video;
