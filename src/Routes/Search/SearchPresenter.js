import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Loader from 'Components/Loader'
import Section from 'Components/Section'
import Message from 'Components/Message'
import Poster from 'Components/Poster'
import { Helmet } from 'react-helmet'

const Container = styled.div`
  padding: 0 20px;
  padding-top: 20px;
`

const Form = styled.form`
  width: 100%;
  margin-bottom: 50px;
`

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
`

const SearchPresenter = ({
  movieResults,
  tvResults,
  searchTerm,
  loading,
  error,
  handleSubmit,
  updateTerm
}) => (
  <Container>
    <Helmet>
      <title>Search | Nomflix</title>
    </Helmet>
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder='Search Movies or TV Shows...'
        type='text'
        value={searchTerm}
        onChange={updateTerm}
      />
    </Form>
    {loading ? (
      <Loader />
    ) : (
      <>
        {movieResults && movieResults.length > 0 && (
          <Section title='Movie Results'>
            {movieResults.map((movie) => (
              <Poster
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
        {tvResults && tvResults.length > 0 && (
          <Section title='TV Show Results'>
            {tvResults.map((show) => (
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
      </>
    )}
    {error && <Message text={error} color='#e74c3c' />}
    {tvResults &&
      movieResults &&
      tvResults.length === 0 &&
      movieResults.length === 0 && (
        <Message text={`Nothing Found`} color='#95a5a6' />
      )}
  </Container>
)

SearchPresenter.propTypes = {
  movieResults: PropTypes.array,
  tvResults: PropTypes.array,
  searchTerm: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  updateTerm: PropTypes.func
}

export default SearchPresenter
