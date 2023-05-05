package group.lab1.Repo;

import group.lab1.Model.Beer;
import group.lab1.Model.BeerBrewery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BeerBreweryRepo extends JpaRepository<BeerBrewery, Long> {
    @Query(value="SELECT b FROM BeerBrewery b JOIN FETCH b.beer JOIN FETCH b.brewery WHERE b.id>=?1 AND b.id<=?1+99 ORDER BY b.id")
    List<BeerBrewery> findByPage(Long page);
}
