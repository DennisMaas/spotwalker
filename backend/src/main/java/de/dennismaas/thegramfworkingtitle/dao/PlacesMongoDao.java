package de.dennismaas.thegramfworkingtitle.dao;
import org.springframework.data.repository.PagingAndSortingRepository;


public interface PlacesMongoDao extends PagingAndSortingRepository<Place,String>{
}
