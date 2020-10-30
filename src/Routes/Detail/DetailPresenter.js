import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Detail = ({ result, loading, error }) => null

Detail.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
}

export default Detail
