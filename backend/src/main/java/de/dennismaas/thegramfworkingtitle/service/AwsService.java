package de.dennismaas.thegramfworkingtitle.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import de.dennismaas.thegramfworkingtitle.utils.IdUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
@Service
@Slf4j
public class AwsService {

    @Value("${aws.bucket.name}")
    private String bucketName;

    private final AmazonS3 s3Client;
    private final IdUtils idUtils;

    @Autowired
    public AwsService(AmazonS3 s3Client, IdUtils idUtils) {
        this.s3Client = s3Client;
        this.idUtils = idUtils;
    }

    public String upload(MultipartFile file) {

        String randomImageName = idUtils.generateId();
        try {
            ObjectMetadata metadata = new ObjectMetadata();
            PutObjectRequest request = new PutObjectRequest(bucketName, randomImageName, file.getInputStream(), metadata);
            s3Client.putObject(request);

            return randomImageName;

        } catch (Exception e) {
            log.error("failed to upload image", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }
}