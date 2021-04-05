package de.dennismaas.thegramfworkingtitle.validation;

import de.dennismaas.thegramfworkingtitle.dto.AddNewUserDto;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, Object> {

    @Override
    public void initialize(final PasswordMatches constraintAnnotation) {}

    @Override
    public boolean isValid(final Object obj, final ConstraintValidatorContext context) {
        final AddNewUserDto user = (AddNewUserDto) obj;
        return user.getPassword().equals(user.getMatchingPassword());
    }

}
