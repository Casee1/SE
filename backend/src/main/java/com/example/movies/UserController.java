package com.example.movies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public HttpStatus createUser(@RequestBody String username, String password) {
        if(userService.signUp(username, password)){
            return(HttpStatus.OK);
        }else{
            return(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/login")
    public HttpStatus loginUser(@RequestBody String username, String password) {
        if(userService.logIn(username, password).equals(null)){
            return(HttpStatus.INTERNAL_SERVER_ERROR);
        }else{
            return(HttpStatus.OK);
        }

    }

    @PostMapping("/like")
    public void likeMovie(@RequestBody String userId, Movie movie) {
        userService.likeMovie(userId, movie);
    }

    @PostMapping("/dislike")
    public void dislikeMovie(@RequestBody String userId, Movie movie) {
        userService.dislikeMovie(userId, movie);
    }
}
