package it.synclab.login.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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
	public User getUser(@PathVariable String mail) {
		return userService.getUser(mail);
	}
	
	@PostMapping("/users")
	public void addUser(@RequestBody User user) {
		userService.addUser(user);
	}
	
	@PutMapping("/users")
	public void updateUser(@RequestBody User user) {
		userService.updateUser(user);
	}
	
	@DeleteMapping("/users/{mail}")
	public void deleteUser(@PathVariable String mail) {
		userService.deleteUser(mail);
	}
	
}