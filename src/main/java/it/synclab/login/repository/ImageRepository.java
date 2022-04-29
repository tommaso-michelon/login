package it.synclab.login.repository;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.synclab.login.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, String> {
	
	public Optional<Image[]> findAllByName(String name);
	public Optional<Image> findFirstByName(String name);
	@Transactional
	public void deleteById(Long id);
}
