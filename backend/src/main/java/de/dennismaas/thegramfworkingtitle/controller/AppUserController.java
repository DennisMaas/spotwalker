package de.dennismaas.thegramfworkingtitle.controller;

import de.dennismaas.thegramfworkingtitle.dto.AddNewUserDto;
import de.dennismaas.thegramfworkingtitle.model.AppUser;
import de.dennismaas.thegramfworkingtitle.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/registration")
public class AppUserController {

    private final AppUserService appUserService;

    @Autowired
    public AppUserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @PostMapping
    public AppUser registerNewUser(@RequestBody @Valid AddNewUserDto addNewUserDto){
        return this.appUserService.registerNewUserAccount(addNewUserDto);
    }
}
