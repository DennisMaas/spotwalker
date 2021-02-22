package de.dennismaas.thegramfworkingtitle.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.time.Duration;
import java.time.Instant;
import java.util.Map;

@Service
public class JwtUtils {

    @Value("jwt.secretkey")
    private String secretKey;

    public String createToken(Map<String, Object> claims, String username){
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(Date.from(Instant.now().plus(Duration.ofMinutes(120))))
                .setSubject(username)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

    }
}
