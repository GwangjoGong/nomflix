import React, { useEffect, useRef, useState } from 'react'
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel'
import styled from 'styled-components'
import 'pure-react-carousel/dist/react-carousel.es.css'
import { Link } from 'react-router-dom'

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
`

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  background: url(${(props) => props.bgUrl});
  background-size: cover;

  opacity: 0.8;
`

const Info = styled.div`
  position: absolute;
  bottom: 350px;
  left: 30px;
  display: flex;
  flex-direction: column;
  @media (max-width: 1080px) {
    bottom: 30px;
  }
`

const Title = styled.div`
  color: white;
  font-size: 60px;
  font-weight: 500;
  margin-bottom: 20px;
`

const SLink = styled(Link)`
  padding: 10px 20px;
  width: fit-content;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  background: white;
  color: black;
  font-size: 20px;
`
const NowPlaying = ({ data, isMovie }) => {
  const [handler, setHandler] = useState(null)
  const carousel = useRef()

  useEffect(() => {
    if (handler) clearInterval(handler)
    setHandler(
      setInterval(() => {
        if (carousel.current) {
          const {
            setStoreState,
            getStoreState
          } = carousel.current.carouselStore
          const { currentSlide } = getStoreState()

          const nextSlide =
            currentSlide + 1 > data.length ? 0 : currentSlide + 1

          setStoreState({
            currentSlide: nextSlide
          })
        }
      }, 5000)
    )
    return () => {
      clearInterval(handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CarouselProvider
      ref={carousel}
      visibleSlides={1}
      totalSlides={data.length}
      naturalSlideWidth={100}
      naturalSlideHeight={50}
      infinite={true}
      step={1}>
      <Slider>
        {data.map((item, idx) => (
          <Slide key={`car-slide-${idx}`} index={idx}>
            <Content>
              <Backdrop
                bgUrl={
                  item.backdrop_path &&
                  `https://image.tmdb.org/t/p/original${item.backdrop_path}`
                }></Backdrop>
              <Info>
                <Title>
                  {isMovie ? item.original_title : item.original_name}
                </Title>
                <SLink to={isMovie ? `movie/${item.id}` : `show/${item.id}`}>
                  More Detail
                </SLink>
              </Info>
            </Content>
          </Slide>
        ))}
      </Slider>
    </CarouselProvider>
  )
}

export default NowPlaying
