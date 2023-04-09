package group.lab1;

import group.lab1.Repo.BeerBreweryRepo;
import group.lab1.Repo.BeerRepo;
import group.lab1.Repo.BreweryRepo;
import group.lab1.Repo.ProducerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class Lab1Application implements CommandLineRunner {

	@Value("${spring.datasource.url}")
	private String DB_URL;
	@Value("${spring.datasource.username}")
	private String USER;
	@Value("${spring.datasource.password}")
	private String PASS;

	public static void main(String[] args) {
		SpringApplication.run(Lab1Application.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("*");
			}
		};
	}

	@Autowired
	private BeerRepo beerRepo;

	@Autowired
	private BreweryRepo breweryRepo;

	@Autowired
	private ProducerRepo producerRepo;

	@Autowired
	private BeerBreweryRepo beerBreweryRepo;

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Override
	public void run(String... args) throws Exception {
		DataLoader dataLoader = new DataLoader(DB_URL,USER,PASS);
		dataLoader.deleteAll();
		dataLoader.populateAll();
	}
}
