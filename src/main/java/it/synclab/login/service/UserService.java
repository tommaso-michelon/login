package it.synclab.login.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import it.synclab.login.User;
import it.synclab.login.repository.MyNftRepository;
import it.synclab.login.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private MyNftRepository myNftRepository;

	public List<User> getAllUsers() {
		List<User> u = new ArrayList<>();
		userRepository.findAll().forEach(u::add);
		return u;
	}
	
	public User getUser(String mail) {
		Optional<User> obj = userRepository.findById(mail);
		if (obj.isPresent()) return (obj).get();
		throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
	}
	
	public User loginUser(User user) {
		Optional<User> obj = userRepository.findById(user.getMail());
		if (obj.isPresent()) {
			if (user.getPassword().equals(obj.get().getPassword())) {
				return (obj).get();
			} else throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Password incorrect");
		}
		throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
	}
	
	public void addUser(User user) {
		if(isRegistered(user.getMail())) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Mail already registered"); 
		userRepository.save(user);
	}

	public void updateUser(User user) {
		if(!isRegistered(user.getMail())) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found"); 
		userRepository.save(user);
	}

	public void deleteUser(String mail) {
		if(!isRegistered(mail)) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found");
		//delete all user's nft
		User tempUser = new User(mail, "");
		myNftRepository.deleteAllByOwner(tempUser);
		//delete user
		userRepository.deleteById(mail);
		
		
		
	}
	
	private boolean isRegistered(String mail) {
		return userRepository.findById(mail).isPresent();
	}

}