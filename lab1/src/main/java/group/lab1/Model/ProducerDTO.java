package group.lab1.Model;

public class ProducerDTO {

    private Long id;
    private String name;
    private String country;
    private Integer founding_year;
    private String descr;
    private Integer nrOfBreweries;
    private Integer nrOfBeers;

    public ProducerDTO(Long id, String name, String country, Integer founding_year, String descr, Integer nrOfBreweries, Integer nrOfBeers) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.founding_year = founding_year;
        this.descr = descr;
        this.nrOfBreweries = nrOfBreweries;
        this.nrOfBeers = nrOfBeers;
    }

    public Integer getNrOfBeers() {
        return nrOfBeers;
    }

    public void setNrOfBeers(Integer nrOfBeers) {
        this.nrOfBeers = nrOfBeers;
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

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Integer getFounding_year() {
        return founding_year;
    }

    public void setFounding_year(Integer founding_year) {
        this.founding_year = founding_year;
    }

    public String getDescr() {
        return descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    public Integer getNrOfBreweries() {
        return nrOfBreweries;
    }

    public void setNrOfBreweries(Integer nrOfBreweries) {
        this.nrOfBreweries = nrOfBreweries;
    }

    static public ProducerDTO toDTO(Producer producer){
        return new ProducerDTO(producer.getId(),producer.getName(),producer.getCountry(), producer.getFounding_year(), producer.getDescr(), producer.getNrOfBreweries(), producer.getBeers().size());
    }
}
