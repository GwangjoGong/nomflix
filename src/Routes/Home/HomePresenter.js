import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Section from 'Components/Section'
import Loader from 'Components/Loader'
import Message from 'Components/Message'
import Poster from 'Components/Poster'
import NowPlaying from 'Components/NowPlaying'

const Container = styled.div`
  padding: 0;
`

const HomePresenter = ({ nowPlaying, upcoming, popular, error, loading }) => (
  <>
    <Helmet>
      <title>Movies | Nomflix</title>
    </Helmet>
    {loading ? (
      <Loader />
    ) : (
      <Container>
        {nowPlaying && nowPlaying.length > 0 && (
          <NowPlaying data={nowPlaying} isMovie={true} />
        )}

        {popular && popular.length > 0 && (
          <Section title='Popular Movies' hover={true}>
            {popular.map((movie, index) => (
              <Poster
                index={index}
                key={movie.id}
                id={movie.id}
                year={movie.release_date && movie.release_date.split('-')[0]}
                title={movie.original_title}
                rating={movie.vote_average}
                isMovie={true}
                imageUrl={movie.poster_path}
              />
            ))}
          </Section>
        )}

        {upcoming && upcoming.length > 0 && (
          <Section title='Upcoming Movies'>
            {upcoming.map((movie, index) => (
              <Poster
                index={index}
                key={movie.id}
                id={movie.id}
                year={movie.release_date && movie.release_date.split('-')[0]}
                title={movie.original_title}
                rating={movie.vote_average}
                isMovie={true}
                imageUrl={movie.poster_path}
              />
            ))}
          </Section>
        )}

        {error && <Message text={error} color='' />}
      </Container>
    )}
  </>
)

HomePresenter.propTypes = {
  nowPlaying: PropTypes.array,
  upcoming: PropTypes.array,
  popular: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired
}

export default HomePresenter
