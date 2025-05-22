package SOMS.super_backend.repository;

import SOMS.super_backend.entity.OtpVerification;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface OtpVerificationRepository extends MongoRepository<OtpVerification, String> {
    Optional<OtpVerification> findByEmailAndOtp(String email, String otp);
    void deleteByEmail(String email);
}
