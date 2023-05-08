package group.lab1.Repo;

import group.lab1.Model.Beer;
import jakarta.persistence.Tuple;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BeerRepo extends JpaRepository<Beer,Long> {

    @Query(value="SELECT b FROM Beer b JOIN FETCH b.producer  WHERE b.id>=?1 AND b.id<=?1+99")
    List<Beer> findByPage(Long page);

    @Query(value="SELECT COUNT(b.id) FROM BeerBrewery b WHERE b.beer.id=?1")
    Integer findNrOfBreweries(Long id);

    @Query(value="SELECT b.id,b.name FROM beers b WHERE b.name LIKE %:input% ORDER BY b.id LIMIT 100 ",nativeQuery = true)
    List<Tuple> getNameAndId(@Param("input") String userInput);


    @Query(value="SELECT MAX(b.id) from Beer b")
    Long findLastPage();
}
