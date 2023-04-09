package group.lab1.Service;

import group.lab1.Model.Beer;
import group.lab1.Model.BeerDTO;
import group.lab1.Repo.BeerRepo;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

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
    public List<Long> getAll(Long page) {

        return repo.findByPage(page).stream().map(beer -> beer.getId()).collect(Collectors.toList());
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

    public List<BeerDTO> filter(List<Long> pageAndFilternr){
        Long page = pageAndFilternr.get(0);
        Long filterNr = pageAndFilternr.get(1);

        return repo.findByPage(page).stream().filter(beer -> beer.getPrice()>filterNr).map(BeerDTO::toDto).collect(Collectors.toList());
    }


    public List<BeerDTO> getStatsByFoundingYear(){
        return repo.findAll().stream().map(BeerDTO::toDto).sorted().collect(Collectors.toList());
    }

    public List<BeerDTO> getStatsByBreweryNr(){
        return repo.findAll().stream().map(BeerDTO::toDto).sorted(new Comparator<BeerDTO>() {
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
