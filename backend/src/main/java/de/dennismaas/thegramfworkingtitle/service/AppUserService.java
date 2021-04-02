package de.dennismaas.thegramfworkingtitle.service;

import de.dennismaas.thegramfworkingtitle.dao.UserMongoDao;
import de.dennismaas.thegramfworkingtitle.model.AppUser;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AppUserService implements UserDetailsService {

    private final static String USER_NOT_FOUND_MSG = "Benutzer mit der Email %s nicht gefunden";
    private final UserMongoDao userRepository;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        final Optional<AppUser> matchingUser = userRepository.findByEmail(email);
            if (matchingUser.isPresent()){
                return matchingUser.get();
            } else {
                throw new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, email));
            }
    }

}