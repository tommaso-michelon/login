package it.synclab.login.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.synclab.login.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, String> {
	Optional<Image> findByName(String name);
}
