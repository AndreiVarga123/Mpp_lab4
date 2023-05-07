package group.lab1.Repo;

import group.lab1.Model.Producer;
import group.lab1.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User,String> {
}
