package group.lab1.Repo;

import group.lab1.Model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileRepo extends JpaRepository<UserProfile,String> {
}

