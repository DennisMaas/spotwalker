package de.dennismaas.thegramfworkingtitle.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "user")
public class SpotwalkerUser {

    @Id
    private String username;
    private String password;
    private String displayName;
    private String avatarUrl;
    private boolean googleUser;


    public SpotwalkerUser(String username, String password){
        this.username = username;
        this.password = password;
    }
}
