package group.lab1.Service;

import com.auth0.jwt.interfaces.DecodedJWT;
import group.lab1.Model.User;
import group.lab1.Model.UserProfile;
import group.lab1.Repo.UserProfileRepo;
import group.lab1.Repo.UserRepo;
import group.lab1.Security.JWTHandler;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;

import java.rmi.ServerException;
import java.util.Date;
import java.util.Optional;

@org.springframework.stereotype.Service
public class LoginService implements ILoginService{

    @Autowired
    UserRepo userRepo;

    @Autowired
    UserProfileRepo userProfileRepo;

    @Override
    public String register(User user,UserProfile userProfile) throws ServerException {
        if(user.getPassword().length() < 8) {
            throw new ServerException("Password should be at least 8 characters long");
        }
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        if(userRepo.findById(user.getUserName()).isPresent()) {
            throw new ServerException("User with such username already exists");
        }
        if(userProfile.getEmail()=="") {
            throw new ServerException("Email can't be empty");
        }
        if(userProfile.getDescription()==""){
            throw new ServerException("Description can't be empty");
        }
        if(userProfile.getAddress()==""){
            throw new ServerException("Address can't be empty");
        }
        userRepo.save(user);
        userProfileRepo.save(userProfile);
        return JWTHandler.getRegisterToken(user.getUserName());
    }

    @Override
    public String login(User user) throws ServerException {
        User repoUser = userRepo.findById(user.getUserName()).orElse(null);
        if(repoUser == null) {
            throw new ServerException("Username or password invalid");
        }

        if(!BCrypt.checkpw(user.getPassword(), repoUser.getPassword())) {
            throw new ServerException("Username or password invalid");
        }

        return JWTHandler.getLoginToken(user.getUserName());
    }

    @Override
    public void activateUser(String token) throws ServerException {
        DecodedJWT decodedJWT = JWTHandler.decodeRegisterToken(token);
        if(decodedJWT.getExpiresAt().before(new Date())) {
            userRepo.deleteById(decodedJWT.getClaim("userName").asString());
            userProfileRepo.deleteById(decodedJWT.getClaim("userName").asString());
            throw new ServerException("Token expired");
        }
        Optional<User> user = userRepo.findById(decodedJWT.getClaim("userName").asString());
        if(user.isEmpty()){
            throw new ServerException("User not found");
        }
        user.get().setActivated(true);
        userRepo.save(user.get());
    }
}
