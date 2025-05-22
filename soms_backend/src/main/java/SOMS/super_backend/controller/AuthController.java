package SOMS.super_backend.controller;


import SOMS.super_backend.DTO.ForgotPasswordRequest;
import SOMS.super_backend.DTO.ResetPasswordRequest;
import SOMS.super_backend.entity.OtpVerification;
import SOMS.super_backend.entity.User;
import SOMS.super_backend.repository.OtpVerificationRepository;
import SOMS.super_backend.security.JwtUtil;
import SOMS.super_backend.service.AuthService;
import SOMS.super_backend.service.EmailService;
import SOMS.super_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import SOMS.super_backend.DTO.JwtResponse;
import SOMS.super_backend.DTO.LoginRequest;
import SOMS.super_backend.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Random;


@CrossOrigin(origins = "/*") // Update if frontend runs on another port
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtil jwtUtils;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private OtpVerificationRepository otpRepo;

    @Autowired
    private EmailService emailService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        // Check if email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists. Please use a different one.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }


    @PostMapping("/login")
    public JwtResponse login(@RequestBody LoginRequest request) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtils.generateToken(user.getEmail(), user.getId(),user.getRole());
        return new JwtResponse(token, user.getRole(),user.getName(),user.getId());

    }


//    forgot password endpoint
@PostMapping("/forgot-password")
public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request) {
    User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));

    String otp = String.valueOf(new Random().nextInt(900000) + 100000);

    OtpVerification otpVerification = new OtpVerification();
    otpVerification.setEmail(user.getEmail());
    otpVerification.setOtp(otp);
    otpVerification.setExpiryTime(LocalDateTime.now().plusMinutes(2));
    otpRepo.save(otpVerification);

    emailService.sendOtpEmail(user.getEmail(), otp);

    return ResponseEntity.ok("OTP sent to your registered email.");
}


//    Reset password endpoint

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        OtpVerification otpVerification = otpRepo.findByEmailAndOtp(request.getEmail(), request.getOtp())
                .orElseThrow(() -> new RuntimeException("Invalid OTP."));

        if (otpVerification.getExpiryTime().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("OTP has expired.");
        }

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        otpRepo.deleteByEmail(request.getEmail()); // Remove used OTP

        return ResponseEntity.ok("Password reset successfully.");
    }


    @GetMapping("/health")
    public String health(){
        return "all endpoint are opening";
    }

}

