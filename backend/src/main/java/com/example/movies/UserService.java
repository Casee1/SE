package com.example.movies;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public boolean signUp(String username, String password) {
        if (userRepository.findUserByUsername(username).isPresent()) {
            return false;
        }
        User user = new User(username, password);
        userRepository.save(user);
        return true;
    }

    public User logIn(String username, String password) {
        return userRepository.findUserByUsernameAndPassword(username, password).orElse(null);
    }

    public void likeMovie(String username, Movie movie) {
        List<Movie> liked = userRepository.findUserByUsername(username).get().getLiked();
        if (!liked.contains(movie)) {
            User user = userRepository.findUserByUsername(username).get();
            user.getLiked().add(movie);
            userRepository.save(user);
        }

    }

    public void dislikeMovie(String username, Movie movie) {
        List<Movie> disliked = userRepository.findUserByUsername(username).get().getDisliked();
        if (!disliked.contains(movie)) {
            User user = userRepository.findUserByUsername(username).get();
            user.getDisliked().add(movie);
            userRepository.save(user);
        }
    }

    public List<Movie> getLiked(String userId) {
        return userRepository.findUserByUsername(userId).get().getLiked();
    }

    public List<Movie> getDisliked(String userId) {
        return userRepository.findUserByUsername(userId).get().getDisliked();
    }
}
