package com.soundup.soundup;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
public class SoundupApplication {

	public static void main(String[] args) {
		SpringApplication.run(SoundupApplication.class, args);
	}

}
