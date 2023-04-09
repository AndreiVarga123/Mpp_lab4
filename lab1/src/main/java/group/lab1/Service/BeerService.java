package group.lab1.Service;

import group.lab1.Model.Beer;
import group.lab1.Model.BeerDTO;
import group.lab1.Repo.BeerRepo;
import org.w3c.dom.ranges.Range;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.LongStream;

@org.springframework.stereotype.Service
public class BeerService implements Service<Beer> {
    private BeerRepo repo;

    public BeerRepo getRepo() {
        return repo;
    }

    public void setRepo(BeerRepo repo) {
        this.repo = repo;
    }

    public BeerService(BeerRepo repo) {
        this.repo = repo;
    }

    @Override
    public List<Long> getAll() {

        List<Long> ids = new ArrayList<>();

        for(long i=1;i<=100;i++){
            ids.add(repo.findById(i).get().getId());
        }

        return ids;
    }

    @Override
    public Beer save(Beer beer) {
        return repo.save(beer);
    }

    @Override
    public Beer getById(Long id) {
        return repo.findById(id).get();
    }

    @Override
    public Beer update(Beer beer) {
        return repo.save(beer);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<Beer> filter(Integer nr){
        return repo.findAll().stream().filter(beer->beer.getPrice()>nr).collect(Collectors.toList());
    }


    public List<BeerDTO> getStatsByFoundingYear(){
        return repo.findAll().stream().map(beer -> {return new BeerDTO(beer.getName(),beer.getProducer().getFounding_year(),beer.getColor(),beer.getAlcoholLvl(), beer.getPrice(), beer.getPackaging(), beer.getProducer().getNrOfBreweries());}).sorted().collect(Collectors.toList());
    }

    public List<BeerDTO> getStatsByBreweryNr(){
        return repo.findAll().stream().map(beer -> {return new BeerDTO(beer.getName(),beer.getProducer().getFounding_year(),beer.getColor(),beer.getAlcoholLvl(), beer.getPrice(), beer.getPackaging(), beer.getProducer().getNrOfBreweries());}).sorted(new Comparator<BeerDTO>() {
            @Override
            public int compare(BeerDTO b1, BeerDTO b2) {
                return Integer.compare(b1.getProdNrOfBreweries(),b2.getProdNrOfBreweries());
            }
        }).collect(Collectors.toList());
    }

    public List<Beer> getBeerDetails(){
        return repo.findAll();
    }
}
