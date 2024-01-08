import {useContext, useEffect, useRef, useState} from 'react';
import api from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

import React from 'react'
import {useUser} from "../context/UserContext";
import Recommendations from "../recomandations/Recommendations";

const Reviews = ({getMovieData,movie,reviews,setReviews}) => {

    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;
    const user=useUser();
    const [rec, setRec] = useState([]);

    const like = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch("http://localhost:8080/api/v1/users/like", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  username: user.username,
                    movie: movie,
                }),
                });
            if(response.status===200) {
                console.log("liked");
            }
        }
        catch(err)
        {
            console.error(err);
        }
    }

    const dislike = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch("http://localhost:8080/api/v1/users/dislike", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  username: user.username,
                    movie: movie,
                }),
                });
            if(response.status===200) {
                console.log("disliked");
            }else{
                console.log("error");

            }
        }
        catch(err)
        {
            console.error(err);
        }
    }


    //     @PostMapping("/recomandation")
    //     public ResponseEntity<List<Movie>> searchRecomandation(@RequestBody Movie movie) {
    //         return new ResponseEntity<List<Movie>>(movieService.searchRecomandation(movie), HttpStatus.OK);
    //     }

    const getRecommendations = async (movie) => {

        console.log(movie);

        if(!movie) return;
        try{
            const response = await api.post("/api/v1/movies/recomandation",movie);

            const filtered = response.data.filter((mov) => mov.imdbId !== movie.imdbId);
            // sort the movies by the highest genre match
            filtered.sort((a, b) => {
                return movie.genres.filter((genre) => b.genres.includes(genre)).length -
                    movie.genres.filter((genre) => a.genres.includes(genre)).length;
            });

            //if the current movie is in the recommendations, remove it
            if(filtered.includes(movie))
            {
                filtered.splice(filtered.indexOf(movie),1);

            }

            if(filtered.length>10)
            {
                filtered.length=10;
            }



            console.log(filtered);

            setRec(filtered);
            console.log(rec);
        }

        catch(err) {
            console.error(err);
        }

    }
    getRecommendations(movie);

    useEffect(()=>{
        getMovieData(movieId);

    },[])


    const addReview = async (e) =>{
        e.preventDefault();

        const rev = revText.current;

        try
        {
            const response = await api.post("/api/v1/reviews",{reviewBody:rev.value,imdbId:movieId});

            const updatedReviews = [...reviews, {body:rev.value}];
    
            rev.value = "";
    
            setReviews(updatedReviews);
        }
        catch(err)
        {
            console.error(err);
        }
        



    }

  return (
    <Container>
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className="mt-2">
            <Col>
                <img src={movie?.poster} alt="" />
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <h3>{movie?.title}</h3>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <p>Year: {movie?.releaseDate}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>Genre: {movie?.genres?.map((gen, index)=>
                                    <span key={index}>{gen} </span>
                                )}</p>
                            </Col>
                        </Row>
                    </>
                }
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText = "Write a Review?"
                                            like={like} dislike={dislike} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                }
                {
                    reviews?.map((r, index) => {
                        return(
                            <div key={index}>
                                <Row>
                                    <Col>{r.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>                                
                            </div>
                        )
                    })
                }
            </Col>
        </Row>
        <Row>
            <Col>
                <hr />
            </Col>
        </Row>
        <Recommendations movies={rec} />
    </Container>
  )
}

export default Reviews