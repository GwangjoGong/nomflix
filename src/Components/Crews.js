import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Header = styled.div`
  margin-top: 20px;
  font-size: 24px;
  color: white;
`;

const CrewsContainer = styled.div`
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

const CrewItem = styled.div`
  background: ${(props) => `url(${props.bgUrl})`};
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  color: white;

  &:hover {
    ${Name} {
      opacity: 1;
    }
  }
`;

const Crews = ({ crews }) => {
  return (
    <>
      <Header>Crews</Header>
      <CrewsContainer>
        {crews.slice(0, 13).map((crew) => (
          <CrewItem
            key={crew.credit_id}
            bgUrl={
              crew.profile_path
                ? `https://image.tmdb.org/t/p/w200${crew.profile_path}`
                : "https://nomadcoders.co/m.png"
            }
          >
            <Name>{crew.name}</Name>
          </CrewItem>
        ))}
        {crews.length >= 14 && (
          <CrewItem>{`And ${crews.length - 14} more`}</CrewItem>
        )}
      </CrewsContainer>
    </>
  );
};

Crews.propTypes = {
  crews: PropTypes.arrayOf(
    PropTypes.shape({
      credit_id: PropTypes.string,
      department: PropTypes.string,
      gender: PropTypes.number,
      id: PropTypes.number,
      name: PropTypes.string,
      job: PropTypes.string,
      profile_path: PropTypes.string,
    })
  ),
};
export default Crews;
