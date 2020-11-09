import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Header = styled.div`
  margin-top: 20px;
  font-size: 24px;
  color: white;
`;

const CastsContainer = styled.div`
  width: 100%;
  margin: 50px auto;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, 120px);
  grid-auto-rows: 200px;
`;

const Name = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);

  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 10px;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transition: 0.3s ease-in-out;
`;

const CastItem = styled.div`
  background: ${(props) => `url(${props.bgUrl})`};
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  position: relative;

  &:hover {
    ${Name} {
      opacity: 1;
    }
  }
`;

const Casts = ({ casts }) => {
  return (
    <>
      <Header>Casts</Header>
      <CastsContainer>
        {casts.map((cast) => (
          <CastItem
            bgUrl={
              cast.profile_path
                ? `https://image.tmdb.org/t/p/w300${cast.profile_path}`
                : "https://nomadcoders.co/m.png"
            }
          >
            <Name>{cast.name}</Name>
          </CastItem>
        ))}
      </CastsContainer>
    </>
  );
};

Casts.propTypes = {
  casts: PropTypes.arrayOf(
    PropTypes.shape({
      cast_id: PropTypes.number,
      character: PropTypes.string,
      credit_id: PropTypes.string,
      gender: PropTypes.number,
      id: PropTypes.number,
      name: PropTypes.string,
      order: PropTypes.number,
      profile_path: PropTypes.string,
    })
  ),
};
export default Casts;
