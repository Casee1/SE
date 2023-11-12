package se.proj.SEProject;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/test")
@CrossOrigin(origins = "*")
public class TestController {

    @Autowired
    private TestService service;
    @GetMapping
    public ResponseEntity<List<Test>> getAllMovies() {
        return new ResponseEntity<>(service.getTest(), HttpStatus.OK) ;
    }
}
