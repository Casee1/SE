import {useContext, useEffect, useRef} from 'react';
import api from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

import React from 'react'
import {useUser} from "../context/UserContext";

const Reviews = ({getMovieData,movie,reviews,setReviews}) => {

    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;
    const user=useUser();
    console.log(reviews);

    const like = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch("http://localhost:8080/api/v1/like", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  username: user.username,
                    imdbId: movie.imdbId,
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
            const response = await fetch("http://localhost:8080/api/v1/dislike", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  username: user.username,
                    imdbId: movie.imdbId,
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
                    reviews?.map((r) => {
                        return(
                            <>
                                <Row>
                                    <Col>{r.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>                                
                            </>
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
    </Container>
  )
}

export default Reviews