package de.dennismaas.thegramfworkingtitle.service;

import de.dennismaas.thegramfworkingtitle.dao.PlacesMongoDao;
import de.dennismaas.thegramfworkingtitle.model.Place;
import de.dennismaas.thegramfworkingtitle.seeder.PlaceSeeder;
import de.dennismaas.thegramfworkingtitle.utils.IdUtils;
import de.dennismaas.thegramfworkingtitle.utils.TimestampUtils;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class PlaceServiceTest {
    // Given
    final IdUtils idUtils = mock(IdUtils.class);
    final TimestampUtils timestampUtils = mock(TimestampUtils.class);
    final PlacesMongoDao placesMongoDao = mock(PlacesMongoDao.class);
    final PlaceService placeService = new PlaceService(placesMongoDao, idUtils, timestampUtils);

    @Test
    void search() {
        //GIVEN
       when(placesMongoDao.findAll()).thenReturn(PlaceSeeder.getStockPlaces());
        //WHEN
        List<Place> allPlaces = placeService.search(Optional.empty());

        //THEN
        assertThat(allPlaces, containsInAnyOrder(PlaceSeeder.getStockPlaces().toArray()));

    }

    @Test
    void findById() {
    }

    @Test
    void add() {
    }

    @Test
    void update() {
    }
}