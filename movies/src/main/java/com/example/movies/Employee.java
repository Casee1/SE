package com.example.movies;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "employee")
@Data
@NoArgsConstructor
public class Employee {
    @Id
    private ObjectId id;
    private String employee_name;
    private String email;
    private String password;

    public Employee(ObjectId id, String employee_name, String email, String password) {
        this.id = id;
        this.employee_name = employee_name;
        this.email = email;
        this.password = password;
    }

    public ObjectId getId() {
        return id;
    }

    public String getEmployee_name() {
        return employee_name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public void setEmployee_name(String employee_name) {
        this.employee_name = employee_name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
