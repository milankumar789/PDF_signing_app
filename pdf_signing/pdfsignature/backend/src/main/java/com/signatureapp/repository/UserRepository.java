package com.signatureapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.signatureapp.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

}