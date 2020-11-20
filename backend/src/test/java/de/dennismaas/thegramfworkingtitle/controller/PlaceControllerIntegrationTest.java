package de.dennismaas.thegramfworkingtitle.controller;

import de.dennismaas.thegramfworkingtitle.dao.PlacesMongoDao;
import de.dennismaas.thegramfworkingtitle.model.Place;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PlaceControllerIntegrationTest {
    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private PlacesMongoDao placesMongoDao;

    @BeforeEach
    private String getPlacesUrl() { return "http://localhost:"+port+"/api/places";}

    @Test
    public void testGetByIdShouldReturnNotFoundWhenPlaceNotExists() {
    //GIVEN
    String url = getPlacesUrl() + "/unknownId";

    //WHEN
        ResponseEntity<Place> response = restTemplate.getForEntity(url, );

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
}}