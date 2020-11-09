import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { CarouselProvider, Slider } from 'pure-react-carousel'

const Container = styled.div`
  padding: 30px;
  margin-top: ${(props) => (props.hover ? '-350px' : '0')};
  position: relative;
`

const Title = styled.span`
  font-size: 40px;
  font-weight: 600;
  padding-bottom: 40px;
  z-index: 1;
`

const PrevPage = styled.div`
  width: 30px;
  height: 180px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  position: absolute;
  top: 110px;
  left: 2px;

  cursor: ${(props) => (props.isEnd ? 'pointer' : 'default')};

  opacity: ${(props) => (props.isEnd ? 0.7 : 0.5)};

  &:hover {
    opacity: ${(props) => (props.isEnd ? 1 : 0.5)};
  }
`

const NextPage = styled.div`
  width: 30px;
  height: 180px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  position: absolute;
  top: 110px;
  right: 2px;

  cursor: ${(props) => (props.isEnd ? 'default' : 'pointer')};

  opacity: ${(props) => (props.isEnd ? 0.5 : 0.7)};

  &:hover {
    opacity: ${(props) => (props.isEnd ? 0.5 : 1)};
  }
`

const Section = ({ hover, title, children }) => {
  const [isEnd, setIsEnd] = useState(false)

  const carousel = useRef()
  const [slideNum, setSlideNum] = useState(
    Math.floor(window.innerWidth / 125) - 1
  )

  const onScreenResize = () => {
    setSlideNum(Math.floor(window.innerWidth / 125) - 1)
  }

  const prevPage = () => {
    if (carousel.current && isEnd) {
      const { setStoreState, getStoreState } = carousel.current.carouselStore
      const { currentSlide } = getStoreState()
      setStoreState({
        currentSlide: currentSlide - slideNum
      })
      setIsEnd(false)
    }
  }

  const nextPage = () => {
    if (carousel.current && !isEnd) {
      const { setStoreState, getStoreState } = carousel.current.carouselStore
      const { currentSlide } = getStoreState()
      setStoreState({
        currentSlide: currentSlide + slideNum
      })
      setIsEnd(true)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', onScreenResize)
    return () => window.removeEventListener('resize', onScreenResize)
  }, [])

  return (
    <Container hover={hover}>
      <Title>{title}</Title>
      <CarouselProvider
        ref={carousel}
        visibleSlides={slideNum}
        totalSlides={children.length}
        naturalSlideWidth={100}
        naturalSlideHeight={220}
        step={slideNum}
        infinite={true}>
        <Slider>{children}</Slider>
      </CarouselProvider>
      <PrevPage isEnd={isEnd} onClick={prevPage}>
        {'<'}
      </PrevPage>
      <NextPage isEnd={isEnd} onClick={nextPage}>
        {'>'}
      </NextPage>
    </Container>
  )
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  hover: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default Section
