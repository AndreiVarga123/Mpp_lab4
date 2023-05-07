package group.lab1.Service;

import group.lab1.Model.User;
import group.lab1.Model.UserProfile;

import java.rmi.ServerException;

public interface ILoginService {
    public String register(User user, UserProfile userProfile) throws ServerException;
    public String login( User user) throws ServerException;
    public void activateUser( String token) throws ServerException;
}
