package group.lab1.Repo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import group.lab1.Model.Beer;
import group.lab1.Model.Brewery;
import group.lab1.Model.BreweryDTO;
import jakarta.persistence.Tuple;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BreweryRepo extends JpaRepository<Brewery,Long> {
    @Query(value="SELECT b FROM Brewery b WHERE b.id>=?1 AND b.id<=?1+99")
    List<Brewery> findByPage(Long page);

    @Query(value="SELECT COUNT(b.id) FROM BeerBrewery b WHERE b.brewery.id=?1")
    Integer findNrOfBeers(Long id);

    @Query(value="SELECT b.id,b.name FROM breweries b WHERE b.name LIKE %:input% ORDER BY b.id LIMIT 100 ",nativeQuery = true)
    List<Tuple> getNameAndId(@Param("input") String userInput);
}
