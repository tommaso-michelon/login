package it.synclab.login.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import it.synclab.login.MyNft;
import it.synclab.login.User;
import it.synclab.login.repository.MyNftRepository;

@Service
public class MyNftService {
	@Autowired
	private MyNftRepository myNftRepository;
	
	public List<MyNft> getAllNft(String mail) {
		List<MyNft> list = new ArrayList<>();
		User tempUser = new User(mail, "");
		myNftRepository.findAllByOwner(tempUser).forEach(list::add);
		return list;
	}
	
	public MyNft getNft(String mail, String nameNft) {
		User tempUser = new User(mail, "");
		Optional<MyNft> obj = myNftRepository.findByNameAndOwner(nameNft, tempUser);
		if(obj.isPresent()) return obj.get();
		throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User or NFT not found");
	}
	
	public void addNft(MyNft nft) {
		if(isSaved(nft.getName())) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nft already saved with the same name");
		/*Object t = new User("aa@mail.com", "cc");
		MyNft neee = new MyNft("nft3", (User)t, "IDDD", 2, "image");*/
		
		System.out.println("Risposta: "+myNftRepository.save(nft));
		
	}
	
	public void updateNft(MyNft nft) {
		if(!isSaved(nft.getName())) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nft not found");
		myNftRepository.save(nft);
	}

	public void deleteNft(String mail, String nameNft) {
		User tempUser = new User(mail, "");
		if(!isSaved(nameNft)) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nft not found"); 
		myNftRepository.deleteByNameAndOwner(mail, tempUser);
	}
	
	private boolean isSaved(String name) {
		return myNftRepository.findByName(name).isPresent();
	}

}
