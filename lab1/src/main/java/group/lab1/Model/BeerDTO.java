package group.lab1.Model;

public class BeerDTO implements Comparable<BeerDTO>{

    private Long id;
    private String name;
    private Integer prodYear;
    private String color;
    private Integer alcoholLvl;
    private Integer price;
    private String packaging;
    private String prodName;

    public String getProdName() {
        return prodName;
    }

    public void setProdName(String prodName) {
        this.prodName = prodName;
    }

    private Integer prodNrOfBreweries;

    public BeerDTO(Long id, String name, Integer prodYear, String color, Integer alcoholLvl, Integer price, String packaging, String prodName, Integer prodNrOfBreweries) {
        this.id = id;
        this.name = name;
        this.prodYear = prodYear;
        this.color = color;
        this.alcoholLvl = alcoholLvl;
        this.price = price;
        this.packaging = packaging;
        this.prodName = prodName;
        this.prodNrOfBreweries = prodNrOfBreweries;
    }

    @Override
    public String toString() {
        return "BeerDTO{" +
                "name='" + name + '\'' +
                ", prodYear=" + prodYear +
                ", color='" + color + '\'' +
                ", alcoholLvl=" + alcoholLvl +
                ", price=" + price +
                ", packaging='" + packaging + '\'' +
                ", prodNrOfBreweries=" + prodNrOfBreweries +
                '}';
    }

    public BeerDTO() {
    }

    public Integer getProdNrOfBreweries() {
        return prodNrOfBreweries;
    }

    public void setProdNrOfBreweries(Integer prodNrOfBreweries) {
        this.prodNrOfBreweries = prodNrOfBreweries;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getProdYear() {
        return prodYear;
    }

    public void setProdYear(Integer prodYear) {
        this.prodYear = prodYear;
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public int compareTo(BeerDTO otherBeer) {
        return Integer.compare(this.getProdYear(),otherBeer.getProdYear());
    }

    static public BeerDTO toDto(Beer beer){
        return new BeerDTO(beer.getId(), beer.getName(),beer.getProducer().getFounding_year(),beer.getColor(),beer.getAlcoholLvl(), beer.getPrice(), beer.getPackaging(), beer.getProducer().getName(), beer.getProducer().getNrOfBreweries());
    }
}

