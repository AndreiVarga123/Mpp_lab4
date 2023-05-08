package group.lab1.Model;

public class BreweryDTO {
    private Long id;
    private String name;
    private String location;
    private Integer year;
    private String descr;
    private String website;
    private Integer nrOfBeers;

    private String userName;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public BreweryDTO(Long id, String name, String location, Integer year, String descr, String website, Integer nrOfBeers, String userName) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.year = year;
        this.descr = descr;
        this.website = website;
        this.nrOfBeers = nrOfBeers;
        this.userName = userName;
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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getDescr() {
        return descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public Integer getNrOfBeers() {
        return nrOfBeers;
    }

    public void setNrOfBeers(Integer nrOfBeers) {
        this.nrOfBeers = nrOfBeers;
    }

    public static BreweryDTO toDTO(Brewery brewery,Integer nrOfBeers){
        return new BreweryDTO(brewery.getId(), brewery.getName(), brewery.getLocation(), brewery.getYear(), brewery.getDescr(), brewery.getWebsite(),nrOfBeers, "");
    }
}
