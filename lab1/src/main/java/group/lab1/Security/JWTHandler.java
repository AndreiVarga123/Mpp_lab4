package group.lab1.Security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import org.apache.commons.lang3.time.DateUtils;

import java.rmi.ServerException;
import java.util.Date;

public class JWTHandler {
    public static DecodedJWT decodeRegisterToken(String token) throws ServerException {
        Algorithm algorithm = Algorithm.HMAC256(JWTSecretManager.getSecret());
        JWTVerifier verifier = JWT
                .require(algorithm)
                .withSubject("registerCode")
                .build();
        DecodedJWT decodedJWT;
        try {
            decodedJWT = verifier.verify(token);
        } catch (JWTVerificationException e) {
            throw new ServerException("Invalid token to activate user");
        }
        return decodedJWT;
    }

    public static String getUserHandleFromAuthHeader(String header) throws ServerException{
        if(!header.startsWith("Bearer ")) {
            throw new ServerException("Invalid token");
        }
        String token = header.substring(new String("Bearer ").length());
        Algorithm algorithm = Algorithm.HMAC256(JWTSecretManager.getSecret());
        JWTVerifier verifier = JWT
                .require(algorithm)
                .withSubject("auth")
                .build();
        DecodedJWT decodedJWT = null;
        try {
            decodedJWT = verifier.verify(token);
        } catch (JWTVerificationException e) {
            throw new ServerException("Invalid token for auth user");
        }
        return decodedJWT.getClaim("user_handle").asString();
    }

    public static String getRegisterToken(String userName) {
        Algorithm algorithm = Algorithm.HMAC256(JWTSecretManager.getSecret());
        return JWT.create()
                .withSubject("registerCode")
                .withClaim("userName", userName)
                .withIssuedAt(new Date())
                .withExpiresAt(DateUtils.addMinutes(new Date(), 10))
                .sign(algorithm);
    }

    public static String getLoginToken(String userName) {
        Algorithm algorithm = Algorithm.HMAC256(JWTSecretManager.getSecret());
        return JWT.create()
                .withSubject("auth")
                .withClaim("userName", userName)
                .withIssuedAt(new Date())
                .withExpiresAt(DateUtils.addMinutes(new Date(), 10))
                .sign(algorithm);
    }
}
