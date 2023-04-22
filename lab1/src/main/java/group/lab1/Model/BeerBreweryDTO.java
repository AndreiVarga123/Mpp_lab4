package group.lab1.Model;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import jakarta.persistence.*;

public class BeerBreweryDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long beer;
    private Long brewery;
    private Integer quantity;
    private Boolean tested;

    public BeerBreweryDTO(Long id, Long beer, Long brewery, Integer quantity, Boolean tested) {
        this.id = id;
        this.beer = beer;
        this.brewery = brewery;
        this.quantity = quantity;
        this.tested = tested;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getBeer() {
        return beer;
    }

    public void setBeer(Long beer) {
        this.beer = beer;
    }

    public Long getBrewery() {
        return brewery;
    }

    public void setBrewery(Long brewery) {
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

    static public BeerBreweryDTO toDTO(BeerBrewery beerBrewery){
        return new BeerBreweryDTO(beerBrewery.getId(), beerBrewery.getBeer().getId(),beerBrewery.getBrewery().getId(),beerBrewery.getQuantity(),beerBrewery.getTested());
    }
}
