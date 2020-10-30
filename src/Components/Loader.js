import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
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
