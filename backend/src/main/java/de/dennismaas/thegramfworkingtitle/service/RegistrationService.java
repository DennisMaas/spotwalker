package de.dennismaas.thegramfworkingtitle.service;

import de.dennismaas.thegramfworkingtitle.model.RegistrationRequest;
import org.springframework.stereotype.Service;

@Service
public class RegistrationService {
    public String register(RegistrationRequest request) {
        return "works";
    }
}
