package de.dennismaas.thegramfworkingtitle.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import de.dennismaas.thegramfworkingtitle.dao.PlacesMongoDao;
import de.dennismaas.thegramfworkingtitle.dto.AddPlaceDto;
import de.dennismaas.thegramfworkingtitle.dto.UpdatePlaceDto;
import de.dennismaas.thegramfworkingtitle.model.Place;
import de.dennismaas.thegramfworkingtitle.utils.DateExpirationUtils;
import de.dennismaas.thegramfworkingtitle.utils.IdUtils;
import de.dennismaas.thegramfworkingtitle.utils.TimestampUtils;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.net.MalformedURLException;
import java.net.URL;
import java.time.Instant;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.*;


class PlaceServiceTest {
    // Given
    final PlacesMongoDao placesMongoDao = mock(PlacesMongoDao.class);
    final AmazonS3 amazonS3 = mock(AmazonS3.class);
    final IdUtils idUtils = mock(IdUtils.class);
    final TimestampUtils timestampUtils = mock(TimestampUtils.class);
    final DateExpirationUtils expirationUtils = mock(DateExpirationUtils.class);
    final PlaceService placeService = new PlaceService(
            placesMongoDao,
            amazonS3,
            idUtils,
            timestampUtils,
            expirationUtils);


    @Test
    @DisplayName("get list of all places")
    void itShouldGetPlaces() throws MalformedURLException {
        //GIVEN
        List<Place> places = (List.of(
                new Place("someId", "http://www.url.de", "someImage", "someType", "someTitle", "someStreet, someCity, someCountry", "someStreet", "someCity", "someCountry", 56.300, 3.10, "somePlaceDesc", "somePicDesc", "someAperture", "someFocal", "someShutter", "someIso", "someFlash", "someYT", "someX1", "someX2", "somePartic", Instant.parse("2017-11-30T18:35:24.00Z")),
                new Place("someId1", "http://www.url1.de", "someImage1", "someType1", "someTitle1", "someStreet1, someCity1, someCountry1", "someStreet1", "someCity1", "someCountry1", 56.300, 3.10, "somePlaceDesc1", "somePicDesc1", "someAperture1", "someFocal1", "someShutter1", "someIso1", "someFlash1", "someYT1", "someX11", "someX21", "somePartic1", Instant.parse("2017-11-30T18:35:24.00Z")),
                new Place("someId2", "http://www.url2.de", "someImage2", "someType2", "someTitle2", "someStreet2, someCity2, someCountry2", "someStreet2", "someCity2", "someCountry2", 6.000, 9.330, "somePlaceDesc2", "somePicDesc2", "someAperture2", "someFocal2", "someShutter2", "someIso2", "someFlash2", "someYT2", "someX12", "someX22", "somePartic2", Instant.parse("2018-11-30T18:35:24.00Z")),
                new Place("someId3", "http://www.ur13.de", "someImage3", "someType3", "someTitle3", "someStreet3, someCity3, someCountry3", "someStreet3", "someCity3", "someCountry3", 56.0300, 9.103, "somePlaceDesc3", "somePicDesc3", "someAperture3", "someFocal3", "someShutter3", "someIso3", "someFlash3", "someYT3", "someX13", "someX23", "somePartic3", Instant.parse("2019-11-30T18:35:24.00Z"))));

        when(placesMongoDao.findAll()).thenReturn(places);

        //WHEN
        List<Place> foundPlaces = placeService.getPlaces();

        //THEN
        assertThat(foundPlaces, is(places));
    }


    @Test
    void findById() {
        //GIVEN
        String placeId = "uniqueId";

        Place expectedPlace = new Place(
                "someId1", "http://www.url.de", "someImage", "someType1", "someTitle1", "someAddress1",   "someStreet1", "someCity1", "someCountry1", 56.000, 9.10, "somePlaceDesc1", "somePicDesc1", "someAperture1", "someFocal1", "someShutter1","someIso1", "someFlash1", "someYT1", "someX11", "someX21", "somePartic1", Instant.parse("2017-11-30T18:35:24.00Z")
        );
            when(placesMongoDao.findById("uniqueId")).thenReturn(Optional.of(expectedPlace));

        //WHEN
        Place resultId = placeService.findById(placeId);

        //THEN
        assertThat(resultId, is(expectedPlace));
    }

    @Test
    void findByIdNotFound() {
        //GIVEN
        String placeId = "uniqueId";

        when(placesMongoDao.findById("uniqueId")).thenReturn(Optional.empty());

        //WHEN
        try {
            placeService.findById(placeId);
            fail();
        }
        //THEN
        catch (ResponseStatusException exception) {
            assertThat(exception.getStatus(), is(HttpStatus.NOT_FOUND));
        }

    }


    @Test
    @DisplayName("Add should create new place in db")
    void add() throws MalformedURLException {
        //GIVEN
        String placeId = "uniqueId";
        String primaryImageUrl = "http://www.url.de";
        Instant timestamp = Instant.parse("2020-11-24T08:00:00Z");
        Date expiration = new Date(2030, Calendar.JANUARY, 1);

        AddPlaceDto placeToBeAdded = new AddPlaceDto(
                "primaryImageName",
                "type",
                "title",
                "street, city, country",
                "street",
                "city",
                "country",
                42.0,
                66.6,
                "placeDescription",
                "pictureDescription",
                "aperture",
                "focalLength",
                "shutterSpeed",
                "iso",
                "flash",
                "youTubeUrl",
                "extraOne",
                "extraTwo",
                "particularities"
        );

        Place newPlace = Place.builder()
                .id(placeId)
                .primaryImageName("primaryImageName")
                .primaryImageUrl(primaryImageUrl)
                .type("type")
                .title("title")
                .address("street, city, country")
                .street("street")
                .city("city")
                .country("country")
                .lat(42.0)
                .lng(66.6)
                .placeDescription("placeDescription")
                .pictureDescription("pictureDescription")
                .aperture("aperture")
                .focalLength("focalLength")
                .shutterSpeed("shutterSpeed")
                .iso("iso")
                .flash("flash")
                .youTubeUrl("youTubeUrl")
                .extraOne("extraOne")
                .extraTwo("extraTwo")
                .particularities("particularities")
                .timestamp(timestamp)
                .build();

        when(expirationUtils.getExpirationTime()).thenReturn(expiration);
        when(idUtils.generateId()).thenReturn(placeId);
        when(timestampUtils.generateTimestampEpochSeconds()).thenReturn(timestamp);
        when(placesMongoDao.save(newPlace)).thenReturn(newPlace);
        when(amazonS3.generatePresignedUrl(new GeneratePresignedUrlRequest("test-bucket", "primaryImageName").withMethod(HttpMethod.GET).withExpiration(expiration))).thenReturn(new URL(primaryImageUrl));
        when(placesMongoDao.save(newPlace)).thenReturn(newPlace);


        //WHEN
        Place result = placeService.add(placeToBeAdded);

        //THEN
        assertThat(result, is(newPlace));
        verify(placesMongoDao).save(newPlace);
    }

    @Test
    void update() throws MalformedURLException{
        //GIVEN
        String placeId = "uniqueId";
        String primaryImageUrl = "http://www.url.de";
        Instant timestamp = Instant.parse("2020-11-24T08:00:00Z");
        Date expiration = new Date(2030, Calendar.JANUARY, 1);

        UpdatePlaceDto updatePlaceDto = new UpdatePlaceDto(
                placeId,
                "oldPrimaryImageName",
                "soon to be updated Type1",
                "soon to be updated Title1",
                "soon to be updated Street1, soon to be updated City1, soon to be updated Country1",
                "soon to be updated Street1",
                "soon to be updated City1",
                "soon to be updated Country1",
                42.0,
                66.6,
                "soon to be updated PlaceDesc1",
                "oldPictureDescription",
                "oldAperture",
                "oldFocalLength",
                "oldShutterSpeed",
                "oldIso",
                "oldFlash",
                "oldYouTubeUrl",
                "oldExtraOne",
                "oldExtraTwo",
                "oldParticularities"
        );

        Place oldPlace = Place.builder()
                .id(placeId)
                .primaryImageName("oldPrimaryImageName")
                .primaryImageUrl(primaryImageUrl)
                .type("oldType")
                .title("oldTtitle")
                .address("oldStreet, city, country")
                .street("oldStreet")
                .city("city")
                .country("country")
                .lat(42.0)
                .lng(66.6)
                .placeDescription("oldPlaceDescription")
                .pictureDescription("oldPictureDescription")
                .aperture("oldAperture")
                .focalLength("oldFocalLength")
                .iso("oldIso")
                .shutterSpeed("oldShutterSpeed")
                .flash("oldFlash")
                .youTubeUrl("oldYouTubeUrl")
                .extraOne("oldExtraOne")
                .extraTwo("oldExtraTwo")
                .particularities("oldParticularities")
                .timestamp(timestamp)
                .build();

        Place updatedPlace = Place.builder()
                .id(placeId)
                .primaryImageName("oldPrimaryImageName")
                .primaryImageUrl(primaryImageUrl)
                .type("soon to be updated Type1")
                .title("soon to be updated Title1")
                .address("soon to be updated Street1, soon to be updated City1, soon to be updated Country1")
                .street("soon to be updated Street1")
                .city("soon to be updated City1")
                .country("soon to be updated Country1")
                .lat(42.0)
                .lng(66.6)
                .placeDescription("soon to be updated PlaceDesc1")
                .pictureDescription("somePicDesc1")
                .aperture("oldAperture")
                .focalLength("oldFocalLength")
                .iso("oldIso")
                .shutterSpeed("oldShutterSpeed")
                .flash("oldFlash")
                .youTubeUrl("oldYouTubeUrl")
                .extraOne("oldExtraOne")
                .extraTwo("oldExtraTwo")
                .particularities("oldParticularities")
                .timestamp(timestamp)
                .build();

        when(idUtils.generateId()).thenReturn(placeId);
        when(placesMongoDao.findById(placeId)).thenReturn(Optional.of(oldPlace));
        when(timestampUtils.generateTimestampEpochSeconds()).thenReturn(timestamp);
        when(amazonS3.generatePresignedUrl(new GeneratePresignedUrlRequest("test-bucket", "primaryImageName").withMethod(HttpMethod.GET).withExpiration(expiration))).thenReturn(new URL(primaryImageUrl));
        when(placesMongoDao.save(updatedPlace)).thenReturn(updatedPlace);

        //WHEN
        Place result = placeService.update(updatePlaceDto,placeId);

        //THEN
        assertThat(result, is(updatedPlace));
        verify(placesMongoDao).save(updatedPlace);
    }



   @Test
   void updateThrowsWennItemNotFound() {
        // Given
        String placeId = "aPrettyUniqueId";
        Instant timestamp = Instant.parse("2020-10-25T08:00:00Z");

       UpdatePlaceDto update = new UpdatePlaceDto(
               placeId,
                "someImage", "soon to be updated Type1", "soon to be updated Title1", "soon to be updated Street1, soon to be updated City1, soon to be updated Country1"  ,  "soon to be updated Street1", "soon to be updated City1", "soon to be updated Country1", 46.300, 29.20, "soon to be updated PlaceDesc1",  "somePicDesc1", "someAperture1", "someFocal1", "someShutter1","someIso1", "someFlash1", "someYT1", "someX11", "someX21", "somePartic1"

       );
       Place updatedPlace = new Place(
               placeId,
               "not updated Url", "someImage", "not Type1", "soon to be updated Title1", "not to be updated Street1, not to be updated City1, not to be updated Country1",  "not to be updated Street1", "not to be updated City1", "not to be updated Country1", 46.300, 29.20, "not updated PlaceDesc1",  "somePicDesc1", "someAperture1", "someFocal1", "someShutter1","someIso1", "someFlash1", "someYT1", "someX11", "someX21", "somePartic1", timestamp
       );


        // When
        when(timestampUtils.generateTimestampEpochSeconds()).thenReturn(timestamp);
        when(placesMongoDao.findById(placeId)).thenReturn(Optional.empty());
        when(placesMongoDao.save(updatedPlace)).thenReturn(updatedPlace);

        try {
            placeService.update(update, placeId);
            fail("missing exception");
        } catch (ResponseStatusException exception) {
            assertThat(exception.getStatus(), is(HttpStatus.NOT_FOUND));
        }
    }

    @Test
    void removeTest(){
        //GIVEN
        String placeId = "ToBeRemovedId";
        when(placesMongoDao.findById(placeId)).thenReturn(Optional.of(Place.builder().id(placeId).build()));

        //WHEN
        placeService.remove(placeId);

        //THEN
        verify(placesMongoDao).deleteById(placeId);
    }

    @Test
    void removeTestThrows(){
        //GIVEN
        String placeId = "ToBeRemovedId";
        when(placesMongoDao.existsById(placeId)).thenReturn(false);
        // When
        try {
            placeService.remove(placeId);
            fail("missing exception");
        } catch (ResponseStatusException exception) {
            assertThat(exception.getStatus(), is(HttpStatus.NOT_FOUND));
        }
    }
}

