package de.dennismaas.thegramfworkingtitle.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor

public class AddPlaceDto {

    private String primaryPictureUrl;
    private String type;
    private String title;
    private String address;
    private double lat;
    private double lng;
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
