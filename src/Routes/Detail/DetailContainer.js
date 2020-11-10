import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";

export default class DetailContainer extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;

    this.state = {
      result: null,
      credit: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/"),
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    let credit = null;

    try {
      if (isMovie) {
        const { data } = await moviesApi.movieDetail(parsedId);
        const { data: creditData } = await moviesApi.credits(parsedId);
        result = data;
        credit = creditData;
      } else {
        const { data } = await tvApi.showDetail(parsedId);
        const { data: creditData } = await tvApi.credits(parsedId);
        result = data;
        credit = creditData;
      }
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false, result, credit });
    }
  }

  render() {
    const { result, error, loading, credit } = this.state;
    return (
      <DetailPresenter
        result={result}
        error={error}
        loading={loading}
        credit={credit}
      />
    );
  }
}
