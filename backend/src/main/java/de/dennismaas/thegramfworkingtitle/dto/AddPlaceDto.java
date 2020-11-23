package de.dennismaas.thegramfworkingtitle.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class AddPlaceDto {

    private String type;
    private String title;
    private String street;
    private String address;
    private String latitude;
    private String longitude;
    private String placeDescription;
    private String pictureDescription;
    private String aperture;
    private String focalLength;
    private String shutterSpeed;
    private String iso;
    private String flash;
    private String youTubeUrl;
    private String extraOne;
    private String extraTwo;
    private String particularities;
}
