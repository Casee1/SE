package se.proj.SEProject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/Reviews")
@CrossOrigin(origins = "*")
public class ReviewController {
    @Autowired
    private ReviewService service;

    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Map<String, String> body) {
        return new ResponseEntity<>(service.createReview(body.get("ReviewBody"), body.get("IMDBid")), HttpStatus.CREATED);
    }
}
