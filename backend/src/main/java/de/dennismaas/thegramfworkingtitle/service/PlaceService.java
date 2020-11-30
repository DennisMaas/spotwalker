package de.dennismaas.thegramfworkingtitle.service;

import de.dennismaas.thegramfworkingtitle.dao.PlacesMongoDao;
import de.dennismaas.thegramfworkingtitle.dto.AddPlaceDto;
import de.dennismaas.thegramfworkingtitle.dto.UpdatePlaceDto;
import de.dennismaas.thegramfworkingtitle.model.Place;
import de.dennismaas.thegramfworkingtitle.utils.IdUtils;
import de.dennismaas.thegramfworkingtitle.utils.TimestampUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;
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

    public Place findById(String placeId) {
        return placesMongoDao.findById(placeId).orElseThrow( () -> new ResponseStatusException((HttpStatus.NOT_FOUND)) );
    }

    public Place add(AddPlaceDto placeToBeAdded) {
        Place placeObjectToBeSaved = Place.builder()
                .id(idUtils.generateId())
                .primaryPictureUrl(placeToBeAdded.getPrimaryPictureUrl())
                .type(placeToBeAdded.getType())
                .title(placeToBeAdded.getTitle())
                .street(placeToBeAdded.getStreet())
                .address(placeToBeAdded.getAddress())
                .lat(placeToBeAdded.getLat())
                .lng(placeToBeAdded.getLng())
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
                .timestamp(timestampUtils.generateTimestampEpochSeconds())
                .build();
        return placesMongoDao.save(placeObjectToBeSaved);

    }

    public Place update(UpdatePlaceDto placeToBeUpdated, String placeId){
        Place place = placesMongoDao.findById(placeToBeUpdated.getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (!Objects.equals(place.getId(), placeId )){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        Place updatedPlace = Place.builder()
                .id(placeToBeUpdated.getId())
                .primaryPictureUrl(placeToBeUpdated.getPrimaryPictureUrl())
                .type(placeToBeUpdated.getType())
                .title(placeToBeUpdated.getTitle())
                .street(placeToBeUpdated.getStreet())
                .address(placeToBeUpdated.getAddress())
                .lat(placeToBeUpdated.getLat())
                .lng(placeToBeUpdated.getLng())
                .placeDescription(placeToBeUpdated.getPlaceDescription())
                .pictureDescription(placeToBeUpdated.getPictureDescription())
                .aperture(placeToBeUpdated.getAperture())
                .focalLength(placeToBeUpdated.getFocalLength())
                .shutterSpeed(placeToBeUpdated.getShutterSpeed())
                .iso(placeToBeUpdated.getIso())
                .flash(placeToBeUpdated.getFlash())
                .youTubeUrl(placeToBeUpdated.getYouTubeUrl())
                .extraOne(placeToBeUpdated.getExtraOne())
                .extraTwo(placeToBeUpdated.getExtraTwo())
                .particularities(placeToBeUpdated.getParticularities())
                .timestamp(timestampUtils.generateTimestampEpochSeconds())
                .build();
        return placesMongoDao.save(updatedPlace);
    }

    public void remove(String placeId) {
        if(!placesMongoDao.existsById(placeId)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        placesMongoDao.deleteById(placeId);
    }
}
