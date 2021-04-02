package de.dennismaas.thegramfworkingtitle.security;

import de.dennismaas.thegramfworkingtitle.model.AppUser;
import de.dennismaas.thegramfworkingtitle.utils.IdUtils;
import de.dennismaas.thegramfworkingtitle.utils.TimestampUtils;
import lombok.*;
import org.springframework.data.annotation.Id;

import java.time.Instant;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ConfirmationToken {

    @Id
    private String id;
    private String confirmationToken;
    private Instant createdAt;
    private Instant expiresAt;
    private Instant confirmedAt;
    private AppUser appUser;
    private TimestampUtils timestampUtils;
    private IdUtils idUtils;

    public ConfirmationToken(String id, String confirmationToken, Instant createdAt, Instant expiresAt,  AppUser appUser) {
        this.id = idUtils.generateId();
        this.confirmationToken = idUtils.generateId();
        this.createdAt = timestampUtils.generateTimestampEpochSeconds();
        this.expiresAt = timestampUtils.generateTimestampEpochSeconds().plusSeconds(900);
        this.appUser = appUser;
    }

}
