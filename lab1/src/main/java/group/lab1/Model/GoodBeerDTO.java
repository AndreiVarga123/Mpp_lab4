package group.lab1.Model;

import java.util.ArrayList;
import java.util.List;

public class GoodBeerDTO {
    private Long id;
    private String name;
    private String color;
    private Integer alcoholLvl;
    private Integer price;
    private String packaging;
    private ProducerDTO prod;
    private List<BeerBreweryDTO> beerBreweries;

    public GoodBeerDTO(Long id, String name, String color, Integer alcoholLvl, Integer price, String packaging, ProducerDTO prod, List<BeerBreweryDTO> beerBreweries) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.alcoholLvl = alcoholLvl;
        this.price = price;
        this.packaging = packaging;
        this.prod = prod;
        this.beerBreweries = beerBreweries;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Integer getAlcoholLvl() {
        return alcoholLvl;
    }

    public void setAlcoholLvl(Integer alcoholLvl) {
        this.alcoholLvl = alcoholLvl;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getPackaging() {
        return packaging;
    }

    public void setPackaging(String packaging) {
        this.packaging = packaging;
    }

    public ProducerDTO getProd() {
        return prod;
    }

    public void setProd(ProducerDTO prod) {
        this.prod = prod;
    }

    public List<BeerBreweryDTO> getBeerBreweries() {
        return beerBreweries;
    }

    public void setBeerBreweries(List<BeerBreweryDTO> beerBreweries) {
        this.beerBreweries = beerBreweries;
    }

    static public GoodBeerDTO toDTO(Beer beer){
        List<BeerBreweryDTO> list = new ArrayList<>();
        for(BeerBrewery beerBrewery : beer.getBeerBreweries()){
            list.add(BeerBreweryDTO.toDTO(beerBrewery));
        }
        return new GoodBeerDTO(beer.getId(), beer.getName(), beer.getColor(), beer.getAlcoholLvl(), beer.getPrice(), beer.getPackaging(),ProducerDTO.toDTO(beer.getProducer()),list);
    }
}
