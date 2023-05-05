package group.lab1.Repo;

import group.lab1.Model.Beer;
import group.lab1.Model.Brewery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BreweryRepo extends JpaRepository<Brewery,Long> {
    @Query(value="SELECT b FROM Brewery b  WHERE b.id>=?1 AND b.id<=?1+99")
    List<Brewery> findByPage(Long page);
}
