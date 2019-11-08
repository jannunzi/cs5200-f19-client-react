import React from 'react'
import MovieDetails from "./MovieDetails";
import LikedMovies from "./LikedMovies";

class MovieSearchComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            likedMovies: [],
            movieTitle: 'Avatar',
            selectedMovie: {}
        }
    }
    // http://www.omdbapi.com/?s=batman&apikey=4a249f8d
    componentDidMount() {
        fetch("http://localhost:4000/api/movies")
            .then(response => response.json())
            .then(movies => this.setState({
                likedMovies: movies
            }))

        fetch("http://www.omdbapi.com/?s=batman&apikey=4a249f8d")
            .then(response => response.json())
            .then(results => this.setState({
                movies: results.Search
            }))


    }

    searchMovie = () => {
        console.log('search movie: ' + this.state.movieTitle)

        this.findMovieByTitle(this.state.movieTitle)
            .then(results => this.setState({
                movies: results.Search
            }))
    }

    findMovieByTitle = title => {
        return fetch(`http://www.omdbapi.com/?s=${title}&apikey=4a249f8d`)
            .then(response => response.json())
    }

    findMovieByImdbId = imdbID =>
        fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=4a249f8d`)
            .then(response => response.json())

    updateForm = event => {
        this.setState({
            movieTitle: event.target.value
        })
    }

    selectMovie = movie => {
        // console.log(movie)
        this.findMovieByImdbId(movie.imdbID)
            .then(movie => this.setState({
                selectedMovie: movie
            }))
    }

    render() {
        return(
            <div>
                <table>
                    <tbody>
                    <tr>
                        <td valign="top">
                            <h1>Movie Search Component</h1>
                            <input
                                onChange={this.updateForm}
                                value={this.state.movieTitle}/>
                            <button onClick={this.searchMovie}>Search</button>
                            <ol>
                                {
                                    this.state.movies.map(movie =>
                                        <li onClick={() => this.selectMovie(movie)} key={movie.imdbID}>
                                            <img height={50} src={movie.Poster}/>
                                            {movie.Title}
                                        </li>
                                    )
                                }
                            </ol>
                        </td>
                        <td>
                            <MovieDetails movie={this.state.selectedMovie}/>
                        </td>
                        <td>
                            <LikedMovies
                                likedMovies={this.state.likedMovies}/>
                        </td>
                    </tr>
                    </tbody>
                </table>

            </div>
        )
    }
}

export default MovieSearchComponent;