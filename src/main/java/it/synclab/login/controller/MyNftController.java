package it.synclab.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import it.synclab.login.MyNft;
import it.synclab.login.service.MyNftService;

@RestController
public class MyNftController {
	
	@Autowired
	private MyNftService myNftService;
	
	@GetMapping("/nft/{mail}")
	public MyNft[] getAllNftUser(@PathVariable String mail) throws ResponseStatusException {
		return myNftService.getAllNft(mail);
	}
	

}
