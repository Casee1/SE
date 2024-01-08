package com.example.movies;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/movies")
@CrossOrigin
public class MovieController {
    @Autowired
    private MovieService movieService;
    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies() {
        return new ResponseEntity<List<Movie>>(movieService.allMovies(), HttpStatus.OK);
    }

    @GetMapping("/{imdbId}")
    public ResponseEntity<Optional<Movie>> getSingleMovie(@PathVariable String imdbId) {
        return new ResponseEntity<Optional<Movie>>(movieService.singleMovie(imdbId), HttpStatus.OK);

    }

    @PostMapping("/search")
    public ResponseEntity<List<Movie>> searchMovies(@RequestBody String title) {
        return new ResponseEntity<List<Movie>>(movieService.searchMovies(title), HttpStatus.OK);
    }

    @PostMapping("/recomandation")
    public ResponseEntity<List<Movie>> searchRecomandation(@RequestBody Movie movie) {
        return new ResponseEntity<List<Movie>>(movieService.searchRecomandation(movie), HttpStatus.OK);
    }


}
