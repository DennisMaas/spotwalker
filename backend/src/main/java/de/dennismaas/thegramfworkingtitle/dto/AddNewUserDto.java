package de.dennismaas.thegramfworkingtitle.dto;

import de.dennismaas.thegramfworkingtitle.validation.ValidEmail;
import de.dennismaas.thegramfworkingtitle.validation.ValidPassword;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class AddNewUserDto {

    @NotNull
    @Size(min = 1, message = "{Size.AddNewUserDto.firstName}")
    private String firstName;

    @NotNull
    @Size(min = 1, message = "{Size.AddNewUserDto.lastName}")
    private String lastName;

    @ValidEmail
    @NotNull
    @Size(min = 5, message = "{Size.AddNewUserDto.email}")
    private String email;

    @ValidPassword
    private String password;

    @NotNull
    @Size(min = 8)
    private String matchingPassword;

}
