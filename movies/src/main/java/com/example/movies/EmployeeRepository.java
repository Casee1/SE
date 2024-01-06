package com.example.movies;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface EmployeeRepository extends MongoRepository<Employee, ObjectId> {

    Optional<Employee> findOneByEmailAndPassword(String email, String password);

    Employee findByEmail(String email);
}
