package de.dennismaas.thegramfworkingtitle.controller;

import de.dennismaas.thegramfworkingtitle.dao.PlacesMongoDao;
import de.dennismaas.thegramfworkingtitle.dto.AddPlaceDto;
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
import java.util.Arrays;
import java.util.List;

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
                new Place("someId", "someUrl","someType", "someTitle", "someStreet", "someAddress", "someLat", "someLong", "somePlaceDesc", "somePicDesc", "someAperture", "someFocal", "someShutter","someIso", "someFlash", "someYT", "someX1", "someX2", "somePartic", Instant.parse("2016-11-30T18:35:24.00Z") ),
                new Place("someId1", "someUrl1", "someType1", "someTitle1", "someStreet1", "someAddress1", "someLat1", "someLong1", "somePlaceDesc1", "somePicDesc1", "someAperture1", "someFocal1", "someShutter1","someIso1", "someFlash1", "someYT1", "someX11", "someX21", "somePartic1", Instant.parse("2017-11-30T18:35:24.00Z")),
                new Place("someId2", "someUrl2", "someType2", "someTitle2", "someStreet2", "someAddress2", "someLat2", "someLong2", "somePlaceDesc2", "somePicDesc2", "someAperture2", "someFocal2", "someShutter2","someIso2", "someFlash2", "someYT2", "someX12", "someX22", "somePartic2", Instant.parse("2018-11-30T18:35:24.00Z")),
                new Place("someId3", "someUrl3", "someType3", "someTitle3", "someStreet3", "someAddress3", "someLat3", "someLong3", "somePlaceDesc3", "somePicDesc3", "someAperture3", "someFocal3", "someShutter3","someIso3", "someFlash3", "someYT3", "someX13", "someX23", "somePartic3", Instant.parse("2019-11-30T18:35:24.00Z"))
        ));

    }

    private String getPlaceUrl() { return "http://localhost:" + port + "/api/places";}



    @Test
    public void getPlacesShouldReturnAllItemsFromDb() {
        //GIVEN
        String url = getPlaceUrl();

        //WHEN
        ResponseEntity<Place[]> response = restTemplate.getForEntity(url, Place[].class);
        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(Arrays.asList(response.getBody()), containsInAnyOrder(
                new Place("someId", "someUrl","someType", "someTitle", "someStreet", "someAddress", "someLat", "someLong", "somePlaceDesc", "somePicDesc", "someAperture", "someFocal", "someShutter","someIso", "someFlash", "someYT", "someX1", "someX2", "somePartic", Instant.parse("2016-11-30T18:35:24.00Z") ),
                new Place("someId1", "someUrl1", "someType1", "someTitle1", "someStreet1", "someAddress1", "someLat1", "someLong1", "somePlaceDesc1", "somePicDesc1", "someAperture1", "someFocal1", "someShutter1","someIso1", "someFlash1", "someYT1", "someX11", "someX21", "somePartic1", Instant.parse("2017-11-30T18:35:24.00Z")),
                new Place("someId2", "someUrl2", "someType2", "someTitle2", "someStreet2", "someAddress2", "someLat2", "someLong2", "somePlaceDesc2", "somePicDesc2", "someAperture2", "someFocal2", "someShutter2","someIso2", "someFlash2", "someYT2", "someX12", "someX22", "somePartic2", Instant.parse("2018-11-30T18:35:24.00Z")),
                new Place("someId3", "someUrl3", "someType3", "someTitle3", "someStreet3", "someAddress3", "someLat3", "someLong3", "somePlaceDesc3", "somePicDesc3", "someAperture3", "someFocal3", "someShutter3","someIso3", "someFlash3", "someYT3", "someX13", "someX23", "somePartic3", Instant.parse("2019-11-30T18:35:24.00Z"))
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
                "someStreet",
                "someAddress",
                "someLat",
                "someLong",
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
                "someStreet",
                "someAddress",
                "someLat",
                "someLong",
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

}
