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
        userRepository.insert(user);
        return true;
    }

    public User logIn(String username, String password) {
        return userRepository.findUserByUsernameAndPassword(username, password).orElse(null);
    }

    public void likeMovie(String username, String imdbId) {
        List<String> liked = userRepository.findUserByUsername(username).get().getLiked();
        List<String> disliked = userRepository.findUserByUsername(username).get().getDisliked();
        if (liked.contains(imdbId)) {
            //remove like
            userRepository.updateFirst(Criteria.where("username").is(username), new Update().pull("liked", imdbId), User.class);
        }
        else if (disliked.contains(imdbId)) {
            //remove dislike
            userRepository.updateFirst(Criteria.where("username").is(username), new Update().pull("disliked", imdbId), User.class);
            //add like
            userRepository.updateFirst(Criteria.where("username").is(username), new Update().push("liked", imdbId), User.class);
        }
        else {
            //add like
            userRepository.updateFirst(Criteria.where("username").is(username), new Update().push("liked", imdbId), User.class);
        }
    }

    public void dislikeMovie(String username, ObjectId imdbId) {
        List<String> liked = userRepository.findUserByUsername(username).get().getLiked();
        List<String> disliked = userRepository.findUserByUsername(username).get().getDisliked();
        if (disliked.contains(imdbId)) {
            //remove dislike
            userRepository.updateFirst(Criteria.where("username").is(username), new Update().pull("disliked", imdbId), User.class);
        }
        else if (liked.contains(imdbId)) {
            //remove like
            userRepository.updateFirst(Criteria.where("username").is(username), new Update().pull("liked", imdbId), User.class);
            //add dislike
            userRepository.updateFirst(Criteria.where("username").is(username), new Update().push("disliked", imdbId), User.class);
        }
        else {
            //add dislike
            userRepository.updateFirst(Criteria.where("username").is(username), new Update().push("disliked", imdbId), User.class);
        }
    }
}
