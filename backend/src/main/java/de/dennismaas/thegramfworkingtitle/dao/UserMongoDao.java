package de.dennismaas.thegramfworkingtitle.dao;

import de.dennismaas.thegramfworkingtitle.model.User;

import java.util.Optional;

public interface UserMongoDao {
    Optional<User> findById(String username);

}
