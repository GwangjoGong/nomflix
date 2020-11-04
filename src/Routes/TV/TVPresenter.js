import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Section from 'Components/Section'
import Loader from 'Components/Loader'
import Message from 'Components/Message'
import Poster from 'Components/Poster'
import { Helmet } from 'react-helmet'

const Container = styled.div`
  padding: 0 10px;
  padding-top: 20px;
`

const TVPresenter = ({ topRated, popular, airingToday, error, loading }) => (
  <>
    <Helmet>
      <title>TV Shows | Nomflix</title>
    </Helmet>
    {loading ? (
      <Loader />
    ) : (
      <Container>
        {topRated && topRated.length > 0 && (
          <Section title='Top Rated Shows'>
            {topRated.map((show) => (
              <Poster
                key={show.id}
                id={show.id}
                year={show.first_air_date && show.first_air_date.split('-')[0]}
                title={show.original_name}
                rating={show.vote_average}
                imageUrl={show.poster_path}
              />
            ))}
          </Section>
        )}

        {popular && popular.length > 0 && (
          <Section title='Popular Shows'>
            {popular.map((show) => (
              <Poster
                key={show.id}
                id={show.id}
                year={show.first_air_date && show.first_air_date.split('-')[0]}
                title={show.original_name}
                rating={show.vote_average}
                imageUrl={show.poster_path}
              />
            ))}
          </Section>
        )}

        {airingToday && airingToday.length > 0 && (
          <Section title='Airing Today'>
            {airingToday.map((show) => (
              <Poster
                key={show.id}
                id={show.id}
                year={show.first_air_date && show.first_air_date.split('-')[0]}
                title={show.original_name}
                rating={show.vote_average}
                imageUrl={show.poster_path}
              />
            ))}
          </Section>
        )}

        {error && <Message text={error} color='#e74c3c' />}
      </Container>
    )}
  </>
)

TVPresenter.propTypes = {
  topRated: PropTypes.array,
  popular: PropTypes.array,
  airingToday: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired
}

export default TVPresenter
