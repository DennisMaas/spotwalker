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
import org.springframework.beans.factory.annotation.Value;
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
import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.*;


class PlaceServiceTest {
    // Given
    @Value("${aws.bucket.name}")
    final String bucketname = "test-bucket";
    final PlacesMongoDao placesMongoDao = mock(PlacesMongoDao.class);
    final AmazonS3 amazonS3 = mock(AmazonS3.class);
    final IdUtils idUtils = mock(IdUtils.class);
    final TimestampUtils timestampUtils = mock(TimestampUtils.class);
    final DateExpirationUtils expirationUtils = mock(DateExpirationUtils.class);
    final GeneratePresignedUrlRequest generatePresignedUrlRequest = mock(GeneratePresignedUrlRequest.class);
    final PlaceService placeService = new PlaceService(placesMongoDao, amazonS3, idUtils, timestampUtils, expirationUtils);

    @Test
    @DisplayName("get list of all places")
    void itShouldGetPlaces() throws MalformedURLException {
        //GIVEN
        List<Place> places = (List.of(
                new Place("someId", "http://www.url.de", "someImage", "someType", "someTitle", "someStreet, someCity, someCountry", "someStreet", "someCity", "someCountry", 56.000, 9.10, "somePlaceDesc", "somePicDesc", "someAperture", "someFocal", "someShutter", "someIso", "someFlash", "someYT", "someX1", "someX2", "somePartic", Instant.parse("2016-11-30T18:35:24.00Z")),
                new Place("someId1", "http://www.url1.de", "someImage1", "someType1", "someTitle1", "someStreet1, someCity1, someCountry1", "someStreet1", "someCity1", "someCountry1", 56.300, 3.10, "somePlaceDesc1", "somePicDesc1", "someAperture1", "someFocal1", "someShutter1", "someIso1", "someFlash1", "someYT1", "someX11", "someX21", "somePartic1", Instant.parse("2017-11-30T18:35:24.00Z")),
                new Place("someId2", "http://www.url2.de", "someImage2", "someType2", "someTitle2", "someStreet2, someCity2, someCountry2", "someStreet2", "someCity2", "someCountry2", 6.000, 9.330, "somePlaceDesc2", "somePicDesc2", "someAperture2", "someFocal2", "someShutter2", "someIso2", "someFlash2", "someYT2", "someX12", "someX22", "somePartic2", Instant.parse("2018-11-30T18:35:24.00Z")),
                new Place("someId3", "http://www.ur13.de", "someImage3", "someType3", "someTitle3", "someStreet3, someCity3, someCountry3", "someStreet3", "someCity3", "someCountry3", 56.0300, 9.103, "somePlaceDesc3", "somePicDesc3", "someAperture3", "someFocal3", "someShutter3", "someIso3", "someFlash3", "someYT3", "someX13", "someX23", "somePartic3", Instant.parse("2019-11-30T18:35:24.00Z"))));

        Date expiration = new Date(2030, Calendar.JANUARY, 1);
        GeneratePresignedUrlRequest request = new GeneratePresignedUrlRequest("test-bucker", "someImage");
        request.withMethod(HttpMethod.GET);
        request.setExpiration(expiration);


        when(placesMongoDao.findAll()).thenReturn(places);
        when(expirationUtils.getExpirationTime()).thenReturn(expiration);
        when(amazonS3.generatePresignedUrl(request)).thenReturn(new URL("http://www.url.de"));
        when(amazonS3.generatePresignedUrl(request)).thenReturn(new URL("http://www.url1.de"));
        when(amazonS3.generatePresignedUrl(request)).thenReturn(new URL("http://www.url2.de"));
        when(amazonS3.generatePresignedUrl(request)).thenReturn(new URL("http://www.url3.de"));

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
                "someId1", "someUrl1", "someImage", "someType1", "someTitle1", "someAddress1",   "someStreet1", "someCity1", "someCountry1", 56.000, 9.10, "somePlaceDesc1", "somePicDesc1", "someAperture1", "someFocal1", "someShutter1","someIso1", "someFlash1", "someYT1", "someX11", "someX21", "somePartic1", Instant.parse("2017-11-30T18:35:24.00Z")
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
    void add() {
        //GIVEN
        String expectedPlaceId = "uniqueId";
        Instant expectedTime = Instant.parse("2020-10-26T10:00:00Z");

        AddPlaceDto placeDto = new AddPlaceDto(
                "someImage",
                "someType",
                "someTitle",
                "someStreet, someCity, someCountry",  "someStreet", "someCity", "someCountry",
                56.000, 9.10,
                "somePlaceDesc",
                "somePicDesc",
                "someAperture",
                "someFocal",
                "someShutter",
                "someIso",
                "someFlash",
                "someYT",
                "someX1",
                "someX2",
                "somePartic"
        );
        Place expectedPlace = new Place(
                expectedPlaceId,
                "someUrl", "someImage","someType", "someTitle",  "someStreet, someCity, someCountry",   "someStreet", "someCity", "someCountry",56.000, 9.10, "somePlaceDesc", "somePicDesc", "someAperture", "someFocal", "someShutter", "someIso", "someFlash", "someYT", "someX1", "someX2", "somePartic", expectedTime
                );
        when(idUtils.generateId()).thenReturn(expectedPlaceId);
        when(timestampUtils.generateTimestampEpochSeconds()).thenReturn(expectedTime);
        when(placesMongoDao.save(expectedPlace)).thenReturn(expectedPlace);

        //WHEN
        Place newPlace = placeService.add(placeDto);

        //THEN
        assertThat(newPlace, is(expectedPlace));
    }

    @Test
    void update() {
        //GIVEN
        String placeId = "uniqueId";
        Instant timestamp = Instant.parse("2020-11-24T08:00:00Z");

        UpdatePlaceDto update = new UpdatePlaceDto(placeId,
                "someImage",
                "soon to be updated Type1",
                "soon to be updated Title1",
                "soon to be updated Street1, soon to be updated City1, soon to be updated Country1",
                "soon to be updated Street1",
                "soon to be updated City1",
                "soon to be updated Country1",
                46.300,
                29.20,
                "soon to be updated PlaceDesc1",
                "somePicDesc1",
                "someAperture1",
                "someFocal1",
                "someShutter1",
                "someIso1",
                "someFlash1",
                "someYT1",
                "someX11",
                "someX21",
                "somePartic1");
        Place oldPlace = new Place(placeId,
                "old Url1",
                "someImage",
                "old Type1",
                "old Title1",
                "oldStreet1, oldCity1, oldCountry1",
                "oldStreet1",
                "oldCity1",
                "oldCountry1",
                56.300,
                9.20,
                "oldlaceDesc1",
                "oldPicDesc1",
                "oldAperture1",
                "oldocal1",
                "oldShutter1",
                "oldIso1",
                "oldFlash1",
                "oldYT1",
                "oldX11",
                "oldX21",
                "oldPartic1",
                timestamp);
        Place updatedPlace = new Place(placeId,
                "old Url1",
                "someImage",
                "soon to be updated Type1",
                "soon to be updated Title1",
                "soon to be updated Street1, soon to be updated City1, soon to be updated Country1",
                "soon to be updated Street1",
                "soon to be updated City1",
                "soon to be updated Country1",
                46.300,
                29.20,
                "soon to be updated PlaceDesc1",
                "somePicDesc1",
                "someAperture1",
                "someFocal1",
                "someShutter1",
                "someIso1",
                "someFlash1",
                "someYT1",
                "someX11",
                "someX21",
                "somePartic1",
                timestamp);

        //WHEN
        when(timestampUtils.generateTimestampEpochSeconds()).thenReturn(timestamp);
        when(placesMongoDao.findById(placeId)).thenReturn(Optional.of(oldPlace));
        Place result = placeService.update(update, placeId);

        when(placesMongoDao.save(updatedPlace)).thenReturn(updatedPlace);



        //THEN
        assertThat(updatedPlace, is(result));
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

