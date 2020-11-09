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
      casts: null,
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
    let casts = null;

    try {
      if (isMovie) {
        const { data } = await moviesApi.movieDetail(parsedId);
        const {
          data: { cast },
        } = await moviesApi.credits(parsedId);
        result = data;
        casts = cast;
      } else {
        const { data } = await tvApi.showDetail(parsedId);
        const {
          data: { cast },
        } = await tvApi.credits(parsedId);
        result = data;
        casts = cast;
      }
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false, result, casts });
    }
  }

  render() {
    const { result, error, loading, casts } = this.state;
    console.log(casts);
    return (
      <DetailPresenter
        result={result}
        error={error}
        loading={loading}
        casts={casts}
      />
    );
  }
}
