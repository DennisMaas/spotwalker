package de.dennismaas.thegramfworkingtitle.security;


import de.dennismaas.thegramfworkingtitle.dao.UserMongoDao;
import de.dennismaas.thegramfworkingtitle.model.SpotwalkerUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MongoDbUserDetailsService implements UserDetailsService {

    private final UserMongoDao userRepository;

    @Autowired
    public MongoDbUserDetailsService(UserMongoDao userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<SpotwalkerUser> matchingUser = userRepository.findById(username);
        if (matchingUser.isPresent()){
            return new User(username, matchingUser.get().getPassword(), List.of());
        }
        throw new UsernameNotFoundException("SpotwalkerUser with name " + username + " not found");
    }
}
