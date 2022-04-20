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
import org.springframework.http.MediaType;

import it.synclab.login.MyNft;
import it.synclab.login.User;
import it.synclab.login.service.MyNftService;

@RestController
public class MyNftController {
	
	@Autowired
	private MyNftService myNftService;
	
	@GetMapping("/nft/{mail}")
	public List<MyNft> getAllNft(@PathVariable String mail) throws ResponseStatusException {
		return myNftService.getAllNft(mail);
	}
	
	@GetMapping("/nft/{mail}/{name}")
	public MyNft getNft(@PathVariable String mail, @PathVariable String name) throws ResponseStatusException {
		return myNftService.getNft(mail, name);
	}
	
	@PostMapping(value = "/nft", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public void addNft(@RequestBody MyNft nft) throws ResponseStatusException {
		if(nft instanceof MyNft) {
			System.out.println("MYNFT: "+nft);
			if(nft.getOwner() instanceof User) System.out.println("USER: "+nft.getOwner());
		}
		else System.out.println("NO");
		myNftService.addNft(nft);
	}
	
	@PutMapping("/nft")
	public void updateUser(@RequestBody  MyNft nft) throws ResponseStatusException {
		myNftService.updateNft(nft);
	}
	
	@DeleteMapping("/nft/{mail}/{name}")
	public void deleteNft(@PathVariable String mail, @PathVariable String name) throws ResponseStatusException {
		myNftService.deleteNft(mail, name);
	}
	
}
