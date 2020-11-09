import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Slide } from 'pure-react-carousel'

const Container = styled.div`
  font-size: 12px;
  margin-top: 40px;
`

const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  width: 125px;
  height: 180px;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
  transition: opacity 0.1s linear;
`
const Rating = styled.span`
  position: absolute;
  bottom: 10px;
  right: 10px;
  opacity: 0;

  transition: opacity 0.1s linear;
`

const ImageContainer = styled.div`
  margin-bottom: 5px;
  position: relative;
  &:hover {
    ${Image} {
      opacity: 0.3;
    }
    ${Rating} {
      opacity: 1;
    }
  }
`

const Title = styled.span`
  display: block;
  font-size: 12px;
  margin-bottom: 3px;
`

const Year = styled.span`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
`

const Poster = ({
  index,
  id,
  imageUrl,
  title,
  rating,
  year,
  isMovie = false
}) => (
  <Slide index={index}>
    <Link to={isMovie ? `movie/${id}` : `show/${id}`}>
      <Container>
        <ImageContainer>
          <Image bgUrl={`https://image.tmdb.org/t/p/w300${imageUrl}`} />
          <Rating>
            <span role='img' aria-label='rating'>
              ⭐️
            </span>{' '}
            {rating}/10
          </Rating>
        </ImageContainer>
        <Title>
          {title.length > 20 ? title.substring(0, 20) + '...' : title}
        </Title>
        <Year>{year}</Year>
      </Container>
    </Link>
  </Slide>
)

Poster.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  years: PropTypes.string,
  isMovie: PropTypes.bool
}

export default Poster
