import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  font-size: 40px;
`

const Loader = () => (
  <Container>
    <span role='img' aria-label='Loading'>
      ⏰
    </span>
  </Container>
)

export default Loader
