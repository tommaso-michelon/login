package it.synclab.login.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import it.synclab.login.MyNft;
import it.synclab.login.User;

public interface MyNftRepository extends JpaRepository<MyNft, String>{
	
	public Iterable<MyNft> findAllByOwner(User owner);
	public Optional<MyNft> findByNameAndOwner(String name, User owner);
	public Optional<MyNft> findByName(String name);
	public void deleteByNameAndOwner(String name, User owner);
}
