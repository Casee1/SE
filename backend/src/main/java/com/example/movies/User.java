package com.example.movies;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document(collection = "user")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private String id;
    private String username;
    private String password;
    @DocumentReference
    private List<Movie> liked;
    @DocumentReference
    private List<Movie> disliked;
    private String role;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.role="user";
    }

}
