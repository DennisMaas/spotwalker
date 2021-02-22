package de.dennismaas.thegramfworkingtitle.security;

import de.dennismaas.thegramfworkingtitle.dao.UserMongoDao;
import de.dennismaas.thegramfworkingtitle.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;
import java.util.Optional;

public class MongoDbUserDetailsService implements UserDetailsService {

    private final UserMongoDao userRepository;

    public MongoDbUserDetailsService(UserMongoDao userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> matchingUser = userRepository.findById(username);
        if (matchingUser.isPresent()){
            return new User(username, matchingUser.get().getPassword(), List.of());
        }
        throw new UsernameNotFoundException("User with name " + username + " not found");
    }
}
