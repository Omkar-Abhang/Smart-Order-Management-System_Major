package SOMS.super_backend.service;

import SOMS.super_backend.entity.User;
import SOMS.super_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@RestController

public class UserService {

    @Autowired
    private UserRepository userRepository;

    // 🔹 Register a New User
    public User registerUser(User user) {
        if (userRepository.existsByPhone(user.getPhone())) {
            throw new RuntimeException("Phone number already registered!");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already registered!");
        }
        return userRepository.save(user);
    }

    // 🔹 Get User by ID
    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    // 🔹 Get User by Phone Number (for OTP login)
    public Optional<User> getUserByPhone(String phone) {
        return userRepository.findByPhone(phone);
    }

    // 🔹 Get User by Email
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // 🔹 Update User Info
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    // 🔹 Delete User by ID
    public void deleteUserById(String id) {
        userRepository.deleteById(id);
    }

    // 🔹 Add an Order ID to User Order History
    public User addOrderToUser(String userId, String orderId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.getOrderIds().add(orderId);
            return userRepository.save(user);
        }
        return null;
    }

}
