package de.dennismaas.thegramfworkingtitle.service;

import de.dennismaas.thegramfworkingtitle.dao.PlacesMongoDao;
import de.dennismaas.thegramfworkingtitle.dto.AddPlaceDto;
import de.dennismaas.thegramfworkingtitle.model.Place;
import de.dennismaas.thegramfworkingtitle.utils.IdUtils;
import de.dennismaas.thegramfworkingtitle.utils.TimestampUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;


@Service
public class PlaceService {
    private final PlacesMongoDao placesMongoDao;
    private final IdUtils idUtils;
    private final TimestampUtils timestampUtils;

    @Autowired
    public PlaceService(PlacesMongoDao placesMongoDao, IdUtils idUtils, TimestampUtils timestampUtils){
        this.placesMongoDao = placesMongoDao;
        this.idUtils = idUtils;
        this.timestampUtils = timestampUtils;
    }


    public List<Place> search(Optional<String> title) {
    if(title.isPresent() && !title.get().isBlank()){
        return placesMongoDao.findAllByTitle(title.get());

    }
    return placesMongoDao.findAll();
    }

    public Place findById(String id) {
        return placesMongoDao.findById(id).orElseThrow( () -> new ResponseStatusException((HttpStatus.NOT_FOUND)) );
    }

    public Place add(AddPlaceDto placeToBeAdded) {
        Place placeObjectToBeSaved = Place.builder()
                .type(placeToBeAdded.getType())
                .title(placeToBeAdded.getTitle())
                .street(placeToBeAdded.getStreet())
                .address(placeToBeAdded.getAddress())
                .latitude(placeToBeAdded.getLatitude())
                .longitude(placeToBeAdded.getLongitude())
                .placeDescription(placeToBeAdded.getPlaceDescription())
                .pictureDescription(placeToBeAdded.getPictureDescription())
                .aperture(placeToBeAdded.getAperture())
                .focalLength(placeToBeAdded.getFocalLength())
                .shutterSpeed(placeToBeAdded.getShutterSpeed())
                .iso(placeToBeAdded.getIso())
                .flash(placeToBeAdded.getFlash())
                .youTubeUrl(placeToBeAdded.getYouTubeUrl())
                .extraOne(placeToBeAdded.getExtraOne())
                .extraTwo(placeToBeAdded.getExtraTwo())
                .particularities(placeToBeAdded.getParticularities())
                .build();
        return placesMongoDao.save(placeObjectToBeSaved);

    }


}
