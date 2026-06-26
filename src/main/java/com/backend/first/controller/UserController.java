package com.backend.first.controller;

import com.backend.first.entity.Users;
import com.backend.first.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService service;
    @PostMapping("/Register")
    public Users register(@RequestBody Users user){
        return service.register(user);
    }
    @GetMapping("/Users")
    public List<Users> getAll(){
        return service.getAll();
    }

    @PostMapping("/login")
    public String login(@RequestBody Users user){
        return service.verify(user);
    }
}
