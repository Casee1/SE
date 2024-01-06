package com.example.movies;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/v1/users")
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public void createUser(String username, String password) {
        userService.signUp(username, password);
    }

    @GetMapping("/login")
    public void loginUser(String username, String password) {
        userService.logIn(username, password);
    }

    @PostMapping("/like")
    public void likeMovie(String username, String imdbId) {
        userService.likeMovie(username, imdbId);
    }

}
