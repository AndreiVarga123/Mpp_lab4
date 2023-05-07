package group.lab1.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Table(name="users")
public class User {

    @Id
    @NotBlank
    private String userName;
    private String password;
    private boolean activated;

    @OneToMany(mappedBy = "user")
    @JsonIgnoreProperties("user")
    private List<Beer> beers;

    @OneToMany(mappedBy = "user")
    @JsonIgnoreProperties("user")
    private List<Producer> producers;

    @OneToMany(mappedBy = "user")
    @JsonIgnoreProperties("user")
    private List<Brewery> breweries;

    @OneToMany(mappedBy = "user")
    @JsonIgnoreProperties("user")
    private List<BeerBrewery> beerBreweries;

    @OneToOne(fetch = FetchType.LAZY,mappedBy="user")
    @JsonIgnoreProperties("user")
    private UserProfile userProfile;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isActivated() {
        return activated;
    }

    public void setActivated(boolean activated) {
        this.activated = activated;
    }

    public List<Beer> getBeers() {
        return beers;
    }

    public void setBeers(List<Beer> beers) {
        this.beers = beers;
    }

    public UserProfile getUserProfile() {
        return userProfile;
    }

    public void setUserProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
    }


}
