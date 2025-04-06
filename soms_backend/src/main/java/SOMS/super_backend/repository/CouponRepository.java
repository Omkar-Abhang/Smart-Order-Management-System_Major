package SOMS.super_backend.repository;

import SOMS.super_backend.entity.Coupon;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface CouponRepository extends MongoRepository<Coupon, String> {
    Optional<Coupon> findByCode(String code); // Find coupon by its unique code
}

