import React from 'react'

const LikedMovies = ({likedMovies}) => {
    return(
        <div>
            <h1>Movies I like</h1>
            <ul>
            {
                likedMovies.map(movie =>
                    <li key={movie.imdbID}>{movie.Title}</li>
                )
            }
            </ul>
        </div>
    )
}

export default LikedMovies