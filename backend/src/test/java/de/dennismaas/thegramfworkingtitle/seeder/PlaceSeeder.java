package de.dennismaas.thegramfworkingtitle.seeder;

import de.dennismaas.thegramfworkingtitle.model.Place;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

public class PlaceSeeder {
    private static final List<Place> places = new ArrayList<>(List.of(
            new Place("someId", "someUrl", "someImage", "someType", "someTitle",  "someStreet, someCity, someCountry", "someStreet", "someCity", "someCountry", 56.000, 9.10,"somePlaceDesc", "somePicDesc", "someAperture", "someFocal", "someShutter", "someIso", "someFlash", "someYT", "someX1", "someX2", "somePartic", Instant.parse("2016-11-30T18:35:24.00Z")),
            new Place("someId1", "someUrl1", "someImage1",  "someType1", "someTitle1",  "someStreet1, someCity1, someCountry1","someStreet1", "someCity1", "someCountry1",  56.300, 3.10,"somePlaceDesc1", "somePicDesc1", "someAperture1", "someFocal1", "someShutter1", "someIso1", "someFlash1", "someYT1", "someX11", "someX21", "somePartic1", Instant.parse("2017-11-30T18:35:24.00Z")),
            new Place("someId2", "someUrl2","someImage2",  "someType2", "someTitle2",  "someStreet2, someCity2, someCountry2","someStreet2", "someCity2", "someCountry2",  6.000, 9.330, "somePlaceDesc2", "somePicDesc2", "someAperture2", "someFocal2", "someShutter2", "someIso2", "someFlash2", "someYT2", "someX12", "someX22", "somePartic2", Instant.parse("2018-11-30T18:35:24.00Z")),
            new Place("someId3", "someUrl3","someImage3",  "someType3", "someTitle3", "someStreet3, someCity3, someCountry3","someStreet3", "someCity3", "someCountry3",  56.0300, 9.103, "somePlaceDesc3", "somePicDesc3", "someAperture3", "someFocal3", "someShutter3", "someIso3", "someFlash3", "someYT3", "someX13", "someX23", "somePartic3", Instant.parse("2019-11-30T18:35:24.00Z"))
    ));

    public static List<Place> getStockPlaces() {return places;}
}
