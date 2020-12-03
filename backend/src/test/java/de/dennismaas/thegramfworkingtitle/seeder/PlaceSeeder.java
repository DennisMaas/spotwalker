package de.dennismaas.thegramfworkingtitle.seeder;

import de.dennismaas.thegramfworkingtitle.model.Place;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

public class PlaceSeeder {
    private static final List<Place> places = new ArrayList<>(List.of(
            new Place("someId", "someUrl", "someType", "someTitle",  "someAddress", "someLat", "someLong", "somePlaceDesc", "somePicDesc", "someAperture", "someFocal", "someShutter", "someIso", "someFlash", "someYT", "someX1", "someX2", "somePartic", Instant.parse("2016-11-30T18:35:24.00Z")),
            new Place("someId1", "someUrl1", "someType1", "someTitle1",  "someAddress1", "someLat1", "someLong1", "somePlaceDesc1", "somePicDesc1", "someAperture1", "someFocal1", "someShutter1", "someIso1", "someFlash1", "someYT1", "someX11", "someX21", "somePartic1", Instant.parse("2017-11-30T18:35:24.00Z")),
            new Place("someId2", "someUrl2", "someType2", "someTitle2",  "someAddress2", "someLat2", "someLong2", "somePlaceDesc2", "somePicDesc2", "someAperture2", "someFocal2", "someShutter2", "someIso2", "someFlash2", "someYT2", "someX12", "someX22", "somePartic2", Instant.parse("2018-11-30T18:35:24.00Z")),
            new Place("someId3", "someUrl3", "someType3", "someTitle3", "someAddress3", "someLat3", "someLong3", "somePlaceDesc3", "somePicDesc3", "someAperture3", "someFocal3", "someShutter3", "someIso3", "someFlash3", "someYT3", "someX13", "someX23", "somePartic3", Instant.parse("2019-11-30T18:35:24.00Z"))
    ));

    public static List<Place> getStockPlaces() {return places;}
}
