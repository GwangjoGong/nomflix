import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const SeriesContainer = styled.div`
  width: 600px;
  margin: 50px auto;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, 180px);
  grid-auto-rows: 200px;
`;

const SeriesItem = styled.div`
  background: ${(props) => `url(${props.bgUrl})`};
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
`;

const Series = ({ series }) => {
  return (
    <SeriesContainer>
      {series.map((s) => (
        <SeriesItem
          key={s.id}
          bgUrl={`https://image.tmdb.org/t/p/w300${s.poster_path}`}
        ></SeriesItem>
      ))}
    </SeriesContainer>
  );
};

Series.propTypes = {
  series: PropTypes.arrayOf(
    PropTypes.shape({
      air_date: PropTypes.string,
      episode_count: PropTypes.number,
      id: PropTypes.number,
      name: PropTypes.string,
      overview: PropTypes.string,
      poster_path: PropTypes.string,
      season_number: PropTypes.number,
    })
  ),
};

export default Series;
