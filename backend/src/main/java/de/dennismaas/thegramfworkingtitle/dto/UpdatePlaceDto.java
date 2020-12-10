package de.dennismaas.thegramfworkingtitle.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdatePlaceDto {

    private String id;
    private String primaryPictureUrl;
    private String primaryImageName;
    private String type;
    private String title;
    private String address;
    private String street;
    private String city;
    private String country;
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
