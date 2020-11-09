import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Header = styled.div`
  margin-top: 20px;
  font-size: 24px;
  color: white;
`;

const CompanyContainer = styled.div`
  width: 100%;
  margin: 50px 0;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, 180px);
  grid-auto-rows: 200px;
`;

const Company = styled.div`
  background: ${(props) => `url(${props.bgUrl})`};
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
`;

const CountryContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 100px;
  width: 100%;
  display: flex;
`;

const Country = styled.div`
  width: fit-content;
  padding: 5px 10px;
  background: #f0932b;
  color: white;
  margin-right: 10px;
`;

const Productions = ({ companies, countries }) => {
  return (
    <>
      {companies && (
        <>
          <Header>Production Companies</Header>
          <CompanyContainer>
            {companies.map(
              (comp) =>
                comp.logo_path && (
                  <Company
                    key={comp.id}
                    bgUrl={`https://image.tmdb.org/t/p/w300${comp.logo_path}`}
                  ></Company>
                )
            )}
          </CompanyContainer>
        </>
      )}
      {countries && (
        <>
          <Header>Production Countries</Header>
          <CountryContainer>
            {countries.map((co) => (
              <Country key={co.iso_3166_1}>{co.name}</Country>
            ))}
          </CountryContainer>
        </>
      )}
    </>
  );
};

Productions.propTypes = {
  companies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      logo_path: PropTypes.string,
      name: PropTypes.string,
      origin_country: PropTypes.string,
    })
  ),
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      iso_3166_1: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};
export default Productions;
