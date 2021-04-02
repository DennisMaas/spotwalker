package de.dennismaas.thegramfworkingtitle.security;

import io.jsonwebtoken.Claims;
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

    @Value("${jwt.secretkey}")
    private String secretKey;

    public String createToken(String username, Map<String, Object> claims ){
        return Jwts.builder()
                .setClaims(claims) //can overwrite subject, must be first
                .setSubject(username)
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(Date.from(Instant.now().plus(Duration.ofMinutes(120))))
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();

    }

    public Claims parseToken(String token){
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    }

    public boolean isExpired(Claims claims) {
        return claims.getExpiration().before(new Date());
    }
}
