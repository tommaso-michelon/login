package it.synclab.login.repository;

import org.springframework.data.repository.CrudRepository;

import it.synclab.login.User;

public interface UserRepository extends CrudRepository<User, String> { }
