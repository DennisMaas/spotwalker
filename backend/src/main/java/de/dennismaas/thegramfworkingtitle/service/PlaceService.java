package de.dennismaas.thegramfworkingtitle.service;

import de.dennismaas.thegramfworkingtitle.dao.PlacesMongoDao;
import de.dennismaas.thegramfworkingtitle.model.Place;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


@Service
public class PlaceService {
    private final PlacesMongoDao placesMongoDao;

    @Autowired
    public PlaceService(PlacesMongoDao placesMongoDao){
        this.placesMongoDao = placesMongoDao;
    }

    public Place findById(String placeId) {
        return placesMongoDao.findById(placeId).orElseThrow( () -> new ResponseStatusException((HttpStatus.NOT_FOUND)) );
    }
}
