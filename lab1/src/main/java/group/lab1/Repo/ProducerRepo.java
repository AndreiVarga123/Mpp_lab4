package group.lab1.Repo;

import group.lab1.Model.Beer;
import group.lab1.Model.Producer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProducerRepo extends JpaRepository<Producer,Long> {
    @Query(value="SELECT p FROM Producer p WHERE p.id>=?1 AND p.id<=?1+99")
    List<Producer> findByPage(Long page);

    @Query(value="SELECT COUNT(b.id) FROM Beer b WHERE b.producer.id=?1")
    Integer findNrOfBeers(Long id);
}
