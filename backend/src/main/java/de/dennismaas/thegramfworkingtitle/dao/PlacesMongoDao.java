package de.dennismaas.thegramfworkingtitle.dao;

import de.dennismaas.thegramfworkingtitle.model.Place;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;


public interface PlacesMongoDao extends PagingAndSortingRepository<Place,String> {
    List<Place> findAll();

    List<Place> findAllByTitle(String title);
}
