import React, { useRef, useEffect } from 'react';
import './recommendations.css';

const Recommendations = ({ movies }) => {

    if (!movies) {
        return <div>Loading...</div>;
    }

    const recommendationRowRef = useRef(null);
    const numDuplicates = 7;

    const duplicatedMovies = [
        ...movies.slice(-numDuplicates),
        ...movies,
        ...movies.slice(0, numDuplicates),
    ];

    useEffect(() => {
        const cardWidth = 200;
        recommendationRowRef.current.scrollLeft = cardWidth * numDuplicates;
    }, []);

    const scrollLeft = () => {
        const container = recommendationRowRef.current;
        const cardWidth = 200;
        const resetPoint = cardWidth * numDuplicates;

        container.scrollLeft -= cardWidth;

        if (container.scrollLeft < resetPoint) {
            container.scrollLeft += cardWidth * movies.length;
        }
    };

    const scrollRight = () => {
        const container = recommendationRowRef.current;
        const cardWidth = 200;
        const endPoint = cardWidth * (movies.length + numDuplicates);

        container.scrollLeft += cardWidth;

        if (container.scrollLeft > endPoint) {
            container.scrollLeft -= cardWidth * movies.length;
        }
    };

    console.log(movies)

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2>Recommendations</h2>
                </div>
            </div>


            <div className="recommendation-row-container" ref={recommendationRowRef}>
                <button className="nav-button nav-button-left" onClick={scrollLeft}>‹</button>
                <div className="recommendation-row">
                    {duplicatedMovies.map((movie, index) => (
                        <div className="recommendation-movie-card" key={`movie-${index}`}>
                            <div className="recommendation-movie-poster">
                                <img src={movie.poster} alt={movie.title}/>
                            </div>
                            <div className="recommendation-movie-info">
                                <h5 className="recommendation-movie-title">{movie.title}</h5>
                                <p className="recommendation-movie-genres">
                                    {Array.isArray(movie.genres) && movie.genres.length !== 0 ?
                                        movie.genres.join(', ') :
                                        "No genres"
                                    }
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="nav-button nav-button-right" onClick={scrollRight}>›</button>
            </div>
        </div>
    );
}

export default Recommendations;
