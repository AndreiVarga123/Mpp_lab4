package group.lab1.Repo;

import group.lab1.Model.Beer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BeerRepo extends JpaRepository<Beer,Long> {

    @Query(value="SELECT b FROM Beer b JOIN FETCH b.producer  WHERE b.id>=?1 AND b.id<=?1+99")
    List<Beer> findByPage(Long page);

    @Query(value="SELECT b FROM Beer b JOIN FETCH b.producer  WHERE b.id=?1")
    Beer findByIdEager (Long id);
}
