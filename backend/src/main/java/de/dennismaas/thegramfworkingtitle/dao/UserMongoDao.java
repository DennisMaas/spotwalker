package de.dennismaas.thegramfworkingtitle.dao;

import de.dennismaas.thegramfworkingtitle.model.AppUser;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface UserMongoDao extends PagingAndSortingRepository<AppUser, String> {
    Optional<AppUser> findByEmail(String email);
}
