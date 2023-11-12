package se.proj.SEProject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    public Review createReview(String ReviewBody, String IMDBid) {
        Review review = reviewRepository.insert(new Review(ReviewBody));

        mongoTemplate.update(Movie.class)
                .matching(Criteria.where("imdbId").is(IMDBid))
                .apply(new Update().push("reviewIDs").value(review))
                .first();

        return review;
    }
}
