package com.example.movies;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

}
