package SOMS.super_backend.service;


import SOMS.super_backend.entity.Coupon;
import SOMS.super_backend.repository.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
@RestController

public class CouponService {

    @Autowired
    private CouponRepository couponRepository;

    // 🔹 Create or Update Coupon
    public Coupon createOrUpdateCoupon(Coupon coupon) {
        return couponRepository.save(coupon);
    }

    // 🔹 Get All Coupons
    public List<Coupon> getAllCoupons() {
        return couponRepository.findAll();
    }

    // 🔹 Get Coupon by Code
    public Optional<Coupon> getCouponByCode(String code) {
        return couponRepository.findByCode(code);
    }

    // 🔹 Delete Coupon by ID
    public void deleteCoupon(String couponId) {
        couponRepository.deleteById(couponId);
    }

    // 🔹 Validate Coupon (Check Expiry & Usage Limit)
    public boolean validateCoupon(String code, String userId, double orderAmount) {
        Optional<Coupon> couponOpt = couponRepository.findByCode(code);

        if (couponOpt.isPresent()) {
            Coupon coupon = couponOpt.get();

            // Check if usage limit is reached
            if (coupon.getUsedBy().size() >= coupon.getUsageLimit()) {
                return false;
            }

            // Check if coupon is still valid
            LocalDate currentDate = LocalDate.now();
            LocalDate validFrom = LocalDate.parse(coupon.getValidFrom(), DateTimeFormatter.ISO_DATE);
            LocalDate validTill = LocalDate.parse(coupon.getValidTill(), DateTimeFormatter.ISO_DATE);

            if (currentDate.isBefore(validFrom) || currentDate.isAfter(validTill)) {
                return false;
            }

            // Check if order amount meets the minimum requirement
            if (orderAmount < coupon.getMinimumOrderAmount()) {
                return false;
            }

            // If all checks pass, mark the coupon as used
            coupon.getUsedBy().add(userId);
            couponRepository.save(coupon);
            return true;
        }
        return false;
    }
}
