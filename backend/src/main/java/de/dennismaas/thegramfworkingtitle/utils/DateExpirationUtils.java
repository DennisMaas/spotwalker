package de.dennismaas.thegramfworkingtitle.utils;

import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class DateExpirationUtils {
    public Date getExpirationTime() {
        Date expiration = new Date();
        long expTimeMillis = expiration.getTime();
        expTimeMillis += 1000 * 60 * 60;
        expiration.setTime(expTimeMillis);
        return expiration;
    }
}
