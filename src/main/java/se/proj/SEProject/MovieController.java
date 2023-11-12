package se.proj.SEProject;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/Movies")
@CrossOrigin(origins = "*")
public class MovieController {
    @Autowired
    private MovieService service;
    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies() {
        return new ResponseEntity<>(service.allMovies(), HttpStatus.OK) ;
    }
    @GetMapping("/{IMDBid}")
    public ResponseEntity<Optional<Movie>> getSingleMovie(@PathVariable String IMDBid) {
        return new ResponseEntity<>(service.singleMovie(IMDBid), HttpStatus.OK);
    }
}
