package de.dennismaas.thegramfworkingtitle.dao;
import de.dennismaas.thegramfworkingtitle.model.Place;
import org.springframework.data.repository.PagingAndSortingRepository;


public interface PlacesMongoDao extends PagingAndSortingRepository<Place,String>{
}
