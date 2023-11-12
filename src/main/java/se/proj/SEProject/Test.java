package se.proj.SEProject;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "test")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Test {
    private ObjectId _id;
    private String test;
}
