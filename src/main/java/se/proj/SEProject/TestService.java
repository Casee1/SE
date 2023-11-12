package se.proj.SEProject;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class TestService {
    @Autowired
    private TestRepository testRepository;
    public List<Test> getTest() {
        return testRepository.findAll();
    }
}