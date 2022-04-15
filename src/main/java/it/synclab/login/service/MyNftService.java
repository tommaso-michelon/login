package it.synclab.login.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import it.synclab.login.MyNft;
import it.synclab.login.repository.MyNftRepository;

@Service
public class MyNftService {
	@Autowired
	private MyNftRepository myNftRepository;
	
	public MyNft[] getAllNft(String mail) {
		//Optional<MyNft> arr = myNftRepository.findByUser();
		return null;
	}
	
	

}
