package it.synclab.login.repository;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import it.synclab.login.MyNft;
import it.synclab.login.User;

public interface MyNftRepository extends JpaRepository<MyNft, String>{
	
	public Iterable<MyNft> findAllByOwner(User owner);
	public Optional<MyNft> findByNameAndOwner(String name, User owner);
	public Optional<MyNft> findByName(String name);
	@Transactional
	public void deleteByNameAndOwner(String name, User owner);
	@Transactional
	public void deleteAllByOwner(User owner);
	@Modifying
	@Transactional
	@Query(
	  value = 
	    "insert into nft (name, image, price, owner_mail) values (:name, :image, :price, :owner_mail)",
	  nativeQuery = true)
	void insertNft(@Param("name") String name, @Param("image") String image, 
			@Param("price") Double price, @Param("owner_mail") String owner_mail);
	
	@Modifying
	@Transactional
	@Query("update MyNft set isSold = :sold where name = :name")
	public void updateNft(@Param("name") String name, @Param("sold") boolean sold);
}
