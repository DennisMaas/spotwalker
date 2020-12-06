package de.dennismaas.thegramfworkingtitle.controller;

import de.dennismaas.thegramfworkingtitle.dao.PlacesMongoDao;
import de.dennismaas.thegramfworkingtitle.dto.AddPlaceDto;
import de.dennismaas.thegramfworkingtitle.dto.UpdatePlaceDto;
import de.dennismaas.thegramfworkingtitle.model.Place;
import de.dennismaas.thegramfworkingtitle.utils.IdUtils;
import de.dennismaas.thegramfworkingtitle.utils.TimestampUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PlaceControllerIntegrationTest {

    @LocalServerPort
    private int port;

    @MockBean
    private TimestampUtils mockedTimestampUtils;

    @MockBean
    private IdUtils mockedIdUtils;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private PlacesMongoDao placesMongoDao;

    @BeforeEach
    public void setupDb(){
        placesMongoDao.deleteAll();
        placesMongoDao.saveAll(List.of(
                new Place("someId", "someUrl","someType", "someTitle",  "someStreet, someCity, someCountry", "someStreet", "someCity", "someCountry",56.000, 9.10, "somePlaceDesc", "somePicDesc", "someAperture", "someFocal", "someShutter","someIso", "someFlash", "someYT", "someX1", "someX2", "somePartic", Instant.parse("2016-11-30T18:35:24.00Z") ),
                new Place("someId1", "someUrl1", "someType1", "someTitle1", "someStreet1, someCity1, someCountry1","someStreet1", "someCity1", "someCountry1", 56.300, 3.10,"somePlaceDesc1", "somePicDesc1", "someAperture1", "someFocal1", "someShutter1","someIso1", "someFlash1", "someYT1", "someX11", "someX21", "somePartic1", Instant.parse("2017-11-30T18:35:24.00Z")),
                new Place("someId2", "someUrl2", "someType2", "someTitle2",  "someStreet2, someCity2, someCountry2", "someStreet2", "someCity2", "someCountry2",6.000, 9.330, "somePlaceDesc2", "somePicDesc2", "someAperture2", "someFocal2", "someShutter2","someIso2", "someFlash2", "someYT2", "someX12", "someX22", "somePartic2", Instant.parse("2018-11-30T18:35:24.00Z")),
                new Place("someId3", "someUrl3", "someType3", "someTitle3",  "someStreet3, someCity3, someCountry3", "someStreet3", "someCity3", "someCountry3",56.0300, 9.103, "somePlaceDesc3", "somePicDesc3", "someAperture3", "someFocal3", "someShutter3","someIso3", "someFlash3", "someYT3", "someX13", "someX23", "somePartic3", Instant.parse("2019-11-30T18:35:24.00Z"))
        ));

    }

    private String getPlaceUrl() { return "http://localhost:" + port + "/api/places";}


    @Test
    public void testGetMapping() {
        // GIVEN
        List<Place> stockPlaces = new ArrayList<>(List.of(
                new Place("someId", "someUrl", "someType", "someTitle",  "someStreet, someCity, someCountry",  "someStreet", "someCity", "someCountry",56.000, 9.10, "somePlaceDesc", "somePicDesc", "someAperture", "someFocal", "someShutter", "someIso", "someFlash", "someYT", "someX1", "someX2", "somePartic", Instant.parse("2016-11-30T18:35:24.00Z")),
                new Place("someId1", "someUrl1", "someType1", "someTitle1", "someStreet1, someCity1, someCountry1", "someStreet1", "someCity1", "someCountry1", 56.300, 3.10,"somePlaceDesc1", "somePicDesc1", "someAperture1", "someFocal1", "someShutter1", "someIso1", "someFlash1", "someYT1", "someX11", "someX21", "somePartic1", Instant.parse("2017-11-30T18:35:24.00Z")),
                new Place("someId2", "someUrl2", "someType2", "someTitle2", "someStreet2, someCity2, someCountry2", "someStreet2", "someCity2", "someCountry2",6.000, 9.330, "somePlaceDesc2", "somePicDesc2", "someAperture2", "someFocal2", "someShutter2", "someIso2", "someFlash2", "someYT2", "someX12", "someX22", "somePartic2", Instant.parse("2018-11-30T18:35:24.00Z")),
                new Place("someId3", "someUrl3", "someType3", "someTitle3",  "someStreet3, someCity3, someCountry3", "someStreet3", "someCity3", "someCountry3",56.0300, 9.103, "somePlaceDesc3", "somePicDesc3", "someAperture3", "someFocal3", "someShutter3", "someIso3", "someFlash3", "someYT3", "someX13", "someX23", "somePartic3", Instant.parse("2019-11-30T18:35:24.00Z"))
        ));
        String url = getPlaceUrl();

        // WHEN
        ResponseEntity<Place[]> response = restTemplate.getForEntity(url, Place[].class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(stockPlaces.toArray()));
    }

        @Test
    public void getPlacesShouldReturnAllItemsFromDb() {
        //GIVEN
        String url = getPlaceUrl();

        //WHEN
        ResponseEntity<Place[]> response = restTemplate.getForEntity(url, Place[].class);
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(Arrays.asList(response.getBody()), containsInAnyOrder(
                new Place("someId", "someUrl","someType", "someTitle",  "someStreet, someCity, someCountry",
                        "someStreet", "someCity", "someCountry",56.000, 9.10,"somePlaceDesc", "somePicDesc", "someAperture", "someFocal", "someShutter","someIso", "someFlash", "someYT", "someX1", "someX2", "somePartic", Instant.parse("2016-11-30T18:35:24.00Z") ),
                new Place("someId1", "someUrl1", "someType1", "someTitle1",   "someStreet1, someCity1, someCountry1",
                        "someStreet1", "someCity1", "someCountry1",  56.300, 3.10, "somePlaceDesc1", "somePicDesc1", "someAperture1", "someFocal1", "someShutter1","someIso1", "someFlash1", "someYT1", "someX11", "someX21", "somePartic1", Instant.parse("2017-11-30T18:35:24.00Z")),
                new Place("someId2", "someUrl2", "someType2", "someTitle2",  "someStreet2, someCity2, someCountry2", "someStreet2", "someCity2", "someCountry2",6.000, 9.330, "somePlaceDesc2", "somePicDesc2", "someAperture2", "someFocal2", "someShutter2","someIso2", "someFlash2", "someYT2", "someX12", "someX22", "somePartic2", Instant.parse("2018-11-30T18:35:24.00Z")),
                new Place("someId3", "someUrl3", "someType3", "someTitle3",  "someStreet3, someCity3, someCountry3", "someStreet3", "someCity3", "someCountry3",56.0300, 9.103, "somePlaceDesc3", "somePicDesc3", "someAperture3", "someFocal3", "someShutter3","someIso3", "someFlash3", "someYT3", "someX13", "someX23", "somePartic3", Instant.parse("2019-11-30T18:35:24.00Z"))
        ));
    }


    @Test
    public void testGetByIdMapping(){
        //GIVEN
        String url = getPlaceUrl()+"/someId";

        //WHEN
        ResponseEntity<Place> response = restTemplate.getForEntity(url,Place.class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody().getTitle(), is("someTitle"));
    }

    @Test
    public void testGetByIdShouldReturnNotFoundWhenPlaceNotExists(){
        //GIVEN
        String url = getPlaceUrl()+"/unknownId";
        //WHEN
        ResponseEntity<Place> response = restTemplate.getForEntity(url,Place.class);
        // THEN
        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));

    }

    @Test
    public void postPlaceShouldAddNewPlace(){
        //GIVEN
        String url = getPlaceUrl();
        AddPlaceDto placeToAdd = new AddPlaceDto(
                "someUrl",
                "someType",
                "someTitle",
                "someStreet, someCity, someCountry",
                "someStreet", "someCity", "someCountry",
                56.0300, 9.103,
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
        when(mockedIdUtils.generateId()).thenReturn("some generated Id");
        when(mockedTimestampUtils.generateTimestampEpochSeconds()).thenReturn(Instant.parse("2018-11-30T18:35:24.00Z"));

        //WHEN
        HttpEntity<AddPlaceDto> entity = new HttpEntity<>(placeToAdd);
        ResponseEntity<Place> response = restTemplate.exchange(url,
                HttpMethod.POST,
                entity,
                Place.class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(new Place(
                "some generated Id",
                "someUrl",
                "someType",
                "someTitle",
                "someStreet, someCity, someCountry",
                "someStreet", "someCity", "someCountry",
                56.0300, 9.103,
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
                "somePartic",
                Instant.parse("2018-11-30T18:35:24.00Z")
        )));
    }


    @Test
    public void updatePlaceShouldUpdateExistingPlace(){
        //GIVEN
        String url = getPlaceUrl() + "/someId";

        long currentTimeInSeconds = Instant.now().getEpochSecond();
        Instant now = Instant.ofEpochSecond(currentTimeInSeconds);

        when(mockedTimestampUtils.generateTimestampEpochSeconds()).thenReturn(now);

        UpdatePlaceDto updatePlace = UpdatePlaceDto.builder()
                .id("someId")
                .primaryPictureUrl("someUrl")
                .type("someType")
                .title("someTitle")
                .address("someStreet, someCity, someCountry")
                .street("someStreet")
                .city("someCity")
                .country("someCountry")
                .lat(56.0300)
                .lng( 9.103)
                .placeDescription("somePlaceDesc")
                .pictureDescription("somePicDesc")
                .aperture("someAperture")
                .focalLength("someFocal")
                .shutterSpeed("someShutter")
                .iso("someIso")
                .flash("someFlash")
                .youTubeUrl("someYT")
                .extraOne("someX1")
                .extraTwo("someX2")
                .particularities("somePartic")
                .build();

        //WHEN
        HttpEntity<UpdatePlaceDto> entity = new HttpEntity<>(updatePlace);
        ResponseEntity<Place> response = restTemplate.exchange(url, HttpMethod.PUT, entity, Place.class);


        //THEN
        Optional<Place> savedPlace = placesMongoDao.findById("someId");

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        Place expectedPlace = Place.builder()
                .id("someId")
                .primaryPictureUrl("someUrl")
                .type("someType")
                .title("someTitle")
                .address("someStreet, someCity, someCountry")
                .street("someStreet")
                .city("someCity")
                .country("someCountry")
                .lat(56.0300)
                .lng( 9.103)
                .placeDescription("somePlaceDesc")
                .pictureDescription("somePicDesc")
                .aperture("someAperture")
                .focalLength("someFocal")
                .shutterSpeed("someShutter")
                .iso("someIso")
                .flash("someFlash")
                .youTubeUrl("someYT")
                .extraOne("someX1")
                .extraTwo("someX2")
                .particularities("somePartic")
                .timestamp(now)
                .build();
        assertThat(response.getBody(), is(expectedPlace));
        assertThat(savedPlace.get(), is(expectedPlace));
    }

    @Test
    public void updatePlaceShouldReturnBadRequestWhenIdsNotMatch(){
        //GIVEN
        String url = getPlaceUrl() + "/someId";

        long currentTimeInSeconds = Instant.now().getEpochSecond();
        Instant now = Instant.ofEpochSecond(currentTimeInSeconds);

        when(mockedTimestampUtils.generateTimestampEpochSeconds()).thenReturn(now);

        UpdatePlaceDto updatePlace = UpdatePlaceDto.builder()
                .id("mismatchedId")
                .primaryPictureUrl("someUrl")
                .type("someType")
                .title("someTitle")
                .address("someStreet, someCity, someCountry")
                .street("someStreet")
                .city("someCity")
                .country("someCountry")
                .lat(56.0300)
                .lng( 9.103)
                .placeDescription("somePlaceDesc")
                .pictureDescription("somePicDesc")
                .aperture("someAperture")
                .focalLength("someFocal")
                .shutterSpeed("someShutter")
                .iso("someIso")
                .flash("someFlash")
                .youTubeUrl("someYT")
                .extraOne("someX1")
                .extraTwo("someX2")
                .particularities("somePartic")
                .build();

        //WHEN
        HttpEntity<UpdatePlaceDto> entity = new HttpEntity<>(updatePlace);
        ResponseEntity<Place> response = restTemplate.exchange(url, HttpMethod.PUT, entity, Place.class);


        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.BAD_REQUEST));
    }

    @Test
    public void deletePlaceByIdShouldDeletePlace(){
        //GIVEN
        String url = getPlaceUrl() + "/someId";

        //WHEN
        ResponseEntity<Void> response = restTemplate.exchange(url, HttpMethod.DELETE, HttpEntity.EMPTY, Void.class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        boolean placePresent = placesMongoDao.findById("someId").isPresent();
        assertThat(placePresent, is(false));

    }

    @Test
    public void deletePlaceWithNotExistingIdShouldReturnNotFound(){
        //GIVEN
        String url = getPlaceUrl() + "/NotExistingID";


        //WHEN
        ResponseEntity<Void> response = restTemplate.exchange(url, HttpMethod.DELETE, HttpEntity.EMPTY, Void.class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));

    }

}
