package de.dennismaas.thegramfworkingtitle.controller;

import de.dennismaas.thegramfworkingtitle.dto.AddPlaceDto;
import de.dennismaas.thegramfworkingtitle.dto.UpdatePlaceDto;
import de.dennismaas.thegramfworkingtitle.model.Place;
import de.dennismaas.thegramfworkingtitle.service.AwsService;
import de.dennismaas.thegramfworkingtitle.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/places")
public class PlaceController {
    private final PlaceService placeService;
    private final AwsService awsService;

    @Autowired
    public PlaceController(PlaceService placeService, AwsService awsService){
        this.placeService = placeService;
        this.awsService = awsService;
    }

    @GetMapping
    public List<Place> getPlaces() {
        return placeService.getPlaces();
    }

    @GetMapping("{placeId}")
    public  Place getById(@PathVariable @NonNull String placeId) {
        return placeService.findById(placeId);
    }

    @PostMapping
    public Place add(@RequestBody AddPlaceDto addPlaceDto, Principal principal){
        addPlaceDto.setCreatorOfEntry(principal.getName());
        return this.placeService.add(addPlaceDto);
    }

    @PutMapping("{placeId}")
    public Place update(@PathVariable String placeId, @RequestBody UpdatePlaceDto updatedPlace) {
        if(!placeId.equals(updatedPlace.getId())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        return placeService.update(updatedPlace, placeId);
    }

    @DeleteMapping("{placeId}")
    public void remove(@PathVariable String placeId) {placeService.remove(placeId);}

    @PostMapping("/image")
    public String uploadImage(@RequestParam("image") MultipartFile file) {
        return awsService.upload(file);
    }
}
