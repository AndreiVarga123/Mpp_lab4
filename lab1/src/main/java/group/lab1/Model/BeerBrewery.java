package group.lab1.Model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

@Entity
@Table(name="BeerBrewery")
public class BeerBrewery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "beer_id")
    @JsonIncludeProperties({"id","name"})
    private Beer beer;

    @ManyToOne
    @JoinColumn(name = "brewery_id")
    @JsonIncludeProperties({"id","name"})
    private Brewery brewery;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "quality_tested")
    private Boolean tested;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_user_name")
    @JsonIgnoreProperties("beerBreweries")
    private User user;

    public BeerBrewery(Beer beer, Brewery brewery, Integer quantity, Boolean tested) {
        this.beer = beer;
        this.brewery = brewery;
        this.quantity = quantity;
        this.tested = tested;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BeerBrewery() {
    }

    public Beer getBeer() {
        return beer;
    }

    public void setBeer(Beer beer) {
        this.beer = beer;
    }

    public Brewery getBrewery() {
        return brewery;
    }

    public void setBrewery(Brewery brewery) {
        this.brewery = brewery;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Boolean getTested() {
        return tested;
    }
    public void setTested(Boolean tested) {
        this.tested = tested;
    }

}
