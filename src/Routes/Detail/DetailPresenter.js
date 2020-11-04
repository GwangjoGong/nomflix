import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Loader from 'Components/Loader'
import Message from 'Components/Message'
import { Helmet } from 'react-helmet'

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 30px;
`
const BackDrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgUrl});
  background-position: center center;
  background-size: cover;
  filter: blur(2px);
  opacity: 0.5;
  z-index: 0;
`

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`

const Cover = styled.div`
  width: 30%;
  height: 100%;
  background-image: url(${(props) => props.bgUrl});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`

const Data = styled.div`
  width: 70%;
  padding-left: 50px;
`

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
`

const ItemContainer = styled.div`
  margin-bottom: 20px;
`

const Item = styled.span``

const Divider = styled.span`
  margin: 0 10px;
`

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`

const Detail = ({ result, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Container>
      <Message text={error} color='#e74c3c' />
    </Container>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{' '}
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
          <Title>{result.original_title && result.original_title}</Title>
          <Title>{result.original_name && result.original_name}</Title>
          <ItemContainer>
            <Item>
              {result.release_date && result.release_date.split('-')[0]}
            </Item>
            <Item>
              {result.first_air_date && result.first_air_date.split('-')[0]}
            </Item>
            <Divider>•</Divider>
            <Item>{result.runtime && result.runtime + ' min'}</Item>
            <Item>
              {result.episode_run_time && result.episode_run_time[0] + ' min'}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
        </Data>
      </Content>
    </Container>
  )

Detail.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
}

export default Detail
