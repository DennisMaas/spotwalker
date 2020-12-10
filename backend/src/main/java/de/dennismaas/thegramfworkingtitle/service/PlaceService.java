package de.dennismaas.thegramfworkingtitle.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import de.dennismaas.thegramfworkingtitle.dao.PlacesMongoDao;
import de.dennismaas.thegramfworkingtitle.dto.AddPlaceDto;
import de.dennismaas.thegramfworkingtitle.dto.UpdatePlaceDto;
import de.dennismaas.thegramfworkingtitle.model.Place;
import de.dennismaas.thegramfworkingtitle.utils.AmazonS3ClientUtils;
import de.dennismaas.thegramfworkingtitle.utils.IdUtils;
import de.dennismaas.thegramfworkingtitle.utils.TimestampUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;
import java.util.Objects;


@Service
public class PlaceService {


    @Value("${aws.bucket.name}")
    private String bucketName;

    private final PlacesMongoDao placesMongoDao;
    private final IdUtils idUtils;
    private final TimestampUtils timestampUtils;
    private final AmazonS3ClientUtils amazonS3ClientUtils;

    @Autowired
    public PlaceService(PlacesMongoDao placesMongoDao, IdUtils idUtils, TimestampUtils timestampUtils, AmazonS3ClientUtils amazonS3ClientUtils){
        this.placesMongoDao = placesMongoDao;
        this.idUtils = idUtils;
        this.timestampUtils = timestampUtils;
        this.amazonS3ClientUtils = amazonS3ClientUtils;
    }


    public List<Place> getPlaces() {
        List<Place> placeList = placesMongoDao.findAll();
        Date expiration = getExpirationTime();
        AmazonS3 s3Client = amazonS3ClientUtils.getS3Client();

        for(Place place : placeList) {
            if (place.getPrimaryImageName() != null &&
                    !place.getPrimaryImageName().isBlank()) {
                GeneratePresignedUrlRequest generatePresignedUrlRequest =
                        new GeneratePresignedUrlRequest(bucketName, place.getPrimaryImageName()).withMethod(HttpMethod.GET).withExpiration(expiration);
                place.setPrimaryImageUrl(s3Client.generatePresignedUrl(generatePresignedUrlRequest).toString());
            }
        }
        return placeList;
    }

    public Place findById(String placeId) {
        return placesMongoDao.findById(placeId).orElseThrow( () -> new ResponseStatusException((HttpStatus.NOT_FOUND)));
    }

    public Place add(AddPlaceDto placeToBeAdded) {
        String addressToSplit = placeToBeAdded.getAddress();
        String[] addressArray = addressToSplit.trim().split("\\s*,\\s*");
        String street = addressArray[0];
        String city = addressArray[1];
        String country = addressArray[2];

        Place placeObjectToBeSaved = Place.builder()
                .id(idUtils.generateId())
                .primaryImageName(placeToBeAdded.getPrimaryImageName())
                .type(placeToBeAdded.getType())
                .title(placeToBeAdded.getTitle())
                .address(placeToBeAdded.getAddress())
                .street(street)
                .city(city)
                .country(country)
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

        String addressToSplit = placeToBeUpdated.getAddress();
        String[] addressArray = addressToSplit.trim().split("\\s*,\\s*");
        String street = addressArray[0];
        String city = addressArray[1];
        String country = addressArray[2];
        Place updatedPlace = Place.builder()
                .id(placeToBeUpdated.getId())
                .primaryImageName(placeToBeUpdated.getPrimaryImageName())
                .type(placeToBeUpdated.getType())
                .title(placeToBeUpdated.getTitle())
                .address(placeToBeUpdated.getAddress())
                .street(street)
                .city(city)
                .country(country)
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
        Place place = placesMongoDao.findById(placeId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (!Objects.equals(place.getId(), placeId)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        placesMongoDao.deleteById(placeId);

    }

    private Date getExpirationTime() {
        Date expiration = new Date();
        long expTimeMillis = expiration.getTime();
        expTimeMillis += 1000 * 60 * 60;
        expiration.setTime(expTimeMillis);
        return expiration;
    }
}