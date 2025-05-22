package SOMS.super_backend.controller.AdminControllers;

import SOMS.super_backend.entity.User;
import SOMS.super_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class UsersController {

    @Autowired UserService userService;

    @GetMapping("/userlist")
    public List<User> getusers(){
        return userService.getallUser();
    }




}
