package it.synclab.login.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.synclab.login.User;
import it.synclab.login.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;

	public List<User> getAllUsers() {
		List<User> u = new ArrayList<>();
		userRepository.findAll().forEach(u::add);
		return u;
	}
	
	public User getUser(String mail) {
		Optional<User> obj = userRepository.findById(mail);
		if (obj.isPresent()) return (obj).get();
		return null;
	}
	
	public void addUser(User user) {
		userRepository.save(user);
	}

	public void updateUser(User user) {
		userRepository.save(user);
	}

	public void deleteUser(String mail) {
		userRepository.deleteById(mail);
	}

}