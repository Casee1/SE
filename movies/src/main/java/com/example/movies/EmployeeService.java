package com.example.movies;

public interface EmployeeService {
    String addEmployee(EmployeeDTO employeeDTO);

    LoginMessage loginEmployee(LoginDTO loginDTO);
}
