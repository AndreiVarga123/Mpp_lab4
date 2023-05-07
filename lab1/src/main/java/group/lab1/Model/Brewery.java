package group.lab1.Model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "Breweries")
public class Brewery {
    private @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
    @Column(name="name")
    private String name;

    @Column(name="location")
    private String location;

    @Column(name="founding_year")
    private Integer year;

    @Column(name="description")
    private String descr;

    @Column(name="website")
    private String website;

    @OneToMany(mappedBy = "brewery")
    @JsonIgnoreProperties("brewery")
    private List<BeerBrewery> beerBreweries;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_user_name")
    @JsonIgnoreProperties("breweries")
    private User user;



//    @OneToMany(mappedBy = "brewery",cascade = CascadeType.ALL)
//    private List<Beer> beers;

    public Brewery(String name, String location, Integer year, String descr, String website) {
        this.name = name;
        this.location = location;
        this.year = year;
        this.descr = descr;
        this.website = website;
    }

    public Brewery() {
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<BeerBrewery> getBeerBreweries() {
        return beerBreweries;
    }

    public void setBeerBreweries(List<BeerBrewery> beerBreweries) {
        this.beerBreweries = beerBreweries;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getLocation() {
        return location;
    }

    public Integer getYear() {
        return year;
    }

    public String getDescr() {
        return descr;
    }

    public String getWebsite() {
        return website;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    public void setWebsite(String website) {
        this.website = website;
    }
}
