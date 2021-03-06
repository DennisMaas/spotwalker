package de.dennismaas.thegramfworkingtitle.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class CorsConfiguration implements WebMvcConfigurer {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:8080", "http://localhost:3000", "http://127.0.0.1:3000", "https://localhost:8080", "https://localhost:3000", "https://127.0.0.1:3000",
                                "https://spotwalker.de", "https://www.spotwalker.de", "https://api.spotwalker.de").allowCredentials(true).allowedMethods("*");
            }
        };
    }
}
