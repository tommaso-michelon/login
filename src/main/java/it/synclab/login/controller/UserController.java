package it.synclab.login.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import it.synclab.login.User;
import it.synclab.login.service.UserService;

@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	/*
	@GetMapping("/login")
	public String login() {
		return "login";
	}*/
	
	@GetMapping("/users")
	public List<User> getAllUsers() {
		return userService.getAllUsers();
	}
	
	@GetMapping("/users/{mail}")
	public User getUser(@PathVariable String mail) throws ResponseStatusException {
		return userService.getUser(mail);
	}
	
	@PostMapping("/login")
	public User loginUser(@RequestBody User user) throws ResponseStatusException {
		return userService.loginUser(user);
	}
	
	@PostMapping("/users")
	public void addUser(@RequestBody User user) throws ResponseStatusException {
		userService.addUser(user);
	}
	
	@PutMapping("/users")
	public void updateUser(@RequestBody User user) throws ResponseStatusException {
		userService.updateUser(user);
	}
	
	@DeleteMapping("/users/{mail}")
	public void deleteUser(@PathVariable String mail) throws ResponseStatusException {
		userService.deleteUser(mail);
	}
	
}