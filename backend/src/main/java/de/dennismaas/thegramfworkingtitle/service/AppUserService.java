package de.dennismaas.thegramfworkingtitle.service;

import de.dennismaas.thegramfworkingtitle.dao.UserMongoDao;
import de.dennismaas.thegramfworkingtitle.dto.AddNewUserDto;
import de.dennismaas.thegramfworkingtitle.error.UserAlreadyExistException;
import de.dennismaas.thegramfworkingtitle.model.AppUser;
import de.dennismaas.thegramfworkingtitle.model.AppUserRole;
import de.dennismaas.thegramfworkingtitle.utils.IdUtils;
import lombok.AllArgsConstructor;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class AppUserService implements UserDetailsService {

    private final static String USER_NOT_FOUND_MSG = "Benutzer mit der Email %s nicht gefunden";
    private final static String USER_ALREADY_EXISTS_MSG = "Benutzer mit der Email %s existiert schon";

    private final IdUtils idUtils;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserMongoDao userMongoDao;


    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        return userMongoDao.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                String.format(USER_NOT_FOUND_MSG, email)));
    }

    private boolean emailExists(final String email) {
        return userMongoDao.findByEmail(email).isPresent();
    }

    public AppUser registerNewUserAccount(final AddNewUserDto userToBeRegistered) {
        if (emailExists(userToBeRegistered.getEmail())) {
            throw new UserAlreadyExistException(String.format(USER_ALREADY_EXISTS_MSG, userToBeRegistered.getEmail()));
        }
        final AppUser user = new AppUser();

        user.setId(idUtils.generateId());
        user.setFirstName(userToBeRegistered.getFirstName());
        user.setLastName(userToBeRegistered.getLastName());
        user.setPassword(bCryptPasswordEncoder.encode(userToBeRegistered.getPassword()));
        user.setEmail(userToBeRegistered.getEmail());
        user.setAccountCreationDate(DateTime.now());
        user.setAppUserRole(AppUserRole.USER);

        return userMongoDao.save(user);
    }
}

