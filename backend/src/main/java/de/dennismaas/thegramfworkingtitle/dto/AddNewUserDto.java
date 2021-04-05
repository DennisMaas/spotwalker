package de.dennismaas.thegramfworkingtitle.dto;

import de.dennismaas.thegramfworkingtitle.validation.ValidEmail;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import org.joda.time.DateTime;

import javax.validation.constraints.NotEmpty;
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
    @Size(min = 1, message = "{Size.AddNewUserDto.email}")
    private String email;

    @NotNull
    @NotEmpty
    private String password;

}
