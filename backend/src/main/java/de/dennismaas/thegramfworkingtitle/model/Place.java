package de.dennismaas.thegramfworkingtitle.model;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;



@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "places")
public class Place {
    @Id
    private String id;
    private String primaryPictureUrl;
    private String type;
    private String title;
    private String street;
    private String address;
    private String placeDescription;
    private String pictureDescription;
    private String aperture;
    private String focalLength;
    private String shutterSpeed;
    private String iso;
    private String youTubeUrl;
    private String extraOne;
    private String extraTwo;

}
