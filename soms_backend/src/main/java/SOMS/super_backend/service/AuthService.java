package SOMS.super_backend.service;



import SOMS.super_backend.entity.User;
import SOMS.super_backend.repository.UserRepository;
import SOMS.super_backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Service
@RestController
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String login(String email, String password, String role) {
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) return null; // User not found

        User user = userOpt.get();

        if (!passwordEncoder.matches(password, user.getPassword())) return null; // Password mismatch

        if (!user.getRole().equalsIgnoreCase(role)) return null; // Role mismatch

        return jwtUtil.generateToken(user.getEmail(),user.getId(),user.getRole());
    }
}

