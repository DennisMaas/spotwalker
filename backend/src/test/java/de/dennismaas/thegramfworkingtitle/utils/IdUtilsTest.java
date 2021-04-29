package de.dennismaas.thegramfworkingtitle.utils;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.not;


class IdUtilsTest {
    private final IdUtils idUtils = new IdUtils();

    @Test
    @DisplayName("just a warmup: Id has length of 36 characters")
    void generateIdHasLengthOf36() {
        //Given
        int expectedLength = 36;

        //When
        int actualLength = idUtils.generateId().length();

        //Then
        assertThat(actualLength, is(expectedLength));

    }

    @Test
    @DisplayName("just a warmup: Each id is different")
    void generateIdDifferentEachTime() {
        //Given //When
        String firstId = idUtils.generateId();
        String secondId = idUtils.generateId();
        String thirdId = idUtils.generateId();
        String fourthId = idUtils.generateId();

        //Then
        assertThat(firstId,not(is(secondId)));
        assertThat(firstId,not(is(thirdId)));
        assertThat(firstId,not(is(fourthId)));
        assertThat(secondId,not(is(thirdId)));
        assertThat(secondId,not(is(fourthId)));
        assertThat(thirdId,not(is(fourthId)));


    }

}