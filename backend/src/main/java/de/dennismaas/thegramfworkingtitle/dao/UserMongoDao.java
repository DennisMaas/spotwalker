package de.dennismaas.thegramfworkingtitle.dao;

import de.dennismaas.thegramfworkingtitle.model.SpotwalkerUser;
import org.springframework.data.repository.PagingAndSortingRepository;



public interface UserMongoDao extends PagingAndSortingRepository<SpotwalkerUser, String> {

}
