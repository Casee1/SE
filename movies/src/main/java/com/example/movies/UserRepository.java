package com.example.movies;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String>{
    Optional<User> findUserByUsername(String username);
    Optional<User> findUserByUsernameAndPassword(String username, String password);
    Optional<User> findUserByLiked(Movie movie);
    Optional<User> findUserByDisliked(Movie movie);

    void updateFirst(Criteria username, Update liked, Class<User> userClass);
}
