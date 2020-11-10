import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Message from "Components/Message";
import { Helmet } from "react-helmet";
import { Link, Route, Switch, withRouter } from "react-router-dom";
import Video from "Components/Video";
import Productions from "Components/Productions";
import Series from "Components/Series";
import Casts from "Components/Casts";
import Crews from "Components/Crews";

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;
const BackDrop = styled.div`
  width: 100%;
  height: 500px;
  background-image: url(${(props) => props.bgUrl});
  background-position: center center;
  background-size: cover;
  opacity: 0.5;
  z-index: -1;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  padding-top: 250px;
`;

const Cover = styled.div`
  width: 405px;
  height: 600px;
  background-image: url(${(props) => props.bgUrl});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
  position: absolute;
  z-index: 2;
  top: -400px;
  left: 50%;
  transform: translateX(-50%);
`;

const Data = styled.div`
  min-width: 500px;
  width: 50%;
  margin: 0 auto;
  padding-bottom: 100px;
`;

const Title = styled.h1`
  font-size: 50px;
  margin-bottom: 20px;
`;

const ItemContainer = styled.div`
  margin-bottom: 20px;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const GenreContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
`;

const Genre = styled.div`
  width: fit-content;
  padding: 5px 10px;
  background: #535c68;
  color: white;
  margin-right: 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  margin-bottom: 10px;
`;

const ViewMore = styled.a`
  color: #535c68;
  text-decoration: underline;
  font-size: 18px;
  display: inline-block;
  margin-bottom: 50px;
`;
const TabsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Tab = styled(Link)`
  border-top: 2px solid #f0932b;
  border-bottom: 2px solid #f0932b;
  border-right: 2px solid #f0932b;
  color: ${(props) => (props.current === "true" ? "white" : "#f0932b")};
  background-color: ${(props) =>
    props.current === "true" ? "#f0932b" : "transparent"};
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;

  transition: 0.3s ease-in-out;

  &:hover {
    color: white;
    background-color: #f0932b;
  }

  &:first-child {
    border-radius: 10px 0 0 10px;
    border-left: 2px solid #f0932b;
  }

  &:last-child {
    border-radius: 0 10px 10px 0;
    border-right: 2px solid #f0932b;
  }
`;
const Detail = ({ location, match, result, credit, loading, error }) => {
  return loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Container>
      <Message text={error} color="#e74c3c" />
    </Container>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <BackDrop
        bgUrl={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgUrl={`https://image.tmdb.org/t/p/original${result.poster_path}`}
        />
        <Data>
          <ItemContainer>
            <Item>
              {result.release_date && result.release_date.split("-")[0]}
            </Item>
            <Item>
              {result.first_air_date && result.first_air_date.split("-")[0]}
            </Item>
            <Divider>•</Divider>
            <Item>{result.runtime && result.runtime + " min"}</Item>
            <Item>
              {result.episode_run_time && result.episode_run_time[0] + " min"}
            </Item>
          </ItemContainer>
          <Title>{result.original_title && result.original_title}</Title>
          <Title>{result.original_name && result.original_name}</Title>
          <GenreContainer>
            {result.genres &&
              result.genres.map((genre, index) => (
                <Genre key={index}>{genre.name}</Genre>
              ))}
          </GenreContainer>
          <Overview>{result.overview}</Overview>
          <ViewMore href={`https://www.imdb.com/title/${result.imdb_id}`}>
            View More
          </ViewMore>
          {credit.cast && credit.cast.length > 0 && (
            <Casts casts={credit.cast} />
          )}
          {result.original_name && credit.crew && credit.crew.length > 0 && (
            <Crews crews={credit.crew} />
          )}

          <TabsContainer>
            <Tab
              current={location.pathname.includes("/video").toString()}
              to={match.url + "/video"}
            >
              Videos
            </Tab>
            <Tab
              current={location.pathname.includes("/production").toString()}
              to={match.url + "/production"}
            >
              Productions
            </Tab>
            {result.original_name && (
              <Tab
                current={location.pathname.includes("/series").toString()}
                to={match.url + "/series"}
              >
                Series
              </Tab>
            )}
          </TabsContainer>
          <Switch>
            <Route path={`/movie/:id/video`} exact>
              {result.videos.results.map((vid) => (
                <Video key={vid.key} yid={vid.key} />
              ))}
            </Route>
            <Route path={`/show/:id/video`} exact>
              {result.videos.results.map((vid) => (
                <Video key={vid.key} yid={vid.key} />
              ))}
            </Route>
            <Route path={`/movie/:id/production`} exact>
              <Productions
                companies={result.production_companies}
                countries={result.production_countries}
              />
            </Route>
            <Route path={`/show/:id/production`} exact>
              <Productions
                companies={result.production_companies}
                countries={result.production_countries}
              />
            </Route>
            {result.original_name && result.seasons && (
              <Route path={`/show/:id/series`} exact>
                <Series series={result.seasons} />
              </Route>
            )}
          </Switch>
        </Data>
      </Content>
    </Container>
  );
};

Detail.propTypes = {
  result: PropTypes.object,
  credit: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default withRouter(Detail);
