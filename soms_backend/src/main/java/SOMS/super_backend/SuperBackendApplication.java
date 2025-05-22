package SOMS.super_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class SuperBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(SuperBackendApplication.class, args);
	}

	@GetMapping("/health")
	public String health(){
		return "All Endpoints Are Running";

	}

}
