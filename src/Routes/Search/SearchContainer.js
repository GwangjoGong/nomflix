import { moviesApi, tvApi } from 'api'
import React, { Component } from 'react'
import SearchPresenter from './SearchPresenter'

export default class SearchContainer extends Component {
  state = {
    movieResults: null,
    tvResults: null,
    searchTerm: '',
    loading: false,
    error: null
  }

  handleSubmit = () => {
    if (this.state.searchTerm !== '') {
      this.searchByTerm()
    }
  }

  searchByTerm = async () => {
    const { searchTerm } = this.state
    try {
      this.setState({
        loading: true
      })

      const {
        data: { results: movieResults }
      } = await moviesApi.search(searchTerm)
      const {
        data: { results: tvResults }
      } = await tvApi.search(searchTerm)

      this.setState({
        movieResults,
        tvResults
      })
    } catch (err) {
      this.setState({
        error: err.messages
      })
    } finally {
      this.setState({
        loading: false
      })
    }
  }

  render() {
    const { movieResults, tvResults, searchTerm, loading, error } = this.state
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        loading={loading}
        error={error}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}
