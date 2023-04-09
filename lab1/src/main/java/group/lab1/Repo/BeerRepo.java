package group.lab1.Repo;

import group.lab1.Model.Beer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BeerRepo extends JpaRepository<Beer,Long> {

    @Query(value="SELECT * FROM beers WHERE beers.id>=?1 AND beers.id<=?1+99",nativeQuery = true)
    List<Beer> findByPage(Long page);
}
