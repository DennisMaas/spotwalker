package de.dennismaas.thegramfworkingtitle.controller;

import de.dennismaas.thegramfworkingtitle.dao.PlacesMongoDao;
import de.dennismaas.thegramfworkingtitle.model.Place;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;

import java.util.List;
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PlaceControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private PlacesMongoDao placesMongoDao;

    @BeforeEach
    public void setupDb(){
        placesMongoDao.deleteAll();
        placesMongoDao.saveAll(List.of(
                new Place("someId", "someUrl", "someType", "someTitle", "someStreet", "someAddress", "someLang", "someLong", "somePlaceDesc", "somePicDesc", "someAperture", "someFocal", "someShutter","someIso", "someFlash", "someYT", "someX1", "someX2", "somePartic" ),
                new Place("someId1", "someUrl1", "someType1", "someTitle1", "someStreet1", "someAddress1", "someLang1", "someLong1", "somePlaceDesc1", "somePicDesc1", "someAperture1", "someFocal1", "someShutter1","someIso1", "someFlash1", "someYT1", "someX11", "someX21", "somePartic1"),
                new Place("someId2", "someUrl2", "someType2", "someTitle2", "someStreet2", "someAddress2", "someLang2", "someLong2", "somePlaceDesc2", "somePicDesc2", "someAperture2", "someFocal2", "someShutter2","someIso2", "someFlash2", "someYT2", "someX12", "someX22", "somePartic2"),
                new Place("someId3", "someUrl3", "someType3", "someTitle3", "someStreet3", "someAddress3", "someLang3", "someLong3", "somePlaceDesc3", "somePicDesc3", "someAperture3", "someFocal3", "someShutter3","someIso3", "someFlash3", "someYT3", "someX13", "someX23", "somePartic3"),
        ));

    }

    private String getPlaceUrl() { return "http://localhost:" + port + "/api/places";}

}

